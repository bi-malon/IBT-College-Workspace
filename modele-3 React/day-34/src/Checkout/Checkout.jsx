// src/checkout/Checkout.jsx
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-lg space-y-4 p-6">
      <h1 className="text-xl font-semibold text-gray-900">Checkout</h1>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-1 text-sm text-gray-700">
          {items.map((i) => (
            <li key={i.id}>{i.qty} × {i.name} — {i.price * i.qty} ETB</li>
          ))}
        </ul>
      )}
      <p className="text-base font-semibold text-gray-900">Total: {total} ETB</p>
      <button
        onClick={() => navigate("/receipt")}
        disabled={items.length === 0}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        Place order
      </button>
    </div>
  );
}
