import React, { useState, useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Board = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
        setPosts(response.data);
        setFilteredPosts(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    let result = [...posts];

    if (searchTerm) {
      result = result.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59); 

      result = result.filter(post => {
        const postDate = new Date(post.createdAt);
        return postDate >= start && postDate <= end;
      });
    }

    setFilteredPosts(result);
    setTotalPages(Math.ceil(result.length / itemsPerPage));
    setCurrentPage(1);
  }, [searchTerm, startDate, endDate, posts, itemsPerPage]);

  const handlePageChange = (selectedItem) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  const handleReset = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setFilteredPosts(posts);
    setCurrentPage(1);
  };

  const handlePostClick = (postId) => {
    navigate(`/board/${postId}`);
  };

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage, itemsPerPage, filteredPosts]);

  const memoizedContent = useMemo(() => {
    const tableContent =
      currentPosts.length === 0 ? (
        <tr>
          <td colSpan="5" className="px-6 py-4 text-center">
            게시물이 없습니다.
          </td>
        </tr>
      ) : (
        currentPosts.map((post) => (
          <tr 
            key={post._id} 
            className="hover:bg-gray-50 cursor-pointer"
            onClick={() => handlePostClick(post._id)}
          >
            <td className="px-6 py-4 whitespace-nowrap">{post.number}</td>
            <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {new Date(post.createdAt).toLocaleString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {post.fileUrl && post.fileUrl.length > 0 ? "있음" : "없음"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{post.views}</td>
          </tr>
        ))
      );

    const tableView = (
      <table className="min-w-full bg-white border rounded-lg hidden md:table">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-[8%]">
              번호
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-auto">
              제목
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-[15%]">
              작성일
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-[10%]">
              첨부파일
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-[8%]">
              조회수
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">{tableContent}</tbody>
      </table>
    );

    const cardView = (
      <div className="space-y-4 md:hidden">
        {currentPosts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-4 rounded-lg border shadow-sm cursor-pointer"
            onClick={() => handlePostClick(post._id)}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-base text-gray-500">#{post.number}</span>
              <span className="px-2 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                {post.status}
              </span>
            </div>
            <h3 className="font-medium mb-2">{post.title}</h3>
            <div className="text-base text-gray-500 space-y-1">
              <div className="flex justify-between">
                <span>주제: {post.category}</span>
                <span>조회수: {post.views}</span>
              </div>
              <div className="flex justify-between">
                <span>작성자: {post.author}</span>
                <span>{new Date(post.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

    return (
      <>
        {tableView}
        {currentPosts.length === 0 ? (
          <div className="md:hidden text-center py-4">게시물이 없습니다.</div>
        ) : (
          cardView
        )}
      </>
    );
  }, [currentPosts]);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto py-32 md:py-32">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-center">
        업무 게시판
      </h1>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <select
            className="w-full md:w-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value="10">10개씩 보기</option>
            <option value="25">25개씩 보기</option>
            <option value="50">50개씩 보기</option>
            <option value="100">100개씩 보기</option>
          </select>

          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button 
            onClick={handleReset}
            className="w-full md:w-auto px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            초기화
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
          <div className="text-base text-gray-500">
            총 {filteredPosts.length}개의 게시물
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full w-38 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="시작일"
            />
            <span className="flex items-center justify-center">~</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full w-38 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="종료일"
            />
          </div>
        </div>

        {memoizedContent}
      </div>

      <ReactPaginate
        previousLabel="이전"
        nextLabel="다음"
        pageCount={totalPages}
        onPageChange={handlePageChange}
        containerClassName="flex flex-wrap justify-center mt-6 gap-2"
        pageClassName="px-3 md:px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
        previousClassName="px-3 md:px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
        nextClassName="px-3 md:px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
        activeClassName="!bg-blue-500 text-white hover:!bg-blue-600"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default Board;
