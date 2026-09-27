// src/pages/Home.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { doctors } from "../data/doctors";

export default function Home() {
  const [specialty, setSpecialty] = useState("all");

  const specialties = useMemo(
    () => ["all", ...new Set(doctors.map((d) => d.specialty))],
    []
  );

  const filtered = useMemo(
    () => (specialty === "all" ? doctors : doctors.filter((d) => d.specialty === specialty)),
    [specialty]
  );

  return (
    <section>
      <h1>Find a doctor</h1>
      <p className="lede">Book a visit directly — see who's free this week without calling the front desk.</p>

      <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
        {specialties.map((s) => (
          <option key={s} value={s}>{s === "all" ? "All specialties" : s}</option>
        ))}
      </select>

      <div className="card-grid">
        {filtered.map((doc) => (
          <Link key={doc.id} to={`/doctors/${doc.id}`} className="card">
            <h3>{doc.name}</h3>
            <p>{doc.specialty} at {doc.clinic}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
