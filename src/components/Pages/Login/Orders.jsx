import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ShoppingCartPage from "../ShoppingCart/ShoppingCart";
import { useCart } from "../Context/CartContext";
import { BiTrash } from "react-icons/bi";

const Orders = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({ name: "کاربر", lastName: "نمونه" });
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const mockOrders = [
        { id: "1", date: "2023-05-01", total: 150000, status: "تحویل شده" },
        { id: "2", date: "2023-05-05", total: 230000, status: "در حال پردازش" },
        { id: "3", date: "2023-05-10", total: 80000, status: "ارسال شده" },
      ];
      setOrders(mockOrders);
    };

    fetchOrders();

    const storedUser = JSON.parse(
      localStorage.getItem("user") || '{"name": "کاربر", "lastName": "نمونه"}'
    );
    setUser(storedUser);
  }, []);

  const handleOrderDetails = (orderId) => {
    navigate(`/order/${orderId}`);
  };
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
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
              سفارش‌های من
            </h2>
            <h1 className="text-4xl font-bold text-gray-400 mb-8">سبد</h1>
            {cart.length === 0 ? (
              <p>سبد خرید شما خالی است .</p>
            ) : (
              <div>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className=" w-2/3 flex justify-center items-center self-center mx-auto content-center border rounded-xl mt-3 py-4 hover:border-yellow-600"
                  >
                    <div className="image">
                      <img className="w-24" src={item.image.url} alt="" />
                    </div>
                    <div className="mt-0 ">
                      <h2 className="text-xl  font-semibold">{item.slug}</h2>
                      <p className="text-gray-500  mt-2 line-through">
                        {toPersianNumerals(item.price)}
                      </p>
                      <p className="text-gray-600 mt-2 ">
                        قیمت:{" "}
                        {typeof item.price === "number"
                          ? toPersianNumerals(formatPrice(item.price))
                          : "N/A"}{" "}
                        تومان
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className=" px-2 text-yellow-700  py-1 rounded"
                      >
                        -
                      </button>
                      <span className="mx-2">
                        {toPersianNumerals(item.quantity)}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className=" text-yellow-700 px-2 py-1 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="m-4 text-red-500 hover:text-red-600"
                      >
                        <BiTrash />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-8">
                  <p className="text-2xl font-bold">
                    جمع: {toPersianNumerals(formatPrice(totalPrice))} تومان
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;
