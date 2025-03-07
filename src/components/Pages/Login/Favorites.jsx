import React, { useState, useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useFavorites } from "../Context/FavoritesContext";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [user, setUser] = useState({ name: "کاربر", lastName: "نمونه" });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user") || '{"name": "کاربر", "lastName": "نمونه"}'
    );
    setUser(storedUser);
  }, []);

  const toPersianNumerals = (number) => {
    const persianNumerals = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return String(number).replace(/\d/g, (digit) => persianNumerals[digit]);
  };

  const formatPrice = (price) => {
    return price.toLocaleString({ style: "currency", currency: "IRR" });
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar user={user} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              علاقه مندی ها
            </h2>
            {favorites.length === 0 ? (
              <p className="text-center text-gray-500">
                لیست علاقه مندی های شما خالی است.
              </p>
            ) : (
              <div>
                {favorites.map((item) => (
                  <div
                    key={item.id}
                    className="flex w-2/3 justify-between mx-auto items-center border rounded-xl mt-3 py-4 px-4 hover:border-yellow-600"
                  >
                    <div className="flex items-center">
                      <div className="image mr-4">
                        <img
                          className="w-24 h-24 object-cover rounded"
                          src={item.image.url}
                          alt={item.slug}
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">{item.slug}</h2>
                        <p className="text-gray-500 mt-2 line-through">
                          {toPersianNumerals(formatPrice(item.price.amount))}{" "}
                          تومان
                        </p>
                        <p className="text-gray-600 mt-2">
                          قیمت:{" "}
                          {toPersianNumerals(formatPrice(item.price.total))}{" "}
                          تومان
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => removeFromFavorites(item.id)}
                        className="text-red-500 hover:text-red-600 mr-2"
                        aria-label="Remove from favorites"
                      >
                        <BiTrash size={24} />
                      </button>
                      <AiFillHeart className="text-yellow-500" size={24} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Favorites;
