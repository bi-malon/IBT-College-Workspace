// src/components/DishCard.jsx
import { memo, useState } from "react";

// React.memo here is the "memo if you must" fallback mentioned in the brief.
// It only pays off because Menu passes a stable onAdd callback (useCallback)
// and a stable dish object — otherwise memo does nothing but add overhead.
const DishCard = memo(function DishCard({ dish, onAdd, onOpenDetails }) {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    // Deliberate render-time error, used to prove the Menu ErrorBoundary
    // catches this without taking down the Cart panel next to it.
    throw new Error(`Simulated crash rendering "${dish.name}"`);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <button
        onClick={() => onOpenDetails(dish)}
        className="text-left text-base font-semibold text-gray-900 hover:text-indigo-600"
      >
        {dish.name}
      </button>
      <p className="mt-1 line-clamp-2 text-sm text-gray-500">{dish.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">{dish.price} ETB</span>
        <button
          onClick={() => onAdd(dish)}
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
        >
          Add to cart
        </button>
      </div>

      {/* Dev-only control for the ErrorBoundary isolation test in the brief. */}
      {process.env.NODE_ENV !== "production" && (
        <button
          onClick={() => setShouldThrow(true)}
          className="mt-2 text-[11px] text-red-400 underline hover:text-red-600"
        >
          💥 Simulate crash (dev only)
        </button>
      )}
    </div>
  );
});

export default DishCard;
