// app/layout.js  →  the root layout, wraps every route in the app
//
// All internal navigation uses next/link, never a plain <a>, so
// client-side transitions work (no full page reload) across every route.

import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Mini-project: Addis Eats route tree on Next.js App Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="app-header">
            <Link href="/" className="brand">Addis Eats</Link>
            <nav className="nav-links">
              <Link href="/menu">Menu</Link>
              <Link href="/cart">Cart</Link>
              <Link href="/checkout">Checkout</Link>
            </nav>
          </header>
          <main className="app-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
