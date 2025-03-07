
import Footer from "../../Footer/Footer";
import { useCart } from "../Context/CartContext";
import { BiTrash } from "react-icons/bi";
import Navbar from "../../Header/Navbar/Navbar";


export default function ShoppingCartPage() {

  const toPersianNumerals = (number) => {
    const persianNumerals = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(number).replace(/\d/g, (digit) => persianNumerals[digit]);
  };
  const formatPrice = (price) => {
    return price.toLocaleString( { style: 'currency', currency: 'IRR' });
  };

  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  console.log(cart);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto pt-32 px-4 mt-10 py-8">
        <h1 className="text-4xl font-bold text-gray-400 mb-8">سبد</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-center items-center w-4/6 justify-between border rounded-xl   mt-3  py-4 hover:border-red-600"
              >
                <div className="image">
                  <img className="w-24" src={item.image.url} alt="" />
                </div>
                <div className="mt-0 ">
                  <h2 className="text-xl  font-semibold">{item.slug}</h2>
                  <p className="text-gray-500  mt-2 line-through">
                      {toPersianNumerals(item.price)}
                    </p>
                    <p className="text-gray-600 mt-2">
                    قیمت: {typeof item.price === "number" ? (toPersianNumerals(formatPrice(item.price))) : "N/A"} تومان
                  </p>
                    
                  
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className=" px-2 text-yellow-700  py-1 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{toPersianNumerals(item.quantity)}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className=" text-yellow-700 px-2 py-1 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="m-4 text-red-500 hover:text-red-600"
                  > 
                   <BiTrash/>
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-8">
              <p className="text-2xl font-bold">جمع: {toPersianNumerals(formatPrice(totalPrice))} تومان</p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
