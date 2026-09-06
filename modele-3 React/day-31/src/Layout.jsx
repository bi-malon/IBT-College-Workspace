import { Link, Outlet } from "react-router-dom";

export default function Layout({ cartCount }) {
  return (
    <div className="app-layout" style={{ padding: "20px" }}>
      <header style={{ borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
        <h1>Addis Eats</h1>
        <nav style={{ display: "flex", gap: "15px" }}>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart ({cartCount})</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
