const list = document.querySelector("#list");
const statusEl = document.querySelector("#status");
const refreshBtn = document.querySelector("#refresh-btn");

const API_URL = "https://dummyjson.com/recipes?limit=6";

const customDishes = [
  "Shiro",
  "Doro Wat",
  "mahberawi",
  "Beyaynetu",
  "Kitfo",
  "bozena",
];

async function load() {
  statusEl.className = "status-msg loading";
  statusEl.textContent = "Loading dishes...";
  list.innerHTML = "";
  refreshBtn.disabled = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();

    const updatedRecipes = data.recipes.map((dish, index) => {
      return {
        ...dish,
        name: customDishes[index] || dish.name,
        cuisine: "Ethiopian",
      };
    });

    renderList(updatedRecipes);

    statusEl.textContent = "";
  } catch (err) {
    statusEl.className = "status-msg error";
    statusEl.textContent =
      "Failed to load dishes. Please check your connection.";
    console.error("Fetch Error:", err);
  } finally {
    refreshBtn.disabled = false;
  }
}

function renderList(dishes) {
  list.innerHTML = "";

  dishes.forEach((dish) => {
    const li = document.createElement("li");

    const nameSpan = document.createElement("span");
    nameSpan.textContent = dish.name;

    const cuisineTag = document.createElement("span");
    cuisineTag.className = "tag";
    cuisineTag.textContent = dish.cuisine;

    li.appendChild(nameSpan);
    li.appendChild(cuisineTag);
    list.appendChild(li);
  });
}

refreshBtn.addEventListener("click", load);

load();
