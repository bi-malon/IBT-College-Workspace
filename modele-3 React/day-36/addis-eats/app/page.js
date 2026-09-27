// app/page.js  →  produces the route / (home)

import Link from "next/link";

export default function HomePage() {
  return (
    <section>
      <h1>Addis Eats</h1>
      <p className="lede">Order dishes for pickup or delivery, straight from the menu.</p>
      <Link href="/menu" className="btn-primary">View the menu</Link>
    </section>
  );
}
