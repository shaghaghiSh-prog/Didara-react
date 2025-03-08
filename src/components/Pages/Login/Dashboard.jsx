/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Home from "./Home";
import UserProfile from "./UserProfile";
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState({ name: "کاربر", lastName: "نمونه" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
      name: "کاربر",
      lastName: "نمونه",
    };
    setUser(storedUser);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar user={user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/UserProfile"
              element={<UserProfile updateUser={updateUser} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
