// index.js
//const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

async function fetchWeatherAlerts(state) {
  try {
    const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    console.log("Weather Alerts Data:", data); 
    displayAlerts(data, state);
  } catch (errorObject) {
    showError(errorObject.message);
  }
}


function displayAlerts(data, state) {
  const alertsList = document.getElementById("alerts");
  const summaryEl = document.getElementById("summary");
  const errorEl = document.getElementById("error-message");
  const loadingEl = document.getElementById("loading");

  
  alertsList.innerHTML = "";
  summaryEl.textContent = "";
  errorEl.textContent = "";
  errorEl.classList.add("hidden");
  loadingEl.classList.add("hidden");

  if (!data || !Array.isArray(data.features) || data.features.length === 0) {
    showError("No active alerts for this state.");
    return;
  }

  
  const stateTitle = data.title || state;
  summaryEl.textContent = `Current watches, warnings, and advisories for ${stateTitle}: ${data.features.length}`;

  
  data.features.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    alertsList.appendChild(li);
  });
}


function showError(message) {
  const errorEl = document.getElementById("error-message");
  const loadingEl = document.getElementById("loading");
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
  loadingEl.classList.add("hidden");
}


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("alert-form");
  const stateInput = document.getElementById("state");
  const loadingEl = document.getElementById("loading");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    
    document.getElementById("alerts").innerHTML = "";
    document.getElementById("summary").textContent = "";
    document.getElementById("error-message").textContent = "";
    document.getElementById("error-message").classList.add("hidden");

    const state = stateInput.value.trim().toUpperCase();

    
    if (!/^[A-Z]{2}$/.test(state)) {
      showError("Please enter a valid 2-letter state abbreviation (e.g., CA, TX).");
      return;
    }

    
    loadingEl.classList.remove("hidden");

    
    fetchWeatherAlerts(state);

    
    stateInput.value = "";
  });
});