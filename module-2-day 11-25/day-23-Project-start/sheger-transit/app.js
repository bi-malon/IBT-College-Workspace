const state = {
  services: [],
  savedIds: JSON.parse(localStorage.getItem("sheger_saved_trips")) || [],
  searchTerm: "",
  activeCategory: "ALL",
  theme: localStorage.getItem("sheger_theme") || "light",
};

// DOM References
const servicesContainer = document.querySelector("#services-container");
const savedList = document.querySelector("#saved-list");
const totalFareEl = document.querySelector("#total-fare");
const searchInput = document.querySelector("#search-input");
const filterBtns = document.querySelectorAll(".filter-btn");
const themeToggleBtn = document.querySelector("#theme-toggle");

// 1. Initialize Theme
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  state.theme = theme;
  localStorage.setItem("sheger_theme", theme);
  themeToggleBtn.innerHTML = theme === "dark" ? " Light Mode" : " Dark Mode";
}

themeToggleBtn.addEventListener("click", () => {
  const newTheme = state.theme === "light" ? "dark" : "light";
  applyTheme(newTheme);
});

// 2. Fetch JSON Data
async function loadServices() {
  try {
    const res = await fetch("data/transit.json");
    state.services = await res.json();
    render();
  } catch (err) {
    servicesContainer.innerHTML = `<p style="color:var(--text-muted)">Failed to load transit options.</p>`;
  }
}

// Helper function to return background class by vehicle type
function getBgClass(type) {
  const lower = type.toLowerCase();
  if (lower.includes("bus")) return "card-bg-bus";
  if (lower.includes("ride")) return "card-bg-ride";
  if (lower.includes("taxi")) return "card-bg-taxi";
  return "";
}

// 3. Master Render Function
function render() {
  const filtered = state.services.filter((item) => {
    const term = state.searchTerm.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(term) ||
      item.origin.toLowerCase().includes(term) ||
      item.destination.toLowerCase().includes(term);

    const matchesCategory =
      state.activeCategory === "ALL" || item.type === state.activeCategory;

    return matchesSearch && matchesCategory;
  });

  servicesContainer.innerHTML = "";
  if (filtered.length === 0) {
    servicesContainer.innerHTML = `<p style="color:var(--text-muted)">No transit options found matching your search.</p>`;
  } else {
    filtered.forEach((item) => {
      const isSaved = state.savedIds.includes(item.id);
      const bgClass = getBgClass(item.type);

      const card = document.createElement("div");
      card.className = `card ${bgClass}`;
      card.innerHTML = `
        <div class="card-content">
          <div>
            <div class="card-header">
              <span class="type-badge">${item.icon} ${item.type}</span>
              <small style="color: var(--success); font-weight: bold;">● ${item.status}</small>
            </div>
            <div class="route-title">${item.origin} ➔ ${item.destination}</div>
            <div style="font-weight: 600; color: var(--brand-accent); margin-bottom: 4px;">${item.name}</div>
            <div class="details">${item.details}</div>
          </div>
          <div class="card-footer">
            <span class="price">${item.priceETB} ETB</span>
            <button class="save-btn ${isSaved ? "saved" : ""}" data-id="${item.id}">
              ${isSaved ? "★ Saved" : "+ Save Trip"}
            </button>
          </div>
        </div>
      `;
      servicesContainer.appendChild(card);
    });
  }

  renderSaved();
}

// 4. Render Saved Trips Sidebar
function renderSaved() {
  savedList.innerHTML = "";
  let totalETB = 0;

  if (state.savedIds.length === 0) {
    savedList.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem;">No saved trips added yet.</p>`;
    totalFareEl.textContent = "0 ETB";
    return;
  }

  state.savedIds.forEach((id) => {
    const item = state.services.find((s) => s.id === id);
    if (!item) return;

    totalETB += item.priceETB;
    const row = document.createElement("div");
    row.className = "saved-item";
    row.innerHTML = `
      <span>${item.icon} ${item.origin}–${item.destination}</span>
      <div style="display: flex; align-items: center; gap: 8px;">
        <strong>${item.priceETB} ETB</strong>
        <button style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-weight:bold;" data-remove="${item.id}">✕</button>
      </div>
    `;
    savedList.appendChild(row);
  });

  totalFareEl.textContent = `${totalETB} ETB`;
}

// Event Delegation & Filters
document.addEventListener("click", (e) => {
  const saveId = e.target.dataset.id;
  const removeId = e.target.dataset.remove;

  if (saveId) {
    if (state.savedIds.includes(saveId)) {
      state.savedIds = state.savedIds.filter((id) => id !== saveId);
    } else {
      state.savedIds.push(saveId);
    }
    localStorage.setItem("sheger_saved_trips", JSON.stringify(state.savedIds));
    render();
  }

  if (removeId) {
    state.savedIds = state.savedIds.filter((id) => id !== removeId);
    localStorage.setItem("sheger_saved_trips", JSON.stringify(state.savedIds));
    render();
  }
});

searchInput.addEventListener("input", (e) => {
  state.searchTerm = e.target.value;
  render();
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    state.activeCategory = btn.dataset.type;
    render();
  });
});

// App Initialization
applyTheme(state.theme);
loadServices();
