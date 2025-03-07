import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import customAlert from "../utils/customAlert";

const FavoritesContext = createContext(undefined);

export const FavoritesProvider = ({ children }) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [totalFavorites, setTotalFavorites] = useState(0);

  useEffect(() => {
    setTotalFavorites(favorites.length);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    window.dispatchEvent(new Event("favoritesUpdated"));
  }, [favorites]);

  const addToFavorites = (item) => {
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";

    if (!isLoggedIn) {
      customAlert(" لطفاً وارد حساب کاربری خود شوید !", "warning");
      navigate("/Login");
      return;
    }

    setFavorites((prevFavorites) => {
      const existingItem = prevFavorites.find(
        (favItem) => favItem.id === item.id
      );

      if (existingItem) {
        customAlert(
          `${item.title || item.name} در  علاقه مندی شما وجود دارد!`,
          "warning"
        );

        return prevFavorites;
      } else {
        customAlert(
          `${item.title || item.name} به  علاقه مندی شما اضافه شد!`,
          "success"
        );
      }

      return [...prevFavorites, item];
    });
  };

  const removeFromFavorites = (id) => {
    const favoriteToRemove = favorites.find((item) => item.id === id);

    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== id)
    );

    if (favoriteToRemove) {
      customAlert(
        `${
          favoriteToRemove.title || favoriteToRemove.name
        } از علاقه مندی شما حذف شد!`,
        "error"
      );
    } else {
      customAlert("محصولی برای حذف پیدا نشد!", "error");
    }
  };

  const isInFavorites = (id) => {
    return favorites.some((item) => item.id === id);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const toggleFavorite = (item) => {
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";

    if (!isLoggedIn) {
      customAlert("لطفاً وارد حساب کاربری خود شوید", "warning");
      navigate("/Login");
      return;
    }

    setFavorites((prevFavorites) => {
      const existingIndex = prevFavorites.findIndex(
        (favItem) => favItem.id === item.id
      );
      if (existingIndex > -1) {
        return prevFavorites.filter((_, index) => index !== existingIndex);
      } else {
        return [...prevFavorites, item];
      }
    });
  };

  const getFavoriteClassName = (id) => {
    return `absolute top-2 right-2 cursor-pointer ${
      isInFavorites(id) ? "text-red-500 fill-current" : "text-red-500"
    }`;
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isInFavorites,
        clearFavorites,
        totalFavorites,
        toggleFavorite,
        getFavoriteClassName,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
