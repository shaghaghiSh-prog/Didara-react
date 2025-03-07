import { Heart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../ShoppingCart/CartProvider";

function ProductCart({ product }) {
  const { addToShoppingCart } = useContext(CartContext);

  const discountPercentage = Math.round(
    (1 - product.price / (product.price * 1.2)) * 100
  );

  return (
    <div className="relative group transform transition-all duration-300 hover:scale-105">
      <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          {discountPercentage}% OFF
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300">
            <Heart size={20} className="text-red-500" />
          </button>
        </div>
      </div>
      <div className="mt-2 p-4 bg-white rounded-b-lg">
        <h3 className="text-lg font-semibold truncate">{product.title}</h3>
        <button onClick={addToShoppingCart}> </button>
        <div className="mt-1">
          <span className="text-gray-500 line-through">
            ${(product.price * 1.2).toFixed(2)}
          </span>
          <span className="ml-2 text-lg font-bold text-green-600">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
export default ProductCart;
