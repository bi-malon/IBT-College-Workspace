import { transactions } from "./transactions.js";
import { totalByType, formatReceipts, updateTransaction } from "./report.js";

console.log("=== TELEBIRR TRANSACTION REPORT ===");

// 1. Calculate totals using filter + reduce
const totalCredits = totalByType(transactions, "credit");
const totalDebits = totalByType(transactions, "debit");

console.log(`Total Credits: ${totalCredits} ETB`);
console.log(`Total Debits:  ${totalDebits} ETB`);
console.log("-----------------------------------");

// 2. Generate formatted receipt list using map + destructuring
console.log("Customer Receipts:");
const receipts = formatReceipts(transactions);
receipts.forEach((receipt) => console.log(` - ${receipt}`));

console.log("-----------------------------------");

// 3. Immutably update a transaction using spread
const originalTxn = transactions[0];
const correctedTxn = updateTransaction(originalTxn, { amount: 300 });

console.log("Immutable Spread Update Demo:");
console.log("Original Txn:", originalTxn);
console.log("Updated Txn: ", correctedTxn);
