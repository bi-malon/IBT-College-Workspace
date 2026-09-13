import { useEffect, useMemo, useState } from "react";
import eventsData from "../data/events.json";
import { fetchData } from "../data/fetchData";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchData(eventsData)
      .then((data) => {
        if (!cancelled) {
          const sorted = [...data].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          setEvents(sorted);
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
  }, []);

  const categories = useMemo(
    () => [...new Set(events.map((event) => event.category))],
    [events]
  );

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "All" || event.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [events, search, category]);

  return (
    <div className="page">
      <p className="eyebrow">What's coming up</p>
      <h1>Events</h1>
      <p>Upcoming events across every club on campus, soonest first.</p>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search events by name..."
      />

      {!loading && !error && categories.length > 0 && (
        <FilterBar
          categories={categories}
          active={category}
          onChange={setCategory}
        />
      )}

      {loading && <Loading label="Loading events..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && filteredEvents.length === 0 && (
        <p className="state-message">No events match your search.</p>
      )}

      {!loading && !error && filteredEvents.length > 0 && (
        <div className="card-grid">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
