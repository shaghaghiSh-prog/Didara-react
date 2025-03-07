import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Pagination = ({ totalProducts, productsPerPage, paginate }) => {
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? Number(savedPage) : 1; 
  });

  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
    paginate(currentPage); 
  }, [currentPage, paginate]);

  useEffect(() => {
    paginate(currentPage);
  }, [currentPage, paginate]);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(currentPage - halfVisible, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return pageNumbers.slice(startPage - 1, endPage).map((number) => (
      <li key={number}>
        <button
          onClick={() => {
            setCurrentPage(number);
            paginate(number);
          }}
          className={`px-3 py-1 rounded-lg ${
            currentPage === number
              ? "bg-darkgold text-white"
              : "bg-white text-darkgold"
          } hover:bg-yellow-500 hover:text-yellow-800 focus:outline-none`}
        >
          {number}
        </button>
      </li>
    ));
  };

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex items-center space-x-2">
        <li>
          <button
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
                paginate(currentPage - 1);
              }
            }}
            disabled={currentPage === 1}
            className="px-2 py-2 bg-gray-300 text-white hover:bg-gray-400 rounded-full disabled:opacity-50"
          >
            <FaAngleRight />
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
                paginate(currentPage + 1);
              }
            }}
            disabled={currentPage === totalPages}
            className="px-2 py-2 bg-gray-300 text-white rounded-full hover:bg-gray-400 disabled:opacity-50"
          >
            <FaAngleLeft />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
