// src/checkout/Receipt.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Receipt() {
  const { total } = useCart();

  return (
    <div className="mx-auto max-w-lg space-y-4 p-6 text-center">
      <h1 className="text-xl font-semibold text-gray-900">Order placed 🎉</h1>
      <p className="text-sm text-gray-500">Thanks for your order. Total charged: {total} ETB.</p>
      <Link to="/" className="inline-block text-sm font-medium text-indigo-600 hover:underline">
        Back to menu
      </Link>
    </div>
  );
}
