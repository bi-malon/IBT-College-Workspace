# Sheger Transit — Manual Test Plan

## Test Execution Matrix

| Test ID   | Area       | Action / Scenario                | Expected Outcome                                      | Status |
| :-------- | :--------- | :------------------------------- | :---------------------------------------------------- | :----- |
| **TC-01** | Cart       | Submit empty checkout form       | Shows error: "Your cart is empty. Save a trip first!" | PASS   |
| **TC-02** | Validation | Enter invalid phone (`12345`)    | Shows error: "Enter a valid Ethiopian phone..."       | PASS   |
| **TC-03** | Validation | Enter valid phone (`0911234567`) | Error clears, order completes successfully            | PASS   |
| **TC-04** | State      | Save 2 trips, then refresh page  | Cart retains saved items and correct ETB total        | PASS   |
| **TC-05** | Search     | Search for non-existent station  | Shows empty message without breaking page             | PASS   |
| **TC-06** | Theme      | Click Theme Toggle button        | Layout toggles cleanly between Light and Dark mode    | PASS   |
