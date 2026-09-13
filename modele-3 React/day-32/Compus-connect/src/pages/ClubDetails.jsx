import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import clubsData from "../data/clubs.json";
import { fetchData } from "../data/fetchData";
import { useFavorites } from "../context/FavoritesContext";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import "./Details.css";

export default function ClubDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isClubFavorite, toggleFavoriteClub } = useFavorites();

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchData(clubsData)
      .then((data) => {
        if (cancelled) return;
        const found = data.find((item) => item.id === Number(id));
        if (!found) {
          setError("We couldn't find that club.");
        } else {
          setClub(found);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <Loading label="Loading club..." />
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="page">
        <ErrorMessage message={error || "Club not found."} />
        <button className="btn btn--ghost" onClick={() => navigate("/clubs")}>
          Back to clubs
        </button>
      </div>
    );
  }

  const favorite = isClubFavorite(club.id);

  return (
    <div className="page page--narrow">
      <Link to="/clubs" className="details__back">
        &larr; Back to clubs
      </Link>

      <img src={club.image} alt="" className="details__image" />

      <div className="details__header">
        <div>
          <span className="tag">{club.category}</span>
          <h1>{club.name}</h1>
        </div>
        <button
          className={"btn" + (favorite ? " btn--gold" : " btn--ghost")}
          onClick={() => toggleFavoriteClub(club.id)}
        >
          {favorite ? "★ Favorited" : "☆ Add to favorites"}
        </button>
      </div>

      <p>{club.description}</p>

      <hr className="hairline" />

      <div className="details__grid">
        <div>
          <h3>Meeting information</h3>
          <p>{club.meetingInfo}</p>
        </div>
        <div>
          <h3>Members</h3>
          <p>{club.members} active members</p>
        </div>
      </div>

      <h3>Interests</h3>
      <ul className="details__pills">
        {club.interests.map((interest) => (
          <li key={interest} className="details__pill">
            {interest}
          </li>
        ))}
      </ul>
    </div>
  );
}
