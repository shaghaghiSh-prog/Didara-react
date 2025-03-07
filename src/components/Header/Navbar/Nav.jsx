import React, { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  FiSearch,
  FiX,
  FiMenu,
  FiChevronRight,
  FiHome,
  FiShoppingBag,
  FiImage,
  FiBookOpen,
  FiFileText,
  FiInfo,
  FiPhone,
  FiTag,
} from "react-icons/fi";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 300);
    }
  };

  const handleMenuItemClick = (category) => {
    Navigate(`/Products?search=${encodeURIComponent(category)}`);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isMenuOpen && !event.target.closest(".menu-container")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  const menuItems = [
    { to: "/", text: "صفحه اصلی", icon: FiHome },
    {
      to: "/products",
      text: "محصولات",
      icon: FiShoppingBag,
      onClick: () => handleMenuItemClick("محصولات"),
    },
    { to: "/gallery", text: "گالری", icon: FiImage },
    { to: "/order-guide", text: "راهنمای سفارش", icon: FiBookOpen },
    { to: "/terms", text: "قوانین و مقررات", icon: FiFileText },
    { to: "/articles", text: "مقالات", icon: FiFileText },
    { to: "/About", text: "درباره ما", icon: FiInfo },
    { to: "/Contact", text: "تماس با ما", icon: FiPhone },
    { to: "/special-offers", text: "%تخفیفات ویژه%", icon: FiTag },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full text-gray-600 hover:text-[#d1b560] focus:outline-none focus:ring-2 focus:ring-[#d1b560] transition-all duration-300 transform hover:scale-110 active:scale-95"
            aria-expanded={isMenuOpen}
          >
            <FiMenu className="w-6 h-6" />
          </button>

          <div className="flex-shrink-0 flex items-center">
            <img
              className="block h-10 w-auto transition-transform duration-300 hover:scale-105"
              src="https://didaraoptic.com/static/media/logo.19cbf7dc.webp"
              alt="Logo"
            />
          </div>

          <button
            onClick={toggleSearch}
            className="p-2 rounded-full text-gray-600 hover:text-[#d1b560] focus:outline-none focus:ring-2 focus:ring-[#d1b560] transition-all duration-300 transform hover:scale-110 active:scale-95"
          >
            <span className="sr-only">Toggle search</span>
            <FiSearch className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isSearchOpen ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="جستجو..."
              className="w-full p-2 pr-10 rounded-full border-2 border-[#d1b560] focus:outline-none focus:ring-2 focus:ring-[#d1b560] transition-all duration-300 ease-in-out shadow-md text-right placeholder-gray-400"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-2xl transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-all duration-300 ease-in-out overflow-y-auto menu-container`}
      >
        <div className="flex  justify-end p-4">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full text-gray-600 hover:text-[#d1b560] focus:outline-none focus:ring-2 focus:ring-[#d1b560] transition-all duration-300 transform hover:scale-110 active:scale-95"
          >
            <span className="sr-only">Close menu</span>
            <FiX className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <ul className="space-y-1 px-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                className="group flex items-center py-2 px-4 text-gray-600 hover:pr-1  hover:bg-[#d1b560] hover:text-white rounded-lg transition-all duration-200 ease-in-out hover:shadow-lg"
              >
                <item.icon className="w-5 h-5 mr-1 transition-transform duration-200 ease-in-out group-hover:scale-x-125" />
                <span className="flex-grow px-1">{item.text}</span>
                <FiChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200 ease-in-out" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
