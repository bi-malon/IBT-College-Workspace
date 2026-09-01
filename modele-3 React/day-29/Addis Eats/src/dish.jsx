import { useState } from "react";

export default function Dish({ dish, onAddToCart }) {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount((prevCount) => prevCount + 1);
    onAddToCart(dish.price);
  };

  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white flex justify-between items-center my-2">
      <div>
        <h3 className="font-bold text-lg text-gray-800">
          {dish.name} {dish.spicy && <span title="Spicy">🌶️</span>}
        </h3>
        <p className="text-gray-600 font-medium">{dish.price} ETB</p>
      </div>

      <div className="flex items-center gap-3">
        {count > 0 && (
          <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full text-xs">
            x{count}
          </span>
        )}
        <button
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-1.5 rounded transition text-sm"
        >
          Add
        </button>
      </div>
    </div>
  );
}
