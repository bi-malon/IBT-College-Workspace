// src/components/Cart.jsx
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeItem, total } = useCart();

  return (
    <aside className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">Your Cart</h2>

      {items.length === 0 ? (
        <p className="mt-3 text-sm text-gray-400">No items yet — add something tasty.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">{item.qty} × {item.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900">{item.price * item.qty} ETB</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-xs text-red-400 hover:text-red-600"
                  aria-label={`Remove ${item.name}`}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
        <span className="text-sm font-medium text-gray-700">Total</span>
        <span className="text-base font-semibold text-gray-900">{total} ETB</span>
      </div>
    </aside>
  );
}
