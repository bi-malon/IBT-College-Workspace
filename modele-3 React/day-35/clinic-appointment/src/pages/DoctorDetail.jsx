// src/pages/DoctorDetail.jsx
import { Link, useParams } from "react-router-dom";
import { doctors } from "../data/doctors";

export default function DoctorDetail() {
  const { id } = useParams();
  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) {
    return <p>Doctor not found. <Link to="/">Back to search</Link></p>;
  }

  return (
    <section>
      <Link to="/">&larr; Back to search</Link>
      <h1>{doctor.name}</h1>
      <p>{doctor.specialty} at {doctor.clinic}</p>

      <h2>Available slots</h2>
      <ul className="slot-list">
        {doctor.slots.map((slot) => (
          <li key={slot.id}>
            <span className="slot-time">{slot.date} · {slot.time}</span>
            {slot.isBooked ? (
              <span className="stamp stamp-cancelled">Booked</span>
            ) : (
              <Link to={`/doctors/${doctor.id}/book?slot=${slot.id}`} className="btn-small">
                Book this slot
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
