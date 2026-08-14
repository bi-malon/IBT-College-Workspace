// Cache DOM targets
const out = document.querySelector("#facts");
const searchForm = document.querySelector("#search-form");
const countryInput = document.querySelector("#country-input");

// Main async function to fetch and display country data
async function showCountry(name) {
  // 1. Show Loading State
  out.innerHTML = `<div class="status-text">Loading country data...</div>`;

  try {
    // Wrapped with corsproxy.io to bypass CORS restrictions
    const targetUrl = `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;

    const res = await fetch(proxyUrl);

    // 2. Check if response is OK (e.g. handle HTTP 404)
    if (!res.ok) {
      throw new Error("Country not found. Please check the spelling.");
    }

    const [country] = await res.json();

    // Clear previous view
    out.innerHTML = "";

    // Render Flag
    if (country.flags && country.flags.png) {
      const flagImg = document.createElement("img");
      flagImg.src = country.flags.png;
      flagImg.alt = `Flag of ${country.name.common}`;
      flagImg.className = "flag-img";
      out.appendChild(flagImg);
    }

    // Render Country Name Title
    const title = document.createElement("h2");
    title.className = "country-name";
    title.textContent = country.name.common;
    out.appendChild(title);

    // Format fields with fallbacks
    const capital = country.capital ? country.capital[0] : "N/A";
    const population = country.population
      ? country.population.toLocaleString()
      : "N/A";
    const region = country.region || "N/A";

    // Format Currencies
    let currencies = "N/A";
    if (country.currencies) {
      currencies = Object.values(country.currencies)
        .map((curr) => `${curr.name} (${curr.symbol || ""})`)
        .join(", ");
    }

    // 3. Render Fact Rows dynamically
    appendFactRow("Capital", capital);
    appendFactRow("Population", population);
    appendFactRow("Region", region);
    appendFactRow("Currencies", currencies);
  } catch (err) {
    // Show friendly error message on failure
    out.innerHTML = `<div class="status-text error">⚠️ ${err.message}</div>`;
  }
}

// Helper function to build DOM fact rows cleanly
function appendFactRow(label, value) {
  const row = document.createElement("div");
  row.className = "fact-item";

  const labelSpan = document.createElement("span");
  labelSpan.className = "fact-label";
  labelSpan.textContent = label;

  const valueSpan = document.createElement("span");
  valueSpan.className = "fact-value";
  valueSpan.textContent = value;

  row.appendChild(labelSpan);
  row.appendChild(valueSpan);
  out.appendChild(row);
}

// Search form event listener
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = countryInput.value.trim();
  if (query) {
    showCountry(query);
  }
});

// Default to Ethiopia on first load
showCountry("ethiopia");
