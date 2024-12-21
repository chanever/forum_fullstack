import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'

const AdminNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/admin" className="text-xl font-bold">
              Admin Dashboard
            </Link>
          </div>

          <div className="hidden text-lg lg:flex items-center space-x-4">
            <Link to="/admin/posts" className="hover:bg-gray-700 px-3 py-2 rounded">
              게시글
            </Link>
            <Link to="/admin/contacts" className="hover:bg-gray-700 px-3 py-2 rounded">
              문의 관리
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-700"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/admin/posts"
                className="block hover:bg-gray-700 px-3 py-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                Posts
              </Link>
              <Link
                to="/admin/contacts"
                className="block hover:bg-gray-700 px-3 py-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                Contacts
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default AdminNavBar