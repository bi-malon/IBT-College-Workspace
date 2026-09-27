// src/pages/AppointmentDetail.jsx
import { Link, useParams } from "react-router-dom";
import { myAppointments } from "../data/doctors";

export default function AppointmentDetail() {
  const { id } = useParams();
  const appt = myAppointments.find((a) => a.id === id);

  if (!appt) {
    return <p>Appointment not found. <Link to="/appointments">Back to my appointments</Link></p>;
  }

  function handleCancel() {
    // Real version: call your backend to cancel, then refresh the list.
    alert("Appointment cancelled (placeholder — wire this up to your API).");
  }

  return (
    <section>
      <Link to="/appointments">&larr; Back to my appointments</Link>
      <h1>{appt.doctorName}</h1>
      <p className="slot-time">{appt.date} · {appt.time}</p>
      <span className={`stamp stamp-${appt.status}`}>{appt.status}</span>
      <button onClick={handleCancel} className="btn-danger">Cancel appointment</button>
    </section>
  );
}
