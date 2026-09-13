// Simulates an API call using local JSON data.
// This lets pages demonstrate real loading/error states with useEffect,
// even though the "backend" here is a static JSON file.
export function fetchData(data, { delay = 500, failRate = 0 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (failRate > 0 && Math.random() < failRate) {
        reject(new Error("Failed to load data. Please try again."));
      } else {
        resolve(data);
      }
    }, delay);
  });
}
