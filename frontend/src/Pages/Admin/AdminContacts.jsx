import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/contacts`, {
          withCredentials: true
        });
        setContacts(response.data);
      } catch (error) {
        console.error('연락처 로딩 실패:', error);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '삭제하시겠습니까?',
      text: "이 작업은 되돌릴 수 없습니다!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/contacts/${id}`, {
          withCredentials: true
        });
        setContacts(contacts.filter(contact => contact._id !== id));
        Swal.fire(
          '삭제완료!',
          '문의가 성공적으로 삭제되었습니다.',
          'success'
        );
      } catch (error) {
        console.error('삭제 실패:', error);
        Swal.fire(
          '오류 발생!',
          '삭제 중 문제가 발생했습니다.',
          'error'
        );
      }
    }
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/contacts/${selectedContact._id}`, 
        { status: newStatus },
        { withCredentials: true }
      );
      
      setContacts(contacts.map(contact => 
        contact._id === selectedContact._id 
          ? { ...contact, status: newStatus }
          : contact
      ));
      
      setIsModalOpen(false);
      Swal.fire('수정완료!', '상태가 성공적으로 수정되었습니다.', 'success');
    } catch (error) {
      console.error('수정 실패:', error);
      Swal.fire('오류 발생!', '수정 중 문제가 발생했습니다.', 'error');
    }
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const value = contact[searchType]?.toLowerCase() || '';
      const matchesSearch = value.includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [contacts, searchTerm, searchType, statusFilter]);

  const totalPages = Math.ceil(filteredContacts.length / pageSize);
  const paginatedContacts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredContacts.slice(start, start + pageSize);
  }, [filteredContacts, currentPage, pageSize]);

  return (
    <div className="p-4 mx-auto max-w-[1400px]">
      <h1 className="text-4xl font-bold mt-6 mb-4">문의 관리</h1>
      
      {contacts.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-2xl font-bold text-gray-900">문의사항이 없습니다.</p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex w-full md:w-auto gap-2">
              <select
                className="border rounded px-3 py-2 text-base"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="name">이름</option>
                <option value="email">이메일</option>
                <option value="phone">연락처</option>
                <option value="message">문의내용</option>
              </select>
              <div className="flex-1 md:w-80">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="w-full border rounded px-3 py-2 text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="border rounded px-3 py-2 text-base"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">전체 상태</option>
                <option value="pending">대기중</option>
                <option value="in progress">진행중</option>
                <option value="completed">완료</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-base font-bold text-gray-600">페이지당 표시:</label>
              <select
                className="border rounded px-2 py-1"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {[10, 25, 50, 100].map(size => (
                  <option key={size} value={size}>{size}개</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-lg font-bold text-gray-600">
              총 {filteredContacts.length}개의 문의
            </div>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden text-lg font-bold">
              <colgroup>
                <col className="w-[8%]" />
                <col className="w-[12%]" />
                <col className="w-[20%]" />
                <col className="w-[15%]" />
                <col className="w-[25%]" />
                <col className="w-[10%]" />
                <col className="w-[10%]" />
              </colgroup>
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">번호</th>
                  <th className="px-4 py-3 text-left">이름</th>
                  <th className="px-4 py-3 text-left">이메일</th>
                  <th className="px-4 py-3 text-left">휴대폰</th>
                  <th className="px-4 py-3 text-left">내용</th>
                  <th className="px-4 py-3 text-left">상태</th>
                  <th className="px-4 py-3 text-left">관리</th>
                </tr>
              </thead>
              <tbody>
                {paginatedContacts.map((contact, index) => (
                  <tr key={contact._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{(currentPage - 1) * pageSize + index + 1}</td>
                    <td className="px-4 py-3">{contact.name}</td>
                    <td className="px-4 py-3">{contact.email}</td>
                    <td className="px-4 py-3">{contact.phone}</td>
                    <td className="px-4 py-3 truncate max-w-xs">{contact.message}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        contact.status === 'in progress' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : contact.status === 'pending'
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {contact.status === 'in progress' 
                          ? '진행중'
                          : contact.status === 'pending'
                          ? '대기중'
                          : '완료'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => handleEdit(contact)}
                        className="mr-2 text-blue-600 hover:text-blue-800"
                      >
                        수정
                      </button>
                      <button 
                        onClick={() => handleDelete(contact._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {paginatedContacts.map((contact, index) => (
              <div key={contact._id} className="bg-white p-4 rounded-lg shadow text-lg font-bold">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-lg">
                    #{(currentPage - 1) * pageSize + index + 1}
                    <p className="text-base"><span className="font-medium">이름:</span> {contact.name}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-base ${
                    contact.status === 'in progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : contact.status === 'pending'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {contact.status === 'in progress'
                      ? '진행중'
                      : contact.status === 'pending'
                      ? '대기중'
                      : '완료'}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-base"><span className="font-medium">이메일:</span> {contact.email}</p>
                  <p className="text-base"><span className="font-medium">휴대폰:</span> {contact.phone}</p>
                  <p className="text-base"><span className="font-medium">내용:</span> {contact.message}</p>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button 
                    onClick={() => handleEdit(contact)}
                    className="px-3 py-1 text-base text-blue-600 hover:text-blue-800"
                  >
                    수정
                  </button>
                  <button 
                    onClick={() => handleDelete(contact._id)}
                    className="px-3 py-1 text-base text-red-600 hover:text-red-800"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center space-x-2 text-lg font-bold">
            <button
              className="px-3 py-1 rounded border disabled:opacity-50"
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
            >
              이전
            </button>
            <span className="px-3 py-1">
              {currentPage} / {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded border disabled:opacity-50"
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
            >
              다음
            </button>
          </div>
        </>
      )}

      {isModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">문의 상태 수정</h2>
            <div className="mb-4">
              <p className="font-medium mb-2">현재 상태: {
                selectedContact.status === 'in progress' ? '진행중' :
                selectedContact.status === 'pending' ? '대기중' : '완료'
              }</p>
              <div className="space-y-2">
                <button
                  onClick={() => handleStatusUpdate('pending')}
                  className="w-full py-2 px-4 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                >
                  대기중
                </button>
                <button
                  onClick={() => handleStatusUpdate('in progress')}
                  className="w-full py-2 px-4 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                >
                  진행중
                </button>
                <button
                  onClick={() => handleStatusUpdate('completed')}
                  className="w-full py-2 px-4 bg-green-100 text-green-800 rounded hover:bg-green-200"
                >
                  완료
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;