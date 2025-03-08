/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import customAlert from "../utils/customAlert";

const UserProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [name, setName] = useState(localStorage.getItem("name"));
  const [lastName, setLastName] = useState(localStorage.getItem("lastName"));

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const storedName = localStorage.getItem("name") || "کاربر";
    const storedLastName = localStorage.getItem("lastName") || "نمونه";

    setName(storedName);
    setLastName(storedLastName);
  }, []);

  const handleSubmit = (e) => {
    customAlert("پروفایل با موفقیت به‌روزرسانی شد!", "success");

    e.preventDefault();
    localStorage.setItem("name", name);
    localStorage.setItem("lastName", lastName);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handlePhoneChange = () => {
    navigate("/verify");
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar user={{ name, lastName }} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              حساب کاربری
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  نام
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d1b560] focus:border-[#d1b560] transition duration-150 ease-in-out"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  نام خانوادگی
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d1b560] focus:border-[#d1b560] transition duration-150 ease-in-out"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#d1b560] hover:bg-[#c1a550] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d1b560] transition-colors duration-200"
                >
                  ذخیره تغییرات
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
