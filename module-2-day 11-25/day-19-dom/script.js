const todoList = document.querySelector("#todo-list");

todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const li = event.target.parentElement;
    li.remove();
  }
  if (event.target.classList.contains("delete-btn2")) {
    const li = event.target.parentElement;
    const clone = li.cloneNode(true);
    const newButton = document.createElement("button");
    newButton.textContent = "Delete";
    newButton.classList.add("delete-btn");
    clone.textContent = "ohhhh";
    clone.append(newButton);
    li.parentElement.append(clone);
  }
});

const form = document.querySelector("#item-form");
const input = document.querySelector("#item-input");
const displayList = document.querySelector("#display-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newItemText = input.value;

  const li = document.createElement("li");
  li.textContent = newItemText;
  displayList.appendChild(li);

  input.value = "";
});
