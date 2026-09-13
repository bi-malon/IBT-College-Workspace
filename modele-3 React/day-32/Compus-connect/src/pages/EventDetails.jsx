import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import eventsData from "../data/events.json";
import { fetchData } from "../data/fetchData";
import { useFavorites } from "../context/FavoritesContext";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import "./Details.css";

function formatDate(dateString) {
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isEventFavorite, toggleFavoriteEvent } = useFavorites();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchData(eventsData)
      .then((data) => {
        if (cancelled) return;
        const found = data.find((item) => item.id === Number(id));
        if (!found) {
          setError("We couldn't find that event.");
        } else {
          setEvent(found);
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
        <Loading label="Loading event..." />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="page">
        <ErrorMessage message={error || "Event not found."} />
        <button className="btn btn--ghost" onClick={() => navigate("/events")}>
          Back to events
        </button>
      </div>
    );
  }

  const favorite = isEventFavorite(event.id);

  return (
    <div className="page page--narrow">
      <Link to="/events" className="details__back">
        &larr; Back to events
      </Link>

      <img src={event.image} alt="" className="details__image" />

      <div className="details__header">
        <div>
          <span className="tag">{event.category}</span>
          <h1>{event.name}</h1>
        </div>
        <button
          className={"btn" + (favorite ? " btn--gold" : " btn--ghost")}
          onClick={() => toggleFavoriteEvent(event.id)}
        >
          {favorite ? "★ Favorited" : "☆ Add to favorites"}
        </button>
      </div>

      <p>{event.description}</p>

      <hr className="hairline" />

      <div className="details__grid">
        <div>
          <h3>When</h3>
          <p>
            {formatDate(event.date)}
            <br />
            {event.time}
          </p>
        </div>
        <div>
          <h3>Where</h3>
          <p>{event.location}</p>
        </div>
      </div>

      <h3>Organized by</h3>
      <p>{event.organizer}</p>
    </div>
  );
}
