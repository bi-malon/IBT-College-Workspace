// Day 24 Constants
const STORAGE_KEYS = {
  SAVED_TRIPS: "sheger_saved_trips",
  THEME: "sheger_theme",
};

const CATEGORIES = {
  ALL: "ALL",
  BUS: "Bus",
  RIDE: "Ride",
  TAXI: "Taxi",
};

// Ethiopian Mobile Number Regex: Matches 09... / 07... or +2519... / +2517...
const ETHIOPIAN_PHONE_REGEX = /^(?:\+251|0)[97]\d{8}$/;

// Centralized State Object
const state = {
  services: [],
  savedIds: JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_TRIPS)) || [],
  searchTerm: "",
  activeCategory: CATEGORIES.ALL,
  theme: localStorage.getItem(STORAGE_KEYS.THEME) || "light",
  selectedRouteId: null,
};

// DOM Elements
const servicesContainer = document.querySelector("#services-container");
const savedList = document.querySelector("#saved-list");
const totalFareEl = document.querySelector("#total-fare");
const searchInput = document.querySelector("#search-input");
const filterBtns = document.querySelectorAll(".filter-btn");
const themeToggleBtn = document.querySelector("#theme-toggle");
const checkoutForm = document.querySelector("#checkout-form");
const nameInput = document.querySelector("#passenger-name");
const phoneInput = document.querySelector("#passenger-phone");
const areaSelect = document.querySelector("#delivery-area");
const formError = document.querySelector("#form-error");
const confirmationBox = document.querySelector("#confirmation-box");

// Compact & Dynamic Terminal Departure Board Renderer
function renderDepartureBoard(selectedRoute = null) {
  const boardBody = document.querySelector("#departure-board-body");
  const clockEl = document.querySelector("#board-clock");
  if (!boardBody) return;

  // Update Clock
  const now = new Date();
  if (clockEl) {
    clockEl.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  // Render all rows inside the scrollable container
  const rows = state.services
    .map((item, index) => {
      const isSelected = selectedRoute && selectedRoute.id === item.id;
      const isSaved = state.savedIds.includes(item.id);

      let statusText = item.status || "On Time";
      let statusClass = "status-arriving";

      if (isSelected) {
        statusText = "SELECTED";
        statusClass = "status-boarding";
      } else if (isSaved) {
        statusText = "BOOKED";
        statusClass = "status-booked";
      }

      const departureMinutes = (15 + index * 12) % 60;
      const departureTime = `${11 + Math.floor(index / 2)}:${
        departureMinutes < 10 ? "0" : ""
      }${departureMinutes}`;

      return `
      <tr style="${
        isSelected
          ? "background: rgba(56, 189, 248, 0.15); font-weight: bold;"
          : ""
      }">
        <td style="color: var(--brand-primary);">${departureTime}</td>
        <td><strong>${item.origin} ➔ ${item.destination}</strong></td>
        <td>${item.type}</td>
        <td><span class="bay-badge">Bay ${index + 1}</span></td>
        <td class="${statusClass}">${statusText}</td>
      </tr>
    `;
    })
    .join("");

  boardBody.innerHTML = rows;
}

// 1. Theme and Helper Functions
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  state.theme = theme;
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  themeToggleBtn.innerHTML = theme === "dark" ? " Light Mode" : " Dark Mode";
}

function calculateTotalFare() {
  return state.savedIds.reduce((total, id) => {
    const item = state.services.find((s) => s.id === id);
    return total + (item ? item.priceETB : 0);
  }, 0);
}

function getBgClass(type = "") {
  const lower = type.toLowerCase();
  if (lower.includes("bus")) return "card-bg-bus";
  if (lower.includes("ride")) return "card-bg-ride";
  if (lower.includes("taxi")) return "card-bg-taxi";
  return "";
}

// 2. Form Validation Guard Clause
function validateCheckout(name, phone) {
  if (!name.trim()) return "Please enter your full name.";
  if (!ETHIOPIAN_PHONE_REGEX.test(phone.trim())) {
    return "Enter a valid Ethiopian phone (e.g. 0911234567 or +251911234567).";
  }
  if (state.savedIds.length === 0)
    return "Your cart is empty. Save a trip first!";
  return "";
}

// 3. Render Pipeline
function renderServices() {
  const filtered = state.services.filter((item) => {
    const term = state.searchTerm.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(term) ||
      item.origin.toLowerCase().includes(term) ||
      item.destination.toLowerCase().includes(term);

    const matchesCategory =
      state.activeCategory === CATEGORIES.ALL ||
      item.type === state.activeCategory;

    return matchesSearch && matchesCategory;
  });

  servicesContainer.innerHTML = "";

  if (filtered.length === 0) {
    servicesContainer.innerHTML = `<p style="color:var(--text-muted)">No transit options found matching your search.</p>`;
    return;
  }

  filtered.forEach((item) => {
    const isSaved = state.savedIds.includes(item.id);
    const isSelected = state.selectedRouteId === item.id;
    const bgClass = getBgClass(item.type);

    const card = document.createElement("div");
    card.className = `card ${bgClass} ${isSelected ? "selected-card" : ""}`;
    card.setAttribute("data-route-id", item.id);
    card.style.cursor = "pointer";

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

function renderCart() {
  savedList.innerHTML = "";
  const totalETB = calculateTotalFare();

  if (state.savedIds.length === 0) {
    savedList.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem;">No saved trips added yet.</p>`;
    totalFareEl.textContent = "0 ETB";
    return;
  }

  state.savedIds.forEach((id) => {
    const item = state.services.find((s) => s.id === id);
    if (!item) return;

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

function render() {
  renderServices();
  renderCart();
  const activeRoute = state.services.find(
    (s) => s.id === state.selectedRouteId,
  );
  renderDepartureBoard(activeRoute);
}

// 4. Order Submission Handler
function placeOrder(data) {
  const totalETB = calculateTotalFare();

  confirmationBox.classList.remove("hidden");
  confirmationBox.innerHTML = `
    ✅ <strong>Order Confirmed!</strong><br />
    Passenger: ${data.name}<br />
    Station: ${data.area}<br />
    Amount Paid: <strong>${totalETB} ETB</strong> via TeleBirr (${data.phone})
  `;

  state.savedIds = [];
  localStorage.setItem(
    STORAGE_KEYS.SAVED_TRIPS,
    JSON.stringify(state.savedIds),
  );
  checkoutForm.reset();
  formError.textContent = "";
  render();
}

// 5. Event Listeners & Delegation
themeToggleBtn.addEventListener("click", () => {
  const nextTheme = state.theme === "light" ? "dark" : "light";
  applyTheme(nextTheme);
});

document.addEventListener("click", (e) => {
  const saveId = e.target.dataset.id;
  const removeId = e.target.dataset.remove;
  const cardEl = e.target.closest("[data-route-id]");

  // 1. Handle Save Trip Button
  if (saveId) {
    e.stopPropagation();
    if (state.savedIds.includes(saveId)) {
      state.savedIds = state.savedIds.filter((id) => id !== saveId);
    } else {
      state.savedIds.push(saveId);
    }
    localStorage.setItem(
      STORAGE_KEYS.SAVED_TRIPS,
      JSON.stringify(state.savedIds),
    );
    confirmationBox.classList.add("hidden");
    render();
    return;
  }

  // 2. Handle Cart Remove Button
  if (removeId) {
    state.savedIds = state.savedIds.filter((id) => id !== removeId);
    localStorage.setItem(
      STORAGE_KEYS.SAVED_TRIPS,
      JSON.stringify(state.savedIds),
    );
    render();
    return;
  }

  // 3. Handle Route Card Click (Highlight & Update Departure Board)
  if (cardEl && !saveId) {
    const rawId = cardEl.getAttribute("data-route-id");
    const routeId = isNaN(rawId) ? rawId : Number(rawId);
    const selectedItem = state.services.find(
      (s) => s.id === routeId || s.id === rawId,
    );

    if (selectedItem) {
      state.selectedRouteId = routeId;
      renderServices();
      renderDepartureBoard(selectedItem);
    }
  }
});

searchInput.addEventListener("input", (e) => {
  state.searchTerm = e.target.value;
  renderServices();
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    state.activeCategory = btn.dataset.type;
    renderServices();
  });
});

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const phone = phoneInput.value;
  const area = areaSelect.value;

  const errorMsg = validateCheckout(name, phone);

  if (errorMsg) {
    formError.textContent = errorMsg;
    return;
  }

  placeOrder({ name, phone, area });
});

// Real-time clock tick for departure monitor
setInterval(() => {
  const activeRoute = state.services.find(
    (s) => s.id === state.selectedRouteId,
  );
  renderDepartureBoard(activeRoute);
}, 1000);

// App Initialization
async function loadServices() {
  try {
    const res = await fetch("data/transit.json");
    state.services = await res.json();

    render();

    // Auto-select the first route for board initialization
    if (state.services.length > 0) {
      state.selectedRouteId = state.services[0].id;
      renderDepartureBoard(state.services[0]);
    }
  } catch (err) {
    servicesContainer.innerHTML = `<p style="color:var(--text-muted)">Failed to load transit data.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(state.theme);
  loadServices();
});
