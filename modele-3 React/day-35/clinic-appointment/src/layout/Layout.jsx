// src/layout/Layout.jsx
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          <span className="brand-mark">Mq</span> MedQ
        </Link>
        <nav className="nav-links">
          <Link to="/">Find a doctor</Link>
          <Link to="/appointments">My appointments</Link>
          <Link to="/login">Log in</Link>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
