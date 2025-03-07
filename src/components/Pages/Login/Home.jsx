import React from "react";

const Home = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#d1b560]">داشبورد</h2>
      <p className="text-gray-600">به داشبورد خود خوش آمدید!</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#d1b560] text-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">سفارشات اخیر</h3>
          <p>5 سفارش جدید</p>
        </div>
        <div className="bg-[#d1b560] text-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">دیدگاه‌های جدید</h3>
          <p>3 دیدگاه تایید نشده</p>
        </div>
        <div className="bg-[#d1b560] text-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">موجودی حساب</h3>
          <p>1,500,000 تومان</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
