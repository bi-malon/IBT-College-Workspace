// src/pages/BookAppointment.jsx
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { doctors } from "../data/doctors";

export default function BookAppointment() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const slotId = searchParams.get("slot");
  const navigate = useNavigate();

  const doctor = doctors.find((d) => d.id === id);
  const slot = doctor?.slots.find((s) => s.id === slotId);

  if (!doctor || !slot) {
    return <p>That slot isn't available anymore. <Link to={`/doctors/${id}`}>Go back</Link></p>;
  }

  function handleConfirm(e) {
    e.preventDefault();
    // Real version: POST to your backend, then redirect on success.
    navigate("/appointments");
  }

  return (
    <section>
      <Link to={`/doctors/${id}`}>&larr; Back to {doctor.name}</Link>
      <h1>Confirm your appointment</h1>
      <p>{doctor.name} · {slot.date} at {slot.time}</p>

      <form onSubmit={handleConfirm} className="stacked-form">
        <label>
          Full name
          <input type="text" required placeholder="Your name" />
        </label>
        <label>
          Phone number
          <input type="tel" required placeholder="09xxxxxxxx" />
        </label>
        <button type="submit" className="btn-primary">Confirm booking</button>
      </form>
    </section>
  );
}
