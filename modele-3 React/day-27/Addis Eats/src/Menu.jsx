import PropTypes from "prop-types";
import Card from "./card";
import Dish from "./dish";

function Menu({ items, selectedCategory }) {
  // Filter dishes by selected category
  const filteredDishes = items.filter(
    (item) => item.category === selectedCategory,
  );

  // Early return pattern for empty state
  if (filteredDishes.length === 0) {
    return <p className="empty-state">No dishes found in this category.</p>;
  }

  return (
    <div className="menu-list">
      {filteredDishes.map((dish) => (
        <Card key={dish.id}>
          <Dish name={dish.name} price={dish.price} spicy={dish.spicy} />
        </Card>
      ))}
    </div>
  );
}

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool,
    }),
  ).isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default Menu;
