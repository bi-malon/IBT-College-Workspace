# 🚌 Sheger Transit Engine

Sheger Transit Engine is a responsive web application designed for commuters in Addis Ababa to explore, track, and book local transport options including buses, taxis, and rides. It features a real-time departure board, instant route filtering, an interactive booking cart, and local phone number validation.

---

## 🔗 Project Links

- 🎥 **Loom Demo Video:** [Watch Presentation Video](https://www.loom.com/share/9c8b5ba0f1974f77b30b37dcc2f37e93)
- 🌐 **Live Application:** [View Live App](https://shegert.netlify.app)

---

## ✨ Features

- 🚏 **Live Terminal Board:** Displays departure times, blinking status indicators (`SELECTED`, `BOOKED`), and a real-time clock.
- 🔍 **Search & Category Filtering:** Filter transit choices by category (Bus, Ride, Taxi) or search destinations like Bole, Piazza, and Megenagna.
- 🛒 **Interactive Booking Cart:** Add or remove trips with dynamic ETB fare calculation.
- 📱 **Validated Form Checkout:** Custom form handling with regular expression validation for Ethiopian mobile numbers (`09...`, `07...`, or `+251...`).
- 🌙 **Theme Switcher:** Toggle between Light and Dark visual modes.

---

## ⚙️ Key JavaScript Concepts Used

- **Fetch API (`async/await`):** Asynchronously loads transit data from `data/transit.json`.
- **DOM Manipulation:** Dynamically creates and updates elements on the page without full reloads.
- **Event Listeners:** Listens for user clicks, search input changes, and form submissions.
- **LocalStorage:** Saves booked trips and theme preferences so data persists across browser refreshes.
- **Form Validation:** Uses Regular Expressions (`/^(?:\+251|0)[97]\d{8}$/`) to validate local mobile numbers.

---

## 🛠️ Local Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/bi-malon/IBT-College-Workspace/tree/main/module-2-day%2011-25/day-24-project]
   ```
