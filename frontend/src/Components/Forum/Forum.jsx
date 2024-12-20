import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Forum = () => {
  const posts = [
    {
      id: 1,
      title: "2024년 태양광 설비 설치 지원 사업 안내",
      author: "관리자",
      date: "2024.01.15",
      category: "공지사항"
    },
    {
      id: 2, 
      title: "신규 태양광 패널 설치 완료 사례",
      author: "김태양",
      date: "2024.01.12",
      category: "설치사례"
    },
    {
      id: 3,
      title: "태양광 설비 유지보수 정기 점검 안내",
      author: "이기술",
      date: "2024.01.10", 
      category: "기술지원"
    },
    {
      id: 4,
      title: "2023년 태양광 설비 설치 실적 보고",
      author: "박실장",
      date: "2024.01.08",
      category: "보고서"
    },
    {
      id: 5,
      title: "신년 맞이 태양광 설비 특별 프로모션",
      author: "최매니저",
      date: "2024.01.05",
      category: "이벤트"
    }
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            업무 게시판
          </h2>
        </motion.div>
        
        <div className="flex justify-end mb-4">
          <Link 
            to="/notices"
            className="px-5 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2 border border-gray-200"
          >
            전체보기
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {posts.map((post, index) => (
            <motion.div 
              key={post.id}
              className="border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <div className="mt-2 text-gray-500">
                    작성자: {post.author}
                  </div>
                </div>
                <div className="ml-4">
                  <button className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Forum