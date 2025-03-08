/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useCart } from "../Context/CartContext";
import { useFavorites } from "../Context/FavoritesContext.jsx";
import PriceRangeSlider from "./PriceRangeSlider";
import { useLocation, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductModal from "./ProductModal";
import SmallLoader from "../../Loader/SmallLoader";

const DataFetcher = ({
  currentPage,
  productsPerPage,
  setTotalProducts,
  sortBy,
  searchTerm,
}) => {
  const [fetchedData, setFetchedData] = useState({ data: { data: [] } });
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 9000000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { addToFavorites } = useFavorites();
  const { getFavoriteClassName } = useFavorites();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.didaraoptic.com/general/products?page=1&per_page=100&locale=fa"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setFetchedData(result);
        setFilteredProducts(result.data.data);
        setTotalProducts(result.data.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, [setTotalProducts, searchTerm, currentPage, productsPerPage]);
  useEffect(() => {
    const loggedIn = localStorage.getItem("userLoggedIn") === "true";
    setUserLoggedIn(loggedIn);

    if (loggedIn) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
      }
    }
  }, []);

  const handleFilter = (range) => {
    const filtered = fetchedData.data.data.filter(
      (product) =>
        product.price.total >= range[0] && product.price.total <= range[1]
    );
    setFilteredProducts(filtered);
    setTotalProducts(filtered.length);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");

    if (searchQuery) {
      const filtered = fetchedData.data.data.filter((product) => {
        const productTitle = product.title || product.name || "";
        const productPrice = product.price.total.toString();
        return (
          productTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          productPrice.includes(searchQuery)
        );
      });
      setFilteredProducts(filtered);
      setTotalProducts(filtered.length);
    } else {
      setFilteredProducts(fetchedData.data.data);
      setTotalProducts(fetchedData.data.data.length);
    }
  }, [fetchedData, location.search, setTotalProducts]);

  useEffect(() => {
    let sortedProducts = [...filteredProducts];
    switch (sortBy) {
      case "cheapest":
        sortedProducts.sort((a, b) => a.price.total - b.price.total);
        break;
      case "mostExpensive":
        sortedProducts.sort((a, b) => b.price.total - a.price.total);
        break;
      case "newest":
        sortedProducts.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;
      case "bestSelling":
        sortedProducts.sort((a, b) => (b.sales || 0) - (a.sales || 0));
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts);
  }, [sortBy]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const isFavorite = (productId) =>
    favorites.some((item) => item.id === productId);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="p-2 mt-2 flex justify-center content-center">
        <SmallLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/5 p-4">
        <PriceRangeSlider
          minPrice={0}
          maxPrice={9000000}
          onPriceChange={setPriceRange}
          onFilter={handleFilter}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full md:w-4/5">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out relative cursor-pointer"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
            style={{
              transform:
                hoveredProduct === product.id ? "scale(1.05)" : "scale(1)",
              borderColor:
                hoveredProduct === product.id ? "#B8860B" : "transparent",
            }}
          >
            <div className="relative">
              <img
                onClick={() => handleProductClick(product)}
                src={product.image.url}
                alt={product.title || product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
                {product.price.offer_percent}%
              </div>
              <Heart
                className={getFavoriteClassName(product.id)}
                size={24}
                onClick={(e) => {
                  addToFavorites({
                    ...product,
                    quantity: 1,
                    name: product.title || product.name,
                  });
                }}
              />
            </div>
            <div onClick={() => handleProductClick(product)} className="p-4">
              <h2 className="text-lg font-semibold mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                {product.title || product.name}
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 line-through">
                  {new Intl.NumberFormat("fa-IR").format(product.price.amount)}{" "}
                  تومان
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-600 font-bold">
                  {new Intl.NumberFormat("fa-IR").format(product.price.total)}{" "}
                  تومان
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const itemPrice = parseFloat(product.price.total);
                  addToCart({
                    ...product,
                    quantity: 1,
                    name: product.title || product.name,
                    price: itemPrice,
                  });
                }}
                className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-800 mt-2 w-full"
              >
                اضافه کردن
              </button>
            </div>
          </div>
        ))}
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
        addToCart={addToCart}
        addToFavorites={addToFavorites}
        isFavorite={isFavorite}
      />
    </div>
  );
};

export default DataFetcher;
