import { useEffect, useMemo, useState } from "react";
import resourcesData from "../data/resources.json";
import { fetchData } from "../data/fetchData";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import "./Resources.css";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchData(resourcesData)
      .then((data) => {
        if (!cancelled) setResources(data);
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

  const filtered = useMemo(
    () =>
      resources.filter((resource) =>
        resource.name.toLowerCase().includes(search.toLowerCase())
      ),
    [resources, search]
  );

  const grouped = useMemo(() => {
    return filtered.reduce((acc, resource) => {
      acc[resource.category] = acc[resource.category] || [];
      acc[resource.category].push(resource);
      return acc;
    }, {});
  }, [filtered]);

  return (
    <div className="page">
      <p className="eyebrow">Support services</p>
      <h1>Resources</h1>
      <p>
        Academic help, career support, and student services — organized by
        category.
      </p>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search resources..."
      />

      {loading && <Loading label="Loading resources..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && filtered.length === 0 && (
        <p className="state-message">No resources match your search.</p>
      )}

      {!loading &&
        !error &&
        Object.entries(grouped).map(([category, items]) => (
          <section key={category} className="resource-group">
            <h2>{category}</h2>
            <ul className="resource-list">
              {items.map((resource) => (
                <li key={resource.id} className="resource-item">
                  <div>
                    <h3>{resource.name}</h3>
                    <p>{resource.description}</p>
                    <p className="resource-item__meta">
                      {resource.hours} &middot; {resource.location}
                    </p>
                  </div>
                  <a
                    href={resource.link}
                    className="btn btn--ghost"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
}
