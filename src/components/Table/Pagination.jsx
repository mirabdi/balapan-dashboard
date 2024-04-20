import React from 'react';

const Pagination = ({ page, pageSize, total, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="border rounded py-2 px-4 mr-2 disabled:opacity-50"
      >
        Назад
      </button>
      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`border rounded py-2 px-4 mx-1 ${page === p ? 'bg-blue-500 text-white' : ''}`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="border rounded py-2 px-4 ml-2 disabled:opacity-50"
      >
        Вперёд
      </button>
    </div>
  );
};

export default Pagination;
