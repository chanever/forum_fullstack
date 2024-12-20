import React from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section className="bg-white-50 py-40">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">문의하기</h2>
          <p className="text-gray-600 text-lg">궁금하신 점이 있으신가요? 언제든 문의해주세요.</p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { icon: "phone", title: "전화 문의", info: "02-1234-5678", subInfo: "평일 09:00 - 18:00" },
            { icon: "envelope", title: "이메일 문의", info: "support@example.com", subInfo: "24시간 접수 가능" },
            { icon: "map-marker-alt", title: "위치", info: "서울특별시 강남구", subInfo: "삼성동 123번지" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow duration-300 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <div className="text-blue-600 text-4xl mb-4">
                <i className={`fas fa-${item.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.info}</p>
              <p className="text-gray-500 text-sm">{item.subInfo}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-white shadow rounded-xl overflow-hidden">
            <iframe
              title="Company Location"
              src="https://map.naver.com/p/search/%EC%8B%A0%EC%9A%B0%EC%A0%84%EA%B8%B0%20%EC%B2%9C%EC%95%88?c=15.00,0,0,0,dh"
              width="100%"
              height="400"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="w-full"
            ></iframe>
          </div>
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            to="/contact"
            className="inline-block px-10 py-3 text-lg font-medium text-white bg-blue-600 
              rounded-lg shadow hover:bg-blue-700 
              transition-all duration-300 ease-in-out
              hover:shadow-lg active:transform active:scale-95"
          >
            문의하기
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;