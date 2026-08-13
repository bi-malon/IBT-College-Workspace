const input = document.querySelector("#item-input");
const button = document.querySelector("#item-form button");
button.addEventListener("click", () => {
  const color = input.value.trim();
  if (color === "") {
    return;
  }
  document.body.style.backgroundColor = color;
});
