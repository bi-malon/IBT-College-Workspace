// Filter by transaction type ("credit" or "debit") and total using reduce + parameter destructuring
export const totalByType = (txns, type) =>
  txns
    .filter((t) => t.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);

// Map with destructuring in callback ({ customer, amount }) to return template literal receipt strings
export const formatReceipts = (txns) =>
  txns.map(({ customer, amount }) => `${customer}: ${amount} ETB`);

// Spread operator to return an updated copy of a transaction without mutating the original
export const updateTransaction = (txn, updates) => ({
  ...txn,
  ...updates,
});
