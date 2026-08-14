async function fetchParallelDetails() {
  try {
    console.log("Fetching recipe #1 and #2 in parallel...");

    const [res1, res2] = await Promise.all([
      fetch("https://dummyjson.com/recipes/1"),
      fetch("https://dummyjson.com/recipes/2"),
    ]);

    if (!res1.ok || !res2.ok)
      throw new Error("One of the parallel requests failed");

    const [dish1, dish2] = await Promise.all([res1.json(), res2.json()]);

    console.log("Item 1 Result:", dish1.name);
    console.log("Item 2 Result:", dish2.name);
  } catch (err) {
    console.error("Parallel fetch failed:", err.message);
  }
}

fetchParallelDetails();
