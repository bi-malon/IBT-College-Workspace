# Day 21 — Validated & Persistent Signup Form

A secure, responsive registration form built with vanilla JavaScript, regex pattern matching, and browser `localStorage` persistence.

## ⚙️ Features

- **Field Sanitization:** Automatically trims whitespace from input fields on submission.
- **Strict Validation Rules:**
  - Validates that names contain a minimum of 2 characters.
  - Validates phone inputs against standard Ethiopian carrier formats (`09xxxxxxxx`, `07xxxxxxxx`, and international country codes).
- **Error Handlers:** Displays clear, user-friendly feedback for the first validation failure encountered.
- **Persistent Storage:** Serializes validated user entries into JSON arrays and saves them directly to browser `localStorage`.
- **State Restoration:** Automatically reads and displays cumulative user signups count upon page reload.

## 🚀 How to Run

1. Open the project folder in VS Code.
2. Launch `index.html` using **Live Server** (`http://127.0.0.1:5500`).
