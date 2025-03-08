/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, Home, Globe } from 'lucide-react';
import customAlert from '../utils/customAlert';

const Navbar = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState(localStorage.getItem("name"));
  const [lastName, setLastName] = useState(localStorage.getItem("lastName"));
  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("lastName");
    navigate("/");
    setUserLoggedIn(false);
    customAlert("شما از حساب کاربری خارج شدید!" , "error")
  };

  return (
    <nav className="bg-white text-gray-800 p-3 flex justify-end  shadow-2xl mx-6 my-6 rounded-lg">
      <div className="flex  ">
        <Link to="/" className="text-gray-800 hover:bg-[#d1b560] p-2 rounded-full transition-colors duration-200">
          <Home size={24} />
        </Link>
        <button  onClick={handleLogout}  className="text-gray-800 hover:bg-[#d1b560] p-2 rounded-full transition-colors duration-200">
          <LogOut size={24} />
        </button>
        <div className="relative">
          <button
            className="flex items-center space-x-2 hover:bg-[#d1b560] px-3 py-2 rounded-md transition-colors duration-200"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span>{`${name} ${lastName}`}</span>
            <ChevronDown size={20} />
          </button>
          {isDropdownOpen && (
            <div
              className="absolute top-full left-0 bg-white text-gray-800 shadow-md rounded-md py-2 mt-1 w-48"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link to="/" className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-200">
                <Globe size={16} className="mr-2" />
                <span>وبسایت</span>
              </Link>
              <Link to="/logout" className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-200">
                <LogOut size={16} className="mr-2" />
                <span>خروج</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
