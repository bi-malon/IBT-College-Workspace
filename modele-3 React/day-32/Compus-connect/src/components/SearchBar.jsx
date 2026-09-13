import "./SearchBar.css";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        aria-label={placeholder || "Search"}
      />
      {value && (
        <button
          className="search-bar__clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}
