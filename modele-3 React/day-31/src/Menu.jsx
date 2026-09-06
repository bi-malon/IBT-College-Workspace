import { Link, useSearchParams } from "react-router-dom";

const DISHES = [
  { id: "1", name: "Doro Wat", category: "Ethiopian", price: 15 },
  { id: "2", name: "Beyaynetu", category: "Vegetarian", price: 12 },
  { id: "3", name: "Kitfo", category: "Ethiopian", price: 18 },
];

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";

  const filteredDishes =
    selectedCategory === "All"
      ? DISHES
      : DISHES.filter((dish) => dish.category === selectedCategory);

  return (
    <div>
      <h2>Menu</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        {["All", "Ethiopian", "Vegetarian"].map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setSearchParams(cat === "All" ? {} : { category: cat })
            }
          >
            {cat}
          </button>
        ))}
      </div>

      <ul>
        {filteredDishes.map((dish) => (
          <li key={dish.id}>
            {dish.name} - ${dish.price}{" "}
            <Link to={`/menu/${dish.id}`}>View Dish</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
