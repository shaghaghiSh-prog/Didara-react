import React, { useState, useEffect } from "react";
import "./PriceRangeSlider.css";

const PriceRangeSlider = ({ minPrice, maxPrice, onPriceChange, onFilter }) => {
  const savedRange = JSON.parse(localStorage.getItem("priceRange")) || [
    minPrice,
    maxPrice,
  ];
  const [range, setRange] = useState(savedRange);

  useEffect(() => {
    localStorage.setItem("priceRange", JSON.stringify(range));
  }, [range]);

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), range[1]);
    setRange([newMin, range[1]]);
    onPriceChange([newMin, range[1]]);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), range[0]);
    setRange([range[0], newMax]);
    onPriceChange([range[0], newMax]);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 space-y-8 rtl">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">محدوده قیمت</h3>
      <div className="space-y-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="min-price"
          >
            از: {range[0]}
          </label>
          <input
            id="min-price"
            type="range"
            min={minPrice}
            max={maxPrice}
            value={range[0]}
            onChange={handleMinChange}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500"
            style={{
              background: `linear-gradient(to right, #EAB308 0%, #EAB308 ${
                ((range[0] - minPrice) / (maxPrice - minPrice)) * 100
              }%, #E5E7EB ${
                ((range[0] - minPrice) / (maxPrice - minPrice)) * 100
              }%, #E5E7EB 100%)`,
            }}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="max-price"
          >
            تا: {range[1]}
          </label>
          <input
            id="max-price"
            type="range"
            min={minPrice}
            max={maxPrice}
            value={range[1]}
            onChange={handleMaxChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500"
            style={{
              background: `linear-gradient(to right, #EAB308 0%, #EAB308 ${
                ((range[1] - minPrice) / (maxPrice - minPrice)) * 100
              }%, #E5E7EB ${
                ((range[1] - minPrice) / (maxPrice - minPrice)) * 100
              }%, #E5E7EB 100%)`,
            }}
          />
        </div>
      </div>
      <button
        onClick={() => onFilter(range)}
        className="w-full mt-8 bg-yellow-600 text-white px-4 py-3 rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
      >
        اعمال فیلتر
      </button>
    </div>
  );
};

export default PriceRangeSlider;
