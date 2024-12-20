const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const axios = require('axios');


router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: '이미 존재하는 사용자입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      username,
      password: hashedPassword
    });
    
    await user.save();
    res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res.status(401).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: '비활성화된 계정입니다. 관리자에게 문의하세요.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      user.failedLoginAttempts += 1;
      user.lastLoginAttempt = new Date();

      if (user.failedLoginAttempts >= 5) {
        user.isActive = false;
        await user.save();
        return res.status(401).json({ message: '비밀번호를 5회 이상 틀려 계정이 비활성화되었습니다.' });
      }

      await user.save();
      return res.status(401).json({ 
        message: '비밀번호가 일치하지 않습니다.',
        remainingAttempts: 5 - user.failedLoginAttempts 
      });
    }

    user.failedLoginAttempts = 0;
    user.lastLoginAttempt = new Date();

    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      const ipAddress = response.data.ip;
      user.ipAddress = ipAddress; 
    } catch (ipError) {
      console.error('IP 주소를 가져오는 중 오류 발생:', ipError.message);
    }

    await user.save();

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('서버 오류:', error.message);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});


router.delete('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
    res.json({ message: '사용자가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;
