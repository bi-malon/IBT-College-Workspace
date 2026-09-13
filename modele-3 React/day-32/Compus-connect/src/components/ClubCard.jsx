import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "./Card.css";

export default function ClubCard({ club }) {
  const { isClubFavorite, toggleFavoriteClub } = useFavorites();
  const favorite = isClubFavorite(club.id);

  return (
    <article className="card">
      <div className="card__image-wrap">
        <img src={club.image} alt="" className="card__image" />
        <button
          className={"card__favorite" + (favorite ? " card__favorite--on" : "")}
          onClick={() => toggleFavoriteClub(club.id)}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? "★" : "☆"}
        </button>
      </div>
      <div className="card__body">
        <span className="tag">{club.category}</span>
        <h3 className="card__title">{club.name}</h3>
        <p className="card__description">{club.description}</p>
        <Link to={`/clubs/${club.id}`} className="card__link">
          View club details
        </Link>
      </div>
    </article>
  );
}
