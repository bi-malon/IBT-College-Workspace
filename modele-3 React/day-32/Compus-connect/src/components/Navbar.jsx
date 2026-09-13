import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/clubs", label: "Clubs" },
  { to: "/events", label: "Events" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__mark">CC</span>
          <span className="navbar__name">CampusConnect</span>
        </NavLink>

        <nav className="navbar__links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                "navbar__link" + (isActive ? " navbar__link--active" : "")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="navbar__theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
      </div>
    </header>
  );
}
