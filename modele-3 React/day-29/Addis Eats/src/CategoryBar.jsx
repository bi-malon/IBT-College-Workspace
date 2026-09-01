export default function CategoryBar({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className="flex gap-2 my-4 overflow-x-auto pb-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
            selectedCategory === cat
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
