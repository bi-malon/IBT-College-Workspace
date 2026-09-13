import { useEffect, useMemo, useState } from "react";
import clubsData from "../data/clubs.json";
import { fetchData } from "../data/fetchData";
import ClubCard from "../components/ClubCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchData(clubsData)
      .then((data) => {
        if (!cancelled) setClubs(data);
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
    () => [...new Set(clubs.map((club) => club.category))],
    [clubs]
  );

  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      const matchesSearch = club.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = category === "All" || club.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [clubs, search, category]);

  return (
    <div className="page">
      <p className="eyebrow">Student organizations</p>
      <h1>Clubs</h1>
      <p>
        From robotics to jazz, find a group of students who care about the
        same things you do.
      </p>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search clubs by name..."
      />

      {!loading && !error && categories.length > 0 && (
        <FilterBar
          categories={categories}
          active={category}
          onChange={setCategory}
        />
      )}

      {loading && <Loading label="Loading clubs..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && filteredClubs.length === 0 && (
        <p className="state-message">No clubs match your search.</p>
      )}

      {!loading && !error && filteredClubs.length > 0 && (
        <div className="card-grid">
          {filteredClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      )}
    </div>
  );
}
