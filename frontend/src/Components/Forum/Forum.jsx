import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { format } from 'date-fns';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
        setPosts(response.data.slice(0, 5));
      } catch (error) {
        console.error('게시글 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-28 lg:py-0 max-w-6xl">
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
            to="/board"
            className="px-5 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2 border border-gray-200"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
          {loading ? (
            <div className="p-6 text-center text-gray-500">로딩 중...</div>
          ) : posts.length === 0 ? (
            <div className="p-6 text-center text-gray-500">최근 게시물이 없습니다.</div>
          ) : (
            posts.map((post, index) => (
              <motion.div 
                key={post._id}
                className="border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/board/${post._id}`} className="block">
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-gray-500 text-sm">
                          No. {post.number}
                        </span>
                        <span className="text-gray-500 text-sm flex items-center gap-1">
                          <VisibilityIcon sx={{ fontSize: 16 }} />
                          {post.views}
                        </span>
                        {post.fileUrl && post.fileUrl.length > 0 && (
                          <span className="text-gray-500 text-sm flex items-center gap-1">
                            <AttachFileIcon sx={{ fontSize: 16 }} />
                            {post.fileUrl.length}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                        {post.title}
                      </h3>
                      <div className="mt-2 text-gray-500">
                        {format(new Date(post.createdAt), 'yyyy.MM.dd')}
                      </div>
                    </div>
                    <div className="ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Forum;