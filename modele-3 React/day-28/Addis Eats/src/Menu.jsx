import { useState } from "react";
import dishesData from "./data";
import CategoryBar from "./CategoryBar";
import DishList from "./dishList";
import OrderForm from "./OrderForm";

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [orderTotal, setOrderTotal] = useState(0);

  const categories = [
    "All",
    ...new Set(dishesData.map((dish) => dish.category)),
  ];

  const filteredDishes =
    selectedCategory === "All"
      ? dishesData
      : dishesData.filter((dish) => dish.category === selectedCategory);

  const handleAddToCart = (price) => {
    setOrderTotal((prevTotal) => prevTotal + price);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center border-b pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Addis Eats</h1>
          <p className="text-xs text-gray-500">Interactive Menu & Delivery</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Running Total
          </span>
          <p className="text-xl font-extrabold text-green-600">
            {orderTotal} ETB
          </p>
        </div>
      </header>

      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <DishList dishes={filteredDishes} onAddToCart={handleAddToCart} />

      <OrderForm orderTotal={orderTotal} />
    </div>
  );
}
