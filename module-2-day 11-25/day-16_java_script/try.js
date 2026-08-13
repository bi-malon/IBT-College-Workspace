//let rawBill = prompt("Enter the total bill amount in ETB:");
//const rawBill = "450";
//const numCustomer = 3;
//const paymentMethod = "TeleBirr";
const rawBill = "250";
const paymentMethod = "CBE Birr";
const numCustomer = 4;

const bill = Number(rawBill);

const tipRate = bill > 300 ? 0.1 : 0.05;
const tipAmount = bill * tipRate;

let serviceFee = 0;
switch (paymentMethod) {
  case "TeleBirr":
    serviceFee = 5;
    break;
  case "CBE Birr":
    serviceFee = 3;
    break;
  default:
    serviceFee = 0;
}

const totalBill = bill + tipAmount + serviceFee;
const amountPerPerson = totalBill / numCustomer;

const summaryMessage = `
--- TeleBirr Tip & Split Summary ---
Base Bill: ${bill.toFixed(2)} ETB
Tip (${tipRate * 100}%): ${tipAmount.toFixed(2)} ETB
Service Fee (${paymentMethod}): ${serviceFee.toFixed(2)} ETB
-----------------------------------
Total Amount: ${totalBill.toFixed(2)} ETB
Party Size: ${numCustomer} people
Amount Per Person: ${amountPerPerson.toFixed(2)} ETB

@2026 IBT College Exercise day 16 module 2
`;

console.log(summaryMessage);
