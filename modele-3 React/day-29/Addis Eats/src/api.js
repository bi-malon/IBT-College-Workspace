export async function loadDishes(category = "All", signal) {
  const response = await fetch("/dishes.json", { signal });

  if (!response.ok) {
    throw new Error("Could not load the menu. Please try again later.");
  }

  const data = await response.json();

  if (category && category !== "All") {
    return data.filter((dish) => dish.category === category);
  }

  return data;
}
