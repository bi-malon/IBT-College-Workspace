# Sheger Transit — Addis Multi-Modal Transport System

A unified transit application for Addis Ababa covering Buses, Ride/Taxi Apps, and Minibus Taxis.

## Feature List

- **must** — Browse Bus, Ride, and Minibus Taxi options from `data/transit.json`.
- **must** — Filter transit options by vehicle type (All, Bus 🚌, Ride 🚗, Taxi 🚐).
- **must** — Real-time keyword search across route origins, destinations, and vehicle names.
- **must** — Save/Bookmark trips to recalculate daily commuting costs in ETB.
- **must** — Persist saved trips across page reloads using `localStorage`.
- **must** — Fully responsive grid layout using Semantic HTML5 and CSS.

## Wireframe (ASCII)

+---------------------------------------------------------------------------------+
| HEADER: 🚌 Sheger Transit | Search: [ Origin, Destination... ] |
+---------------------------------------------------------------------------------+
| CATEGORY FILTERS: [ All ] [ 🚌 Bus ] [ 🚗 Ride ] [ 🚐 Minibus Taxi ] |
+----------------------------------------------------+----------------------------+
| MAIN ROUTE / SERVICE GRID | ASIDE (BOOKMARKED TRIPS) |
| +-----------------------------------------------+ | ⭐ Saved Routes |
| | 🚌 Sheger Express Line 101 15 ETB | | - Line 101 (Megenagna) |
| | Megenagna ➔ Mexico | | - Bole Ride (250 ETB) |
| | Every 10 mins • AC Bus [+ Save Trip] | | -------------------------- |
| +-----------------------------------------------+ | Est. Daily Total: 265 ETB |
+----------------------------------------------------+----------------------------+
| FOOTER: Sheger Transit Multi-Modal Network |
+---------------------------------------------------------------------------------+
