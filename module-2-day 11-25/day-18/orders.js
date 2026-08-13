module.exports = [
  {
    id: 1,
    customer: "Abebe",
    items: [
      { price: 150, qty: 2 },
      { price: 200, qty: 1 },
    ], // Subtotal: 500 -> Total + VAT: 575 ETB
  },
  {
    id: 2,
    customer: "Tigist",
    items: [
      { price: 100, qty: 1 },
      { price: 50, qty: 2 },
    ], // Subtotal: 200 -> Total + VAT: 230 ETB
  },
  {
    id: 3,
    customer: "Kebede",
    items: [{ price: 400, qty: 2 }], // Subtotal: 800 -> Total + VAT: 920 ETB
  },
];
