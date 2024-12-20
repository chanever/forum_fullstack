import React from "react";
import { motion } from 'framer-motion';
import HeroImage from "../../assets/image1.jpg";

const Hero = () => {
  return (
    <div className="relative min-h-[110vh] bg-gradient-to-b from-gray-50 to-white pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-44">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              태양광 설비 전문가와 함께
              <motion.span 
                className="block text-blue-600 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                미래를 만들어갑니다
              </motion.span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              안전하고 효율적인 태양광 설비 설치부터 유지보수까지, 전문가들이
              함께합니다
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                className="px-8 py-4 bg-blue-600 text-white rounded-lg 
                hover:bg-blue-700 transition-colors duration-300
                text-lg font-semibold shadow-lg hover:shadow-xl"
              >
                상담 신청하기
              </button>
              <button
                className="px-8 py-4 bg-white text-blue-600 rounded-lg 
                border-2 border-blue-600 hover:bg-blue-50 
                transition-colors duration-300 text-lg font-semibold"
              >
                더 알아보기
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 w-full max-w-2xl lg:max-w-none"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div
                className="absolute -top-6 -right-6 w-72 h-72 bg-blue-100 
                rounded-full mix-blend-multiply filter blur-xl opacity-70 
                animate-blob"
              ></div>
              <div
                className="absolute -bottom-8 -left-6 w-72 h-72 bg-blue-100 
                rounded-full mix-blend-multiply filter blur-xl opacity-70 
                animate-blob animation-delay-2000"
              ></div>

              <img
                src={HeroImage}
                alt="태양광 설비 전문가들"
                className="relative rounded-2xl shadow-2xl w-full object-cover 
                  transform hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: "1,200+", label: "설치 완료" },
            { number: "98%", label: "고객 만족도" },
            { number: "15년+", label: "업계 경력" },
            { number: "24/7", label: "기술 지원" },
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <div className="text-3xl font-bold text-blue-600">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
