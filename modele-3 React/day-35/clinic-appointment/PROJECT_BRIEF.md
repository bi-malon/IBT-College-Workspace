# Project Brief — MedQ (Clinic Appointment Booking)

## What problem am I solving?
Small and mid-size clinics still book appointments over the phone. Patients
can't see which doctors are available, front-desk staff spend most of their
day on the phone instead of with patients, and double-bookings happen
because the schedule lives in someone's head or a paper diary.

## Who is the main user?
A **patient** looking to book a visit with a doctor at a clinic, without
calling in. (A future v2 could add a clinic-staff/admin role to manage
schedules — out of scope for this capstone's first pass.)

## What does the user do?
1. Browse doctors, optionally filtered by specialty.
2. Open a doctor's profile and see their upcoming available time slots.
3. Pick a slot and confirm a booking.
4. Log in to see their own upcoming and past appointments.
5. Open an appointment to view details or cancel it.

## Main features
- Doctor directory with specialty filter
- Doctor profile with a list of open slots
- Appointment booking flow (select slot → confirm)
- "My Appointments" list (upcoming / past)
- Appointment detail + cancel
- Basic login (mocked for now; real auth is a stretch goal)

## Screens (5, chosen to stay inside the 4–6 range)
| Screen | Purpose | Data it needs |
|---|---|---|
| **Home** (`/`) | Browse/filter doctors | List of doctors: id, name, specialty, clinic location, photo |
| **Doctor Detail** (`/doctors/:id`) | See one doctor's profile + open slots | Doctor's full profile, list of slots: date, time, isBooked |
| **Book Appointment** (`/doctors/:id/book`) | Confirm a chosen slot | Selected doctor, selected slot, patient contact info |
| **My Appointments** (`/appointments`) | See the logged-in patient's bookings | List of appointments: id, doctorName, date, time, status |
| **Appointment Detail** (`/appointments/:id`) | View one booking, cancel it | Full appointment record + cancel action |

Login (`/login`) is a 6th lightweight screen supporting the auth-gated ones
above.

## Route Map
| Route | Dynamic? | Requires auth (eventually)? |
|---|---|---|
| `/` | No | No |
| `/doctors/:id` | Yes (`:id` = doctor id) | No |
| `/doctors/:id/book` | Yes | Yes — booking should require a logged-in patient |
| `/appointments` | No | Yes — a patient's own bookings |
| `/appointments/:id` | Yes (`:id` = appointment id) | Yes |
| `/login` | No | No |

## Out of scope for now
Clinic-staff dashboard, payments, real backend/auth, reminders/notifications.
These are natural "if I have time later" extensions, not part of the 4–6
screen core.
