/* eslint-disable no-unused-vars */
import { useState } from "react";
import Modal from "react-modal";
import {
  Heart,
  ShoppingCart,
  X,
  Check,
  Star,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../Context/CartContext";
import { useFavorites } from "../Context/FavoritesContext";

// Set the app root element for accessibility
if (typeof window !== "undefined") {
  Modal.setAppElement("#root");
}

const ProductModal = ({ isOpen, onClose, product }) => {
  const { addToCart } = useCart();
  const { addToFavorites } = useFavorites();
  const { getFavoriteClassName } = useFavorites();
  const [addedToCart, setAddedToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) return null;

  // Sample additional images (in a real app, these would come from the product data)
  const productImages = [
    product.image.url,
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ];

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " تومان";
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    // Here you would add the actual cart functionality
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would add the actual favorites functionality
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setActiveImage(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Product Details"
      className="max-w-6xl mx-auto my-10 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
    >
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition duration-200 ease-in-out z-10"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row max-h-[80vh]">
          {/* Left side - Product Images */}
          <div className="lg:w-1/2 bg-gradient-to-br from-gray-50 to-white p-8">
            <div className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-2xl shadow-lg">
              <motion.img
                key={activeImage}
                src={productImages[activeImage]}
                alt={product.title || product.name}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {!isZoomed && (
                <button
                  className="absolute bottom-4 right-4 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-200"
                  onClick={() => setIsZoomed(true)}
                >
                  <ZoomIn size={20} />
                </button>
              )}

              {product.price.offer_percent > 0 && (
                <div className="absolute top-4 left-4">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    {product.price.offer_percent}% تخفیف
                  </div>
                </div>
              )}

              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-200"
                onClick={prevImage}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-200"
                onClick={nextImage}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Thumbnail gallery */}
            <div className="flex justify-center gap-4 mt-6">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    activeImage === index
                      ? "border-yellow-500 shadow-lg scale-110"
                      : "border-gray-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Product Details */}
          <div className="lg:w-1/2 p-8 overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                {product.title || product.name}
              </h2>
              <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-yellow-700 ml-2">
                  ۴.۸ (۴۸ نظر)
                </span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex flex-col space-y-2 mb-4 rtl">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 line-through text-lg">
                    قیمت قبلی: {formatPrice(product.price.amount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-gray-900">
                    قیمت جدید: {formatPrice(product.price.total)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold text-xl">
                    تخفیف: {formatPrice(product.price.offer)}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <motion.button
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-yellow-600"
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {addedToCart ? (
                    <motion.span
                      className="flex items-center justify-center"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="mr-2" size={24} />
                      اضافه شد
                    </motion.span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <ShoppingCart className="mr-2" size={24} />
                      افزودن به سبد خرید
                    </span>
                  )}
                </motion.button>

                <motion.button
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    isFavorite
                      ? "bg-red-50 border-red-200 text-red-500"
                      : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                  onClick={(e) => {
                    addToFavorites({
                      ...product,
                      quantity: 1,
                      name: product.title || product.name,
                    });
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Add to favorites"
                >
                  <motion.div
                    animate={isFavorite ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart
                      size={28}
                      className={isFavorite ? "fill-red-500 text-red-500" : ""}
                    />
                  </motion.div>
                </motion.button>
              </div>
            </div>

            {/* Custom Tabs */}
            <div className="mt-8">
              <div className="flex space-x-4 border-b border-gray-200">
                {["description", "features", "shipping"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-4 text-center font-medium transition-colors relative ${
                      activeTab === tab
                        ? "text-yellow-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab === "description" && "توضیحات"}
                    {tab === "features" && "ویژگی‌ها"}
                    {tab === "shipping" && "ارسال و تحویل"}
                    {activeTab === tab && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"
                        layoutId="activeTab"
                      />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mt-6"
                >
                  {activeTab === "description" && (
                    <div className="text-gray-700 leading-relaxed space-y-4 rtl">
                      <p className="text-lg">
                        {product.description || "توضیحات محصول در ��سترس نیست."}
                      </p>
                      <p className="text-lg">
                        این محصول با بهترین کیفیت و مواد اولیه تولید شده و برای
                        استفاده طولانی مدت طراحی شده است.
                      </p>
                    </div>
                  )}

                  {activeTab === "features" && (
                    <div className="border-gray-200 rtl">
                      <ul className="space-y-4 text-gray-700">
                        {[
                          "کیفیت بالا و مواد مرغوب",
                          "طراحی مدرن و کاربردی",
                          "گارانتی اصالت و سلامت فیزیکی کالا",
                          "قابلیت بازگشت تا ۷ روز",
                          "دارای استاندارد کیفیت بین‌المللی",
                        ].map((feature, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <div className="bg-green-100 text-green-600 p-1 rounded-full mr-3">
                              <Check size={20} />
                            </div>
                            <span className="text-lg">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === "shipping" && (
                    <div className="text-gray-700 space-y-4 rtl">
                      <div className="flex items-center mb-4">
                        <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full mr-3">
                          ارسال سریع
                        </span>
                        <p className="text-lg">ارسال در کمتر از ۲۴ ساعت کاری</p>
                      </div>
                      <p className="text-lg">
                        هزینه ارسال برای سفارش‌های بالای ۵۰۰,۰۰۰ تومان رایگان
                        می‌باشد.
                      </p>
                      <p className="text-lg">
                        امکان پرداخت در محل برای تمامی سفارش‌ها فراهم است.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-green-600 font-medium text-lg">
                    موجود در انبار
                  </span>
                </div>
                <span className="inline-block bg-yellow-100 text-yellow-700 text-sm font-semibold px-3 py-1.5 rounded-full border border-yellow-200">
                  ضمانت اصالت کالا
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Add to Cart Button (visible on mobile) */}
      <motion.div
        className="fixed bottom-4 left-4 right-4 lg:hidden"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200"
        >
          <span className="flex items-center justify-center">
            <ShoppingCart className="mr-2" size={24} />
            افزودن به سبد خرید
          </span>
        </button>
      </motion.div>
    </Modal>
  );
};

export default ProductModal;
