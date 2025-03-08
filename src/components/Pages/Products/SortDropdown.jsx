import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const SortDropdown = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { label: "ارزانترین ها", value: "cheapest" },
    { label: "پرفروش ترین ها", value: "bestSelling" },
    { label: "جدید ترین ها", value: "newest" },
    { label: "گران ترین ها", value: "mostExpensive" },
  ];

  const handleSort = (value) => {
    onSort(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-right">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-yellow-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          مرتب سازی
          <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right   relative right-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-100">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSort(option.value)}
                className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
