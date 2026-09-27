// src/App.jsx
import { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import { MenuUnavailable, CartUnavailable } from "./ui/Fallbacks";
import Skeleton from "./ui/Skeleton";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";

// Lazy-loaded behind Suspense: someone browsing the menu never downloads
// the checkout/receipt bundle until they actually navigate there.
const Checkout = lazy(() => import("./checkout/Checkout"));
const Receipt = lazy(() => import("./checkout/Receipt"));

function Home() {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[1fr_320px]">
      {/* Separate boundary: a crash in the menu can't take out the cart. */}
      <ErrorBoundary label="menu" fallback={({ reset }) => <MenuUnavailable reset={reset} />}>
        <Menu />
      </ErrorBoundary>

      <ErrorBoundary label="cart" fallback={({ reset }) => <CartUnavailable reset={reset} />}>
        <Cart />
      </ErrorBoundary>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <header className="border-b border-gray-100 bg-white px-6 py-4">
        <Link to="/" className="text-lg font-semibold text-gray-900">Addis Eats</Link>
      </header>

      <Suspense fallback={<Skeleton label="Loading page..." />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/receipt" element={<Receipt />} />
        </Routes>
      </Suspense>
    </CartProvider>
  );
}
