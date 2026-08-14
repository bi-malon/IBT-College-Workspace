async function loadAndRenderDishes() {
  try {
    const res = await fetch("https://dummyjson.com/recipes?limit=3");

    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const data = await res.json();
    renderDishes(data.recipes);
  } catch (err) {
    console.error("Failed to render dishes:", err.message);
  }
}

function renderDishes(dishes) {
  dishes.forEach((d) => console.log(`Dish: ${d.name}`));
}

loadAndRenderDishes();
