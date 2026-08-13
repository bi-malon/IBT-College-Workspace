# TeleBirr Transaction Report Mini-Project

This project processes TeleBirr transactions using ES module syntax and JavaScript functional array methods (`map`, `filter`, `reduce`), destructuring, and object spread syntax.

## Module Responsibilities

- **`transactions.js`**: Contains and exports the raw sample data array of transaction objects.
- **`report.js`**: Houses utility/summary functions for calculations, receipt formatting, and immutable object updates.
- **`app.js`**: The main entry point that imports data and functions, executes the reporting pipeline, and prints results to the terminal.

## How to Run

Ensure Node.js is installed and `package.json` has `"type": "module"` set (or run directly in a Node environment supporting ES modules):

```bash
node app.js
```
