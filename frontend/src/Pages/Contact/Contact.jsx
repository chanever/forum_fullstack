import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-5xl font-bold text-gray-900 mb-6">문의하기</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            태양광 설비 설치부터 유지보수까지, 전문가와 상담하세요.
            24시간 내에 답변드리겠습니다.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="bg-white rounded-2xl shadow-xl p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">이름</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">이메일</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">연락처</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    placeholder="010-1234-5678"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">문의 내용</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors h-40"
                    placeholder="문의하실 내용을 자세히 적어주세요."
                  ></textarea>
                </div>
                <button
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium
                    hover:bg-blue-700 transition-colors duration-300
                    transform hover:scale-[0.98] active:scale-[0.97]"
                >
                  문의하기
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">연락처 정보</h3>
              <div className="space-y-6">
                {[
                  { icon: "phone", title: "전화", info: "02-1234-5678", desc: "평일 09:00 - 18:00" },
                  { icon: "envelope", title: "이메일", info: "support@example.com", desc: "24시간 접수 가능" },
                  { icon: "map-marker-alt", title: "주소", info: "서울특별시 강남구 삼성동 123번지", desc: "본사" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <i className={`fas fa-${item.icon} text-blue-600 text-xl`}></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-800">{item.title}</h4>
                      <p className="text-gray-600">{item.info}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                title="Company Location"
                src="https://map.naver.com/p/search/%EC%8B%A0%EC%9A%B0%EC%A0%84%EA%B8%B0%20%EC%B2%9C%EC%95%88?c=15.00,0,0,0,dh"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;