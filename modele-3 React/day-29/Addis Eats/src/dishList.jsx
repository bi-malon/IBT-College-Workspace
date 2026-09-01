import Dish from "./dish";

export default function DishList({ dishes, onAddToCart }) {
  if (dishes.length === 0) {
    return (
      <p className="text-center text-gray-500 py-6">
        No dishes available in this category.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {dishes.map((dish) => (
        <Dish key={dish.id} dish={dish} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
