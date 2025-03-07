import React, { createContext, useContext, useState, useEffect } from "react";
import customAlert from "../utils/customAlert";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const newTotalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalItems(newTotalItems);
    setTotalPrice(newTotalPrice);

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        customAlert(
          `${item.title || item.name} در سبد خرید شما وجود دارد!`,
          "warning"
        );

        return prevCart;
      } else {
        customAlert(
          `${item.title || item.name} به سبد خرید شما اضافه شد!`,
          "success"
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    const productToRemove = cart.find((item) => item.id === id);

    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    if (productToRemove) {
      customAlert(
        `${
          productToRemove.title || productToRemove.name
        } از سبد خرید شما حذف شد!`,
        "error"
      );
    } else {
      customAlert("محصولی برای حذف پیدا نشد!", "error");
    }
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
