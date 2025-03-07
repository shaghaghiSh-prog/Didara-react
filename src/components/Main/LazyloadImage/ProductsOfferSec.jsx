import React, { useEffect, useState, useRef } from "react";
import { BiHeart } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaShoppingCart } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { useCart } from "../../Pages/Context/CartContext";
import SmallLoader from "../../Loader/SmallLoader";
import { useFavorites } from "../../Pages/Context/FavoritesContext";
import { ArrowLeft } from "lucide-react";

const ProductsOfferSec = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [translateX, setTranslateX] = useState(0);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardWidth = 230;

  const touchStartX = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.didaraoptic.com/general/products?product_type=products&category=%D8%A2%D9%81%D8%AA%D8%A7%D8%A8%DB%8C&locale=fa"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setFilteredProducts(result.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem("userLoggedIn") === "true";
    setUserLoggedIn(loggedIn);
  }, []);

  const nextSlide = () => {
    setTranslateX((prev) => {
      const newTranslateX = prev - cardWidth;
      return newTranslateX < -((filteredProducts.length - 1) * cardWidth)
        ? prev
        : newTranslateX;
    });
  };

  const prevSlide = () => {
    setTranslateX((prev) => {
      const newTranslateX = prev + cardWidth;
      return newTranslateX < -((filteredProducts.length + 1) * cardWidth)
        ? prev
        : newTranslateX;
    });
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const location = useLocation();
  const navigate = useNavigate();

  const isFavorite = (productId) => {
    return favorites && favorites.some((item) => item.id === productId);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const { addToCart } = useCart();
  const { addToFavorites } = useFavorites();

  return (
    <div className="w-[90%] mx-auto my-8 font-sans rtl">
      <div className="flex flex-col md:flex-row gap-6 bg-[#927b34] rounded-lg shadow-lg relative">
        <div className="w-full md:w-1/6 flex flex-col items-center justify-center text-white text-center p-4">
          <h2 className="text-3xl font-black mb-2 ">تخفیفات</h2>
          <h2 className="text-3xl font-black mb-6">ویژه</h2>
          <Link className="mr-4 flex w-28 items-center py-2 px-2 mx-3 border border-gold-1000 rounded-3xl text-sm font-medium  bg-[#927b34] transition duration-300 ease-in-out hover:bg-white hover:text-yellow-950 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" to={"/products"}>
          مشاهده بیشتر
              <ArrowLeft className="h-4 w-4" />
            
          </Link>
        </div>
        <div className="w-full md:w-5/6 relative">
          {loading && (
            <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-16 bg-white z-10">
              <div className="p-2 mt-2 flex justify-center content-center">
                <SmallLoader />
              </div>
            </div>
          )}
          <div
            className="relative overflow-hidden rounded-lg"
            onTouchStart={handleTouchStart}
          >
            <div
              className="flex transition-transform duration-300 py-4 ease-in-out"
              style={{ transform: `translateX(${translateX}px)` }}
            >
              {filteredProducts.map((product) => (
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
                        className={`absolute top-2 right-2 p-2 transition-colors duration-300 ${
                          isFavorite(product.id)
                            ? " text-red-500 "
                            : "bg-white text-red-600 hover:bg-red-500 hover:text-white"
                        }`}
                        onClick={(e) => {
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
              ))}
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-gray-800 rounded-full w-12 h-12 flex items-center justify-center text-2xl hover:bg-opacity-100 transition-all duration-300"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-gray-800 rounded-full w-12 h-12 flex items-center justify-center text-2xl hover:bg-opacity-100 transition-all duration-300"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsOfferSec;
