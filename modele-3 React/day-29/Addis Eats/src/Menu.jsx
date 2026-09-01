import { useState, useEffect, useRef } from "react";
import { loadDishes } from "./api";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);

  const searchInputRef = useRef(null);

  // Auto-focus search input on component mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Fetch dishes from API with AbortController cleanup
  useEffect(() => {
    const controller = new AbortController();

    async function fetchMenuData() {
      setLoading(true);
      setError(null);

      try {
        const data = await loadDishes(selectedCategory, controller.signal);
        setDishes(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchMenuData();

    // Cleanup function cancels pending network requests on category change/unmount
    return () => {
      controller.abort();
    };
  }, [selectedCategory]);

  const categories = ["All", "Traditional", "Vegetarian", "Fast Food"];

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddToCart = (price) => {
    setOrderTotal((prevTotal) => prevTotal + price);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center border-b pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Addis Eats</h1>
          <p className="text-xs text-gray-500">API-Driven Interactive Menu</p>
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

      {/* Auto-focused Search Field */}
      <div className="mb-4">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search dishes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Early returns for Loading and Error states */}
      {loading && (
        <div className="py-8 text-center text-blue-600 font-semibold">
          Loading the menu...
        </div>
      )}

      {error && (
        <div className="py-8 text-center text-red-600 font-semibold bg-red-50 rounded-md my-4">
          {error}
        </div>
      )}

      {!loading && !error && (
        <DishList dishes={filteredDishes} onAddToCart={handleAddToCart} />
      )}

      <OrderForm orderTotal={orderTotal} />
    </div>
  );
}
