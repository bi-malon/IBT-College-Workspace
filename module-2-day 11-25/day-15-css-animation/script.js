// DOM Element Selectors
const calcForm = document.getElementById("calc-form");
const amountInput = document.getElementById("amount");
const transferTypeSelect = document.getElementById("transfer-type");
const resultsCard = document.getElementById("results");

const resBase = document.getElementById("res-base");
const resFee = document.getElementById("res-fee");
const resTotal = document.getElementById("res-total");

// Fee Rate Map
const FEE_RATES = {
  agent: 0.015, // 1.5%
  bank: 0.01, // 1.0%
  p2p: 0.005, // 0.5%
};

// Event Listener for Form Submission
calcForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page refresh

  // Get and parse user input values
  const baseAmount = parseFloat(amountInput.value);
  const selectedType = transferTypeSelect.value;

  // Validation Check
  if (isNaN(baseAmount) || baseAmount <= 0) {
    alert("Please enter a valid amount greater than 0 ETB.");
    return;
  }

  // Calculate Fee & Total
  const rate = FEE_RATES[selectedType] || 0;
  const fee = baseAmount * rate;
  const totalRequired = baseAmount + fee;

  // Render Formatted Output (ETB)
  resBase.textContent = `${formatCurrency(baseAmount)} ETB`;
  resFee.textContent = `${formatCurrency(fee)} ETB`;
  resTotal.textContent = `${formatCurrency(totalRequired)} ETB`;

  // Reveal results card
  resultsCard.classList.remove("hidden");
});

// Helper function to format numbers cleanly with 2 decimals
function formatCurrency(amount) {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
