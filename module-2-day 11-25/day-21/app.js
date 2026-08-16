// Cache DOM elements
const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const errorMsg = document.querySelector("#error-msg");
const signupCountEl = document.querySelector("#signup-count");

const ethPhoneRegex = /^(?:\+251|251)?09?[79]\d{8}$/;

const STORAGE_KEY = "ibt_signups";

function initApp() {
  const signups = getStoredSignups();
  signupCountEl.textContent = signups.length;
}

function getStoredSignups() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameVal = nameInput.value.trim();
  const phoneVal = phoneInput.value.trim();

  if (nameVal.length < 2) {
    showError("Full name must be at least 2 characters long.");
    return;
  }

  if (!ethPhoneRegex.test(phoneVal)) {
    showError(
      "Please enter a valid Ethiopian phone number (e.g., 0911223344).",
    );
    return;
  }

  hideError();

  const newEntry = {
    name: nameVal,
    phone: phoneVal,
    timestamp: new Date().toISOString(),
  };

  const signups = getStoredSignups();
  signups.push(newEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(signups));

  signupCountEl.textContent = signups.length;

  form.reset();
  alert("🎉 Signup successful and saved securely!");
});

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.className = "error-visible";
}

function hideError() {
  errorMsg.textContent = "";
  errorMsg.className = "error-hidden";
}

initApp();
