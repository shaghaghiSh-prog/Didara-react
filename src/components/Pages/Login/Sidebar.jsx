import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  ShoppingCart,
  MapPin,
  FileText,
  MessageSquare,
  Heart,
  User,
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return `flex items-center py-3 px-6 transition-all duration-200 ${
      location.pathname === path
        ? "bg-[#d1b560] text-white"
        : "text-gray-700 hover:bg-gray-100 hover:-translate-x-2"
    }`;
  };

  return (
    <div
      className={`rounded-3xl  bg-gray-50 text-gray-700 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex justify-end p-4">
        <img
          src="https://didaraoptic.com/static/media/logoLine.2d0750ba.webp"
          alt="Logo"
          className="w-full"
        />

        <button
          onClick={toggleSidebar}
          className="text-gray-700 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200"
        >
          {isOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>
      <div className="flex  w-36 bg-center justify-center"></div>
      <nav>
        <ul>
          <li>
            <Link to="/Dashboard" className={getLinkClass("/Dashboard")}>
              <Home size={20} className="mr-4" />
              {isOpen && <span>داشبورد</span>}
            </Link>
          </li>
          <li>
            <Link to="/Orders" className={getLinkClass("/Orders")}>
              <ShoppingCart size={20} className="mr-4" />
              {isOpen && <span>سفارشات</span>}
            </Link>
          </li>
          <li>
            <Link to="/addresses" className={getLinkClass("/addresses")}>
              <MapPin size={20} className="mr-4" />
              {isOpen && <span>آدرس های من</span>}
            </Link>
          </li>
          <li>
            <Link to="/invoices" className={getLinkClass("/invoices")}>
              <FileText size={20} className="mr-4" />
              {isOpen && <span>فاکتور ها</span>}
            </Link>
          </li>
          <li>
            <Link to="/reviews" className={getLinkClass("/reviews")}>
              <MessageSquare size={20} className="mr-4" />
              {isOpen && <span>دیدگاه ها</span>}
            </Link>
          </li>
          <li>
            <Link to="/favorites" className={getLinkClass("/favorites")}>
              <Heart size={20} className="mr-4" />
              {isOpen && <span>علاقه مندی ها</span>}
            </Link>
          </li>
          <li>
            <Link to="/UserProfile" className={getLinkClass("/UserProfile")}>
              <User size={20} className="mr-4" />
              {isOpen && <span>حساب کاربری</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
