import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./ImageSlider.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiHeart } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../Pages/Context/CartContext";
import { useFavorites } from "../../Pages/Context/FavoritesContext";

import SmallLoader from "../../Loader/SmallLoader";
import customAlert from "../../Pages/utils/customAlert";
import { ArrowLeft } from "lucide-react";

const ProductList = () => {
  const [fetchedData, setFetchedData] = useState({ data: { data: [] } });
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [translateX, setTranslateX] = useState(0);
  const cardWidth = 250;

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("userLoggedIn") === "true";
    setUserLoggedIn(loggedIn);

    if (loggedIn) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        // You can add any additional logic here if needed
      }
    }
  }, []);

  const toggleFavorite = (product) => {
    if (userLoggedIn) {
      window.location.reload();
    }
    if (!userLoggedIn) {
      navigate("/Login");
      return;
    }

    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((item) => item.id === product.id);
      let updatedFavorites;

      if (isFavorite) {
        updatedFavorites = prevFavorites.filter(
          (item) => item.id !== product.id
        );
        customAlert("  محصول از علاقه مندی ها حذف شد !", "error");
      } else {
        updatedFavorites = [...prevFavorites, product];
        customAlert(" محصول به علاقه مندی ها اضافه شد !", "success");
      }

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const isFavorite = (productId) => {
    return favorites && favorites.some((item) => item.id === productId);
  };

  const { addToCart } = useCart();
  const { addToFavorites } = useFavorites();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.didaraoptic.com/general/products?product_type=products&category=%D8%A2%D9%81%D8%AA%D8%A7%D8%A8%DB%8C&locale=fa"
        );

        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();

        setFetchedData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const nextProduct = () => {
    setTranslateX((prev) => {
      const newTranslateX = prev - cardWidth;
      const maxTranslateX = -((fetchedData.data.data.length - 1) * cardWidth);
      return newTranslateX < maxTranslateX ? maxTranslateX : newTranslateX;
    });
  };

  const prevProduct = () => {
    setTranslateX((prev) => {
      const newTranslateX = prev + cardWidth;
      return newTranslateX > 0 ? 0 : newTranslateX;
    });
  };

  return (
    <>
      {loading ? (
        <div className="p-2 mt-2 flex justify-center content-center">
          <SmallLoader />
        </div>
      ) : (
        <div className="w-[90%] mx-auto" style={{ padding: "20px", position: "relative" }}>
          <div className="header">
          <h2 className="text-3xl text-gray-500 font-black">جدیدترین محصولات</h2>

            <hr className="divider" />
            <Link to={"/products"} className="flex items-center py-2 px-2 mx-3 border border-gold-1000 rounded-3xl text-sm font-medium text-gray-700 bg-pink-50 transition duration-300 ease-in-out hover:bg-yellow-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          نمایش بیشتر
          <ArrowLeft className="mr-2 h-4 w-4" />
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              overflow: "hidden",
              width: "92%",
              textAlign: "center",
              justifyContent: "center",
              margin: "20px auto",
            }}
          >
            <div
              className="py-5"
              style={{
                display: "flex",
                transition: "transform 0.3s ease",
                transform: `translateX(${translateX}px)`,
              }}
            >
              {fetchedData.data && fetchedData.data.data.length > 0 ? (
                fetchedData.data.data.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out relative mx-2.5 hover:shadow-xl transform hover:scale-105"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    style={{
                      width: `${cardWidth}px`,
                      height: "360px",
                    }}
                  >
                    <div className="relative h-48">
                      <img
                        src={product.image.url}
                        alt={product.title || product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                        {product.price.offer_percent}%
                      </div>
                      {(hoveredProduct === product.id ||
                        isFavorite(product.id)) && (
                        <button
                          className={`absolute top-2 right-2 p-2  transition-colors duration-300 ${
                            isFavorite(product.id)
                              ? " text-red-500 "
                              : "bg-white text-red-600 hover:bg-red-500 hover:text-red"
                          }`}
                          onClick={(e) => {
                            if (!userLoggedIn) {
                              navigate("/Login");
                              return;
                            }
                            addToFavorites({
                              ...product,
                              quantity: 1,
                              name: product.title || product.name,
                            });
                          }}
                        >
                          <BiHeart size={20} />
                        </button>
                      )}
                      {hoveredProduct === product.id && (
                        <button
                          onClick={(e) => {
                            const itemPrice = parseFloat(product.price.total);
                            addToCart({
                              ...product,
                              quantity: 1,
                              name: product.title || product.name,
                              price: itemPrice,
                            });
                          }}
                          className={`absolute bottom-2 right-2 p-2 rounded-full transition-colors duration-300 ${
                            cart.some((item) => item.id === product.id)
                              ? "text-gray-600"
                              : "bg-white text-gray-200 hover:text-gray-600"
                          }`}
                        >
                          <FaShoppingCart size={20} />
                        </button>
                      )}
                    </div>
                    <div className="p-4">
                      <h5 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
                        {product.title || product.name}
                      </h5>
                      <div className="flex flex-col">
                        <span className="text-gray-500 line-through self-center text-sm mb-1">
                          {formatPrice(product.price.amount)} تومان
                        </span>
                        <span className="text-red-600 self-center font-bold text-lg">
                          {formatPrice(product.price.total)} تومان
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No products found.</div>
              )}
            </div>
          </div>
          <button
            onClick={nextProduct}
            aria-label="Next product"
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255, 255, 255, 0.7)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} size="1x" />
          </button>
          <button
            onClick={prevProduct}
            aria-label="Previous product"
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255, 255, 255, 0.7)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="1x" />
          </button>
        </div>
      )}
    </>
  );
};

export default ProductList;
