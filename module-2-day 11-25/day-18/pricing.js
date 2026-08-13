// Calculates amount with 15% VAT
const withVat = (amount, vatRate = 0.15) => amount * (1 + vatRate);

// Formats number to ETB currency string
const format = (amount) => `${amount.toFixed(2)} ETB`;

// Calculates total for an order's items using reduce + destructuring { price, qty }
const total = (items) => {
  const subtotal = items.reduce((sum, { price, qty }) => sum + price * qty, 0);
  return withVat(subtotal);
};

module.exports = {
  withVat,
  format,
  total,
};
