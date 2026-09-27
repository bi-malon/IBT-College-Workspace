// src/data/doctors.js
export const doctors = [
  {
    id: "doc1",
    name: "Dr. Selam Tesfaye",
    specialty: "General Practice",
    clinic: "Bole Medical Center",
    slots: [
      { id: "s1", date: "2026-09-29", time: "09:00", isBooked: false },
      { id: "s2", date: "2026-09-29", time: "10:30", isBooked: false },
    ],
  },
  {
    id: "doc2",
    name: "Dr. Yonas Bekele",
    specialty: "Pediatrics",
    clinic: "Kazanchis Clinic",
    slots: [
      { id: "s3", date: "2026-09-30", time: "14:00", isBooked: false },
    ],
  },
  {
    id: "doc3",
    name: "Dr. Hanna Girma",
    specialty: "Dermatology",
    clinic: "Bole Medical Center",
    slots: [
      { id: "s4", date: "2026-10-01", time: "11:00", isBooked: true },
      { id: "s5", date: "2026-10-01", time: "13:00", isBooked: false },
    ],
  },
];

// Placeholder — this would come from a logged-in patient's real bookings.
export const myAppointments = [
  {
    id: "a1",
    doctorId: "doc3",
    doctorName: "Dr. Hanna Girma",
    date: "2026-10-01",
    time: "11:00",
    status: "upcoming",
  },
];
