import "./index.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Menu from "./Menu";
import DishDetail from "./DishDetail";
import Login from "./Login";
import RequireAuth from "./RequireAuth";

function Home() {
  return <h2>Welcome to Addis Eats Landing Page</h2>;
}

function Checkout() {
  return <h2>Checkout Page — Access Granted!</h2>;
}

function NotFound() {
  return <h2>404 — Screen Not Found</h2>;
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAddToCart = (dishId) => {
    setCart((prev) => [...prev, dishId]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout cartCount={cart.length} />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route
            path="menu/:id"
            element={<DishDetail onAddToCart={handleAddToCart} />}
          />
          <Route
            path="login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="checkout"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <Checkout />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
