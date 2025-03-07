"use client";

import { useEffect, useState } from "react";
import "./navbar.css";
import { ChevronRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AmazingSlider from "./Carousel";
import { useCart } from "../../Pages/Context/CartContext";
import { useFavorites } from "../../Pages/Context/FavoritesContext";

import Nav from "./Nav";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { RiHeartAddLine } from "react-icons/ri";
import { TbShoppingCartPlus } from "react-icons/tb";
import { RiUserStarLine } from "react-icons/ri";
import customAlert from "../../Pages/utils/customAlert";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [user, setUser] = useState({ name: "کاربر", lastName: "نمونه" });
  const [name, setName] = useState(localStorage.getItem("name"));
  const [lastName, setLastName] = useState(localStorage.getItem("lastName"));
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenUserIcon, setDropdownOpenUserIcon] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? Number(savedPage) : 1; // Default to 1 if not found
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page on a new search
    localStorage.setItem("currentPage", 1);
    if (searchQuery.trim()) {
      navigate(`/Products?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      try {
        const response = await fetch(
          `https://api.didaraoptic.com/general/products?search=${encodeURIComponent(
            query
          )}&page=1&per_page=5&locale=fa`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
    }
  };

  const handleMenuItemClick = (category) => {
    navigate(`/Products?search=${encodeURIComponent(category)}`);
  };

  const formatPrice = (price) => {
    return price.toLocaleString({ style: "currency", currency: "IRR" });
  };

  const handleLogout = () => {
    customAlert("شما از حساب کاربری خارج شدید!", "error");

    localStorage.clear();
    setDropdownOpenUserIcon(false);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const openLogin = () => {
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  const closeVerify = () => {
    setIsVerifyOpen(false);
  };

  const handleFavoritesClick = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoritesCount(storedFavorites.length);
  };

  const addToFavorites = (item) => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    storedFavorites.push(item);
    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    setFavoritesCount(storedFavorites.length); // Update the state
  };

  const removeFromFavorites = (itemId) => {
    let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    storedFavorites = storedFavorites.filter((item) => item.id !== itemId);
    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    setFavoritesCount(storedFavorites.length); // Update the state
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("userLoggedIn") === "true";
    setUserLoggedIn(loggedIn);

    if (loggedIn) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser); // Set user state to the stored user
      }
    }
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoritesCount(storedFavorites.length);
  }, []);

  const { totalItems, totalPrice } = useCart();
  const { totalFavorites } = useFavorites();

  const handleLoginSuccess = (token, name, lastName) => {
    setAuthToken(token); // Store the token
    setUser({ name, lastName }); // Store the user object
    setIsLoginOpen(false); // Close the login modal
    setIsVerifyOpen(true); // Open the verify modal
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [subDropdownOpen, setSubDropdownOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const toPersianNumerals = (number) => {
    const persianNumerals = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return String(number).replace(/\d/g, (digit) => persianNumerals[digit]);
  };
  useEffect(() => {
    const handleScroll = () => {
      setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleDropdownUserIcon = () => {
    setDropdownOpenUserIcon(!dropdownOpenUserIcon);
  };

  const toggleSubDropdown = () => {
    setTimeout(() => {
      setSubDropdownOpen(!subDropdownOpen);
    }, 5000); // Delay of 500 milliseconds (0.5 seconds)
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (isMobile) {
    return (
      <>
        <Nav />
        {/* <AmazingSlider /> */}
      </>
    );
  }

  return (
    <>
      <nav className="bg-white shadow-md">
        <div
          className={`navbar navbar-expand-lg navbar-light fixed-top navbar-container ${
            !isHomePage ? "scrolled" : ""
          } ${isScrolled ? "scrolled" : ""} `}
        >
          <div className="navbar-logo-container">
            <img
              className="w-14 h-14"
              src="https://didaraoptic.com/static/media/logo.19cbf7dc.webp"
              alt=""
            />
          </div>
          <div className="navbar-content-container">
            <div className="navbar-top-container">
              <div className="search-input-container relative">
                <form onSubmit={handleSearch}>
                  <button type="submit" className="search-btn">
                    <i className="fas fa-search"></i>
                  </button>
                  <input
                    type="text"
                    placeholder="جستجوی محصول..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </form>
                
              </div>
              <div className="icons">
                <div className="shopping-bag-container relative flex items-center">
                  <Link
                    className="nav-link flex w-fit items-center"
                    to="/ShoppingCart"
                  >
                    <span className="text-yellow-700 text-xs ml-1">
                      {toPersianNumerals(formatPrice(totalPrice))}
                      تومان
                    </span>
                    <div className="relative mr-2 ml-2">
                      <TbShoppingCartPlus className="w-6 h-6 text-white-700 hover:text-[#d1b560] transition-colors duration-300" />
                      {totalItems > 0 && (
                        <span className="cart-badge absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center animate-pulse">
                          {toPersianNumerals(totalItems)}
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
                <div className="login-container self-center  flex items-center">
                  <div className="relative text-sm ">
                    {userLoggedIn ? (
                      <Link
                        to="/Favorites"
                        onClick={handleFavoritesClick}
                        className="flex self-center ml-4 items-center"
                      >
                        <div className="relative">
                          <RiHeartAddLine className="w-6 h-6 text-white-700 hover:text-[#d1b560] transition-colors duration-300" />
                          {totalFavorites > 0 && (
                            <span className="cart-badge absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center animate-pulse">
                              {toPersianNumerals(totalFavorites)}
                            </span>
                          )}
                        </div>
                      </Link>
                    ) : null}{" "}
                  </div>

                  <div className="relative">
                    {userLoggedIn ? (
                      <>
                        <button
                          onClick={() =>
                            setDropdownOpenUserIcon(!dropdownOpenUserIcon)
                          }
                          className="flex items-center relative"
                        >
                          <RiUserStarLine className="w-6 h-6 text-white-700 hover:text-[#d1b560] transition-colors duration-300" />
                          <FaAngleDown className="w-4 h-4 absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-white-700 hover:text-[#d1b560] transition-colors duration-300" />
                        </button>
                        {dropdownOpenUserIcon && (
                          <div className="absolute -right-16 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-10">
                            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200 text-right">
                              {name} {lastName}
                            </div>
                            <Link
                              to="/dashboard"
                              className="block px-4 py-2 text-sm text-gray-700 hover:text-[#d1b560] hover:font-bold text-right border-b border-gray-100"
                            >
                              داشبورد
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:text-[#d1b560] hover:font-bold"
                            >
                              <span className="inline-block">خروج از حساب</span>
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to="/Login"
                        className="text-white-600 hover:text-gray-800 relative"
                      >
                        <RiUserStarLine className="w-6 h-6 text-gray-700 hover:text-[#d1b560] transition-colors duration-300" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="navbar-nav-container">
              <ul className="navbar-nav">
                <li
                  className={`nav-item ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  <Link
                    className={`nav-link ${
                      location.pathname === "/"
                        ? "text-[#d1b560]"
                        : "text-white"
                    }`}
                    to="/"
                  >
                    صفحه اصلی
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    location.pathname.startsWith("/Products") ? "active" : ""
                  }`}
                >
                  <Link
                    className={`nav-link ${
                      location.pathname.startsWith("/Products")
                        ? "text-[#d1b560]"
                        : "text-white"
                    }`}
                    to="/Products"
                    onClick={() => handleMenuItemClick("محصولات")}
                  >
                    محصولات
                  </Link>
                  <FaAngleLeft className="hamburger" />
                  <div className="dropdown-menu">
                    <div
                      className="dropdown-item"
                      onClick={() => handleMenuItemClick("طبی")}
                    >
                      طبی
                      <FaAngleDown className="arrow" />
                      <div className="sub-dropdown-menu">
                        <a
                          className="dropdown-item"
                          onClick={() => handleMenuItemClick("مطالعه")}
                        >
                          مطالعه
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={() => handleMenuItemClick("راه دور")}
                        >
                          راه دور
                        </a>
                      </div>
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() => handleMenuItemClick("آفتابی")}
                    >
                      آفتابی
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() => handleMenuItemClick("بچه گانه")}
                    >
                      بچه گانه
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() => handleMenuItemClick("لنز")}
                    >
                      لنز
                      <FaAngleDown className="arrow" />
                      <div className="sub-dropdown-menu">
                        <a
                          className="dropdown-item"
                          onClick={() => handleMenuItemClick("زیبایی")}
                        >
                          زیبایی
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={() => handleMenuItemClick("طبی بچه گانه")}
                        >
                          طبی
                        </a>
                      </div>
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() => handleMenuItemClick("اکسسوری")}
                    >
                      اکسسوری
                      <FaAngleDown className="arrow" />
                      <div className="sub-dropdown-menu">
                        <a
                          className="dropdown-item"
                          onClick={() => handleMenuItemClick("دستمال")}
                        >
                          دستمال
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={() => handleMenuItemClick("اسپری")}
                        >
                          اسپری
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={() => handleMenuItemClick("بند")}
                        >
                          بند
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={() => handleMenuItemClick("جلد")}
                        >
                          جلد
                        </a>
                      </div>
                    </div>
                  </div>
                </li>

                <li
                  className={`nav-item ${
                    location.pathname === "/Gallery" ? "active" : ""
                  }`}
                >
                  <Link
                    className={`nav-link ${
                      location.pathname === "/Gallery"
                        ? "text-[#d1b560]"
                        : "text-white"
                    }`}
                    to="/Gallery"
                  >
                    گالری
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === "/OrderGuide" ? "active" : ""
                  }`}
                >
                  <Link
                    className={`nav-link ${
                      location.pathname === "/OrderGuide"
                        ? "text-[#d1b560]"
                        : "text-white"
                    }`}
                    to="/OrderGuide"
                  >
                    راهنمای سفارش
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === "/Terms" ? "active" : ""
                  }`}
                >
                  <Link
                    className={`nav-link ${
                      location.pathname === "/Terms"
                        ? "text-[#d1b560]"
                        : "text-white"
                    }`}
                    to="/Terms"
                  >
                    قوانین و مقررات
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === "/Blog" ? "active" : ""
                  }`}
                >
                  <Link
                    className={`nav-link ${
                      location.pathname === "/Blog"
                        ? "text-[#d1b560]"
                        : "text-white"
                    }`}
                    to="/Blog"
                  >
                    مقالات
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                >
                  <Link
                    className={`nav-link ${
                      location.pathname === "/About"
                        ? "text-[#d1b560]"
                        : "text-white"
                    }`}
                    to="/About"
                  >
                    درباره ما
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === "/Contact" ? "active" : ""
                  }`}
                >
                  <Link
                    className={`nav-link ${
                      location.pathname === "/Contact"
                        ? "text-[#d1b560]"
                        : "text-white"
                    }`}
                    to="/Contact"
                  >
                    تماس با ما
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    %تخفیفات ویژه%
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
