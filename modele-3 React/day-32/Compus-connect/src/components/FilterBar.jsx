import "./FilterBar.css";

export default function FilterBar({ categories, active, onChange }) {
  return (
    <div className="filter-bar">
      <button
        className={"filter-bar__chip" + (active === "All" ? " filter-bar__chip--active" : "")}
        onClick={() => onChange("All")}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={
            "filter-bar__chip" +
            (active === category ? " filter-bar__chip--active" : "")
          }
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
