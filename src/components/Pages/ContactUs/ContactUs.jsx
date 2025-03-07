import React from "react";
import Footer from "../../Footer/Footer";
import { Phone, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "../../Loader/Loader";
import Navbar from "../../Header/Navbar/Navbar";

function Contact() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // Show loader for 4 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} // Optional: Add exit animation
            transition={{ duration: 0.5 }}
          >
            <Navbar /> 
            <div className="pt-32">
              <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-[90%] overflow-hidden">
                  <div className="p-8">
                    <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                      تماس با ما
                    </h1>

                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Left side - Form */}
                      <div className="w-full md:w-1/2 space-y-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 text-right"
                          >
                            نام و نام خانوادگی
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="w-full sm:w-1/2">
                            <label
                              htmlFor="mobile"
                              className="block text-sm font-medium text-gray-700 text-right"
                            >
                              شماره موبایل
                            </label>
                            <input
                              type="tel"
                              id="mobile"
                              name="mobile"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                          </div>
                          <div className="w-full sm:w-1/2">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 text-right"
                            >
                              پست الکترونیک
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700 text-right"
                          >
                            متن پیام
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          ></textarea>
                        </div>
                        <div className="text-right">
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-700 hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            ارسال پیام
                          </button>
                        </div>
                      </div>

                      {/* Right side - Contact Info */}
                      <div className="w-full md:w-1/2 space-y-6">
                        <div className="flex items-center justify-end space-x-4 rtl:space-x-reverse">
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">
                              شماره تماس ۱
                            </p>
                            <p className="text-gray-600" dir="ltr">
                              026-12345678
                            </p>
                          </div>
                          <Phone className="w-6 h-6 text-amber-700" />
                        </div>

                        <div className="flex items-center justify-end space-x-4 rtl:space-x-reverse">
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">
                              شماره تماس ۲
                            </p>
                            <p className="text-gray-600" dir="ltr">
                              09123456789
                            </p>
                          </div>
                          <Phone className="w-6 h-6 text-amber-700" />
                        </div>

                        <div className="flex items-start justify-end space-x-4 rtl:space-x-reverse">
                          <div className="text-right">
                            <p className="font-semibold text-gray-800 mb-2">
                              آدرس
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                              البرز - شهرجدیدهشتگرد(مهستان) - فاز 1 میدان
                              یادبود-درمانگاه پارسیان طبقه اول
                            </p>
                          </div>
                          <MapPin className="w-6 h-6 text-amber-700 mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Contact;
