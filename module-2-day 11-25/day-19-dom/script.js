const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");

// Helper to Add Row (using createElement and append as required)
function addRow(nameVal, priceVal) {
  const li = document.createElement("li");
  li.dataset.price = priceVal; // Store the price dynamically on the element

  const textSpan = document.createElement("span");
  textSpan.textContent = `${nameVal} — ${priceVal} ETB`;

  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.classList.add("del");

  // Append elements without rebuilding the whole list string
  li.appendChild(textSpan);
  li.appendChild(delBtn);
  list.appendChild(li);
}

//  Helper to Calculate Live Running Total
function updateTotal() {
  let sum = 0;
  const allItems = list.querySelectorAll("li");

  allItems.forEach((item) => {
    sum += Number(item.dataset.price);
  });

  totalEl.textContent = sum.toLocaleString(); // Adds commas for nice formatting
}

//  Form Submit Listener
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents page reload

  const n = nameInput.value.trim();
  const p = Number(priceInput.value);

  if (!n || !p) return; // Validation check

  addRow(n, p);
  form.reset();
  updateTotal();
});

// Delegated Listener on the Parent Container
list.addEventListener("click", (e) => {
  if (e.target.matches(".del")) {
    // Delete item logic
    e.target.closest("li").remove();
    updateTotal();
  } else if (e.target.matches("li")) {
    // Toggle "bought" CSS class logic
    e.target.classList.toggle("bought");
  }
});
