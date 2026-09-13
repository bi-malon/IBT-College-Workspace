import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clubsData from "../data/clubs.json";
import eventsData from "../data/events.json";
import { fetchData } from "../data/fetchData";
import ClubCard from "../components/ClubCard";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import "./Home.css";

const quickLinks = [
  { label: "Browse all clubs", to: "/clubs" },
  { label: "See upcoming events", to: "/events" },
  { label: "Find student resources", to: "/resources" },
  { label: "About CampusConnect", to: "/about" },
];

export default function Home() {
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([fetchData(eventsData), fetchData(clubsData)])
      .then(([loadedEvents, loadedClubs]) => {
        if (cancelled) return;
        setEvents(loadedEvents.slice(0, 3));
        setClubs(loadedClubs.slice(0, 3));
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
  }, []);

  return (
    <div className="page">
      <section className="hero">
        <p className="eyebrow">Student Community Portal</p>
        <h1 className="hero__title">
          All academic notices, exams, and class schedules in one place.
        </h1>
        <p className="hero__subtitle">
          Stay updated on upcoming module exams, virtual class schedules, and
          IBT leadership townhalls without missing essential Telegram updates.
        </p>
        <div className="hero__actions">
          <Link to="/clubs" className="btn btn--gold">
            Explore clubs
          </Link>
          <Link to="/events" className="btn btn--ghost">
            See events
          </Link>
        </div>
      </section>

      <hr className="hairline" />

      <section>
        <div className="section-heading">
          <h2>Featured events</h2>
          <Link to="/events" className="section-heading__link">
            View all events
          </Link>
        </div>

        {loading && <Loading label="Loading featured events..." />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <div className="card-grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      <hr className="hairline" />

      <section>
        <div className="section-heading">
          <h2>Popular clubs</h2>
          <Link to="/clubs" className="section-heading__link">
            View all clubs
          </Link>
        </div>

        {loading && <Loading label="Loading popular clubs..." />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <div className="card-grid">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        )}
      </section>

      <hr className="hairline" />

      <section>
        <h2>Quick links</h2>
        <ul className="quick-links">
          {quickLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="quick-links__item">
                {link.label} <span aria-hidden="true">&rsaquo;</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
