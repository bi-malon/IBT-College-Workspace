// src/pages/MyAppointments.jsx
import { Link } from "react-router-dom";
import { myAppointments } from "../data/doctors";

export default function MyAppointments() {
  return (
    <section>
      <h1>My appointments</h1>
      {myAppointments.length === 0 ? (
        <p>You have no upcoming appointments.</p>
      ) : (
        <ul className="slot-list">
          {myAppointments.map((appt) => (
            <li key={appt.id}>
              <Link to={`/appointments/${appt.id}`}>
                {appt.doctorName}{" "}
                <span className="slot-time">{appt.date} · {appt.time}</span>
              </Link>
              <span className={`stamp stamp-${appt.status}`}>{appt.status}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
