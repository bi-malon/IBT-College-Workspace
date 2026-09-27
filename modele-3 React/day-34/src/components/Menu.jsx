// src/components/Menu.jsx
import { useCallback, useMemo, useState } from "react";
import { dishes } from "../data/dishes";
import { useCart } from "../context/CartContext";
import DishCard from "./DishCard";
import DishModal from "./DishModal";

export default function Menu() {
  // IMPORTANT: search lives HERE, not in App. Every keystroke only
  // re-renders Menu and its DishCards — it can no longer touch Cart.
  // See PROFILE.md for the before/after measurement of this fix.
  const [search, setSearch] = useState("");
  const [activeDish, setActiveDish] = useState(null);
  const { addItem } = useCart();

  const filtered = useMemo(
    () => dishes.filter((d) => d.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  // Stable callback reference so DishCard's React.memo actually prevents
  // re-renders instead of getting a new function prop every render.
  const handleAdd = useCallback((dish) => addItem(dish), [addItem]);
  const handleOpenDetails = useCallback((dish) => setActiveDish(dish), []);
  const handleCloseDetails = useCallback(() => setActiveDish(null), []);

  return (
    <section className="space-y-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search the menu..."
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((dish) => (
          <DishCard key={dish.id} dish={dish} onAdd={handleAdd} onOpenDetails={handleOpenDetails} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-sm text-gray-400">No dishes match "{search}".</p>
        )}
      </div>

      <DishModal dish={activeDish} isOpen={!!activeDish} onClose={handleCloseDetails} onAdd={handleAdd} />
    </section>
  );
}
