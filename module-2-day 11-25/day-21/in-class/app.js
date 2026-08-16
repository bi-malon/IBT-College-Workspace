const name = document.querySelector("#name").value;
const form = document.querySelector("#signup");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop the reload
  const name = nameInput.value.trim();
  // ... validate, then use the data ...
});
