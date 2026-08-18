const state = {
  rates: {},
  status: "idle",
  errorMessage: "",
  watchlist: ["USD", "EUR", "GBP"],
  conversionResult: null,
};

const STORAGE_KEY = "birr_watch_state";

const statusLine = document.querySelector("#status-line");
const currencySelect = document.querySelector("#currency-select");
const watchlistSelect = document.querySelector("#watchlist-select");
const convertForm = document.querySelector("#convert-form");
const amountInput = document.querySelector("#amount-input");
const convertResult = document.querySelector("#convert-result");
const watchlistForm = document.querySelector("#watchlist-form");
const watchlistContainer = document.querySelector("#watchlist-container");

async function loadRates() {
  state.status = "loading";
  render();

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/ETB");

    if (!res.ok) {
      throw new Error(`Server returned status code ${res.status}`);
    }

    const data = await res.json();
    state.rates = data.rates;
    state.status = "success";
  } catch (err) {
    state.status = "error";
    state.errorMessage = err.message || "Failed to fetch ETB rates.";
  } finally {
    render();
  }
}

function render() {
  if (state.status === "loading") {
    statusLine.textContent = " Fetching live ETB exchange rates...";
    statusLine.className = "status-loading";
  } else if (state.status === "error") {
    statusLine.textContent = ` Error: ${state.errorMessage}`;
    statusLine.className = "status-error";
  } else if (state.status === "success") {
    statusLine.textContent = "  ...";
    statusLine.className = "status-success";
  }

  const currencies = Object.keys(state.rates);
  if (currencies.length > 0 && currencySelect.children.length <= 1) {
    currencySelect.innerHTML = `<option value="">Select  currency...</option>`;
    watchlistSelect.innerHTML = `<option value="">Select currency ...</option>`;

    currencies.forEach((code) => {
      const opt1 = document.createElement("option");
      opt1.value = code;
      opt1.textContent = code;
      currencySelect.appendChild(opt1);

      const opt2 = document.createElement("option");
      opt2.value = code;
      opt2.textContent = code;
      watchlistSelect.appendChild(opt2);
    });
  }

  if (state.conversionResult) {
    convertResult.textContent = state.conversionResult;
  }

  watchlistContainer.innerHTML = "";
  if (state.watchlist.length === 0) {
    watchlistContainer.innerHTML = `<div class="empty-msg">No currencies in your watchlist.</div>`;
  } else {
    state.watchlist.forEach((code) => {
      const rate = state.rates[code] ? state.rates[code].toFixed(4) : "N/A";
      const item = document.createElement("div");
      item.className = "watchlist-item";
      item.innerHTML = `
        <span><strong>1 ETB</strong> = ${rate} ${code}</span>
        <button class="remove-btn" data-code="${code}">✕</button>
      `;
      watchlistContainer.appendChild(item);
    });
  }

  saveState();
}

convertForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = parseFloat(amountInput.value);
  const targetCode = currencySelect.value;

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid positive amount.");
    return;
  }

  if (!targetCode) {
    alert("Please select a target currency.");
    return;
  }

  const rate = state.rates[targetCode];
  if (rate) {
    const total = (amount * rate).toFixed(4);
    state.conversionResult = `${amount} ETB = ${total} ${targetCode}`;
    render();
  }
});

watchlistForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectedCode = watchlistSelect.value;

  if (!selectedCode) return;

  if (!state.watchlist.includes(selectedCode)) {
    state.watchlist.push(selectedCode);
    watchlistSelect.value = "";
    render();
  } else {
    alert(`${selectedCode} is already in your watchlist.`);
  }
});

watchlistContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const codeToRemove = e.target.getAttribute("data-code");
    state.watchlist = state.watchlist.filter((code) => code !== codeToRemove);
    render();
  }
});

function saveState() {
  const data = {
    watchlist: state.watchlist,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.watchlist)) {
        state.watchlist = parsed.watchlist;
      }
    } catch (err) {
      console.error("Failed to parse saved state", err);
    }
  }
}

function init() {
  loadState();
  loadRates();
}

init();
