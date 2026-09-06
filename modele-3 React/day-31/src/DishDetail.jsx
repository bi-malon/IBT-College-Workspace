import { useParams, Link } from "react-router-dom";

export default function DishDetail({ onAddToCart }) {
  const { id } = useParams();

  return (
    <div>
      <h2>Dish Detail Screen</h2>
      <p>Currently viewing item #{id}</p>
      <button onClick={() => onAddToCart(id)}>Add to Cart</button>
      <br />
      <br />
      <Link to="/menu">Back to Menu</Link>
    </div>
  );
}
