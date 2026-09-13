import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "./Card.css";

function formatDate(dateString) {
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function EventCard({ event }) {
  const { isEventFavorite, toggleFavoriteEvent } = useFavorites();
  const favorite = isEventFavorite(event.id);

  return (
    <article className="card">
      <div className="card__image-wrap">
        <img src={event.image} alt="" className="card__image" />
        <span className="card__date">{formatDate(event.date)}</span>
        <button
          className={"card__favorite" + (favorite ? " card__favorite--on" : "")}
          onClick={() => toggleFavoriteEvent(event.id)}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? "★" : "☆"}
        </button>
      </div>
      <div className="card__body">
        <span className="tag">{event.location}</span>
        <h3 className="card__title">{event.name}</h3>
        <p className="card__description">{event.description}</p>
        <Link to={`/events/${event.id}`} className="card__link">
          View event details
        </Link>
      </div>
    </article>
  );
}
