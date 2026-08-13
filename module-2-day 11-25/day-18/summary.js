const { format, total } = require("./pricing");
const orders = require("./orders");

// 1. Use map + spread to attach a 'total' field to each order
const ordersWithTotals = orders.map((order) => ({
  ...order,
  total: total(order.items),
}));

// 2. Use filter to list only orders over 500 ETB
const filteredOrders = ordersWithTotals.filter((order) => order.total > 500);

// 3. Calculate the grand total of the filtered orders using reduce
const grandTotal = filteredOrders.reduce((sum, order) => sum + order.total, 0);

// 4. Print formatted summary and grand total
console.log("=== Addis Market Order Summary (> 500 ETB) ===");
filteredOrders.forEach((order) => {
  console.log(`Order #${order.id} (${order.customer}): ${format(order.total)}`);
});

console.log("----------------------------------------------");
console.log(`Grand Total: ${format(grandTotal)}`);
