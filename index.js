// index.js
//const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// Fetch weather data based on city input
// Fetch weather data based on city input
async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Weather Data:", data); // for testing
    displayWeather(data);
  } catch (errorObject) {
    displayError(errorObject.message);
  }
}

// Display weather details in the DOM
function displayWeather(data) {
  const weatherEl = document.getElementById("weather-display");
  const errorEl = document.getElementById("error-message");
  const loadingEl = document.getElementById("loading-spinner");

  // Clear previous content
  weatherEl.innerHTML = "";
  errorEl.textContent = "";
  errorEl.classList.add("hidden");
  loadingEl.classList.add("hidden");

  if (!data || !data.main) {
    displayError("No weather data available.");
    return;
  }

  // Build weather details
  const temp = document.createElement("p");
  temp.textContent = `Temperature: ${data.main.temp} °C`;

  const humidity = document.createElement("p");
  humidity.textContent = `Humidity: ${data.main.humidity}%`;

  const description = document.createElement("p");
  description.textContent = `Conditions: ${data.weather[0].description}`;

  weatherEl.appendChild(temp);
  weatherEl.appendChild(humidity);
  weatherEl.appendChild(description);
}

// Display error messages
function displayError(message) {
  const errorEl = document.getElementById("error-message");
  const loadingEl = document.getElementById("loading-spinner");
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
  loadingEl.classList.add("hidden");
}

// Generate a random valid color
function changeBackgroundColor() {
  const randomColor = `rgb(${Math.floor(Math.random() * 256)}, 
                           ${Math.floor(Math.random() * 256)}, 
                           ${Math.floor(Math.random() * 256)})`;
  document.body.style.backgroundColor = randomColor;
}

// Reset background color
function resetBackgroundColor() {
  document.body.style.backgroundColor = "";
}

// Display key press directly
function displayKeyPress(key) {
  const keyDisplay = document.getElementById("key-display");
  keyDisplay.textContent = `Key pressed: ${key}`;
}

// Display user input directly
function displayUserInput(value) {
  const inputDisplay = document.getElementById("input-display");
  inputDisplay.textContent = `Input: ${value}`;
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("weather-form");
  const cityInput = document.getElementById("city-input");
  const loadingEl = document.getElementById("loading-spinner");
  const colorBtn = document.getElementById("color-btn");
  const inputField = document.getElementById("user-input");

  // Weather form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = cityInput.value.trim();
    if (!city) {
      displayError("Please enter a city name.");
      return;
    }

    // Show loading indicator
    loadingEl.classList.remove("hidden");

    // Fetch weather data
    fetchWeatherData(city);

    // Clear input field
    cityInput.value = "";
  });

  // Background color events
  colorBtn.addEventListener("click", changeBackgroundColor);
  colorBtn.addEventListener("dblclick", resetBackgroundColor);

  // Keydown event
  document.addEventListener("keydown", (e) => {
    displayKeyPress(e.key);
  });

  // Input event
  inputField.addEventListener("input", (e) => {
    displayUserInput(e.target.value);
  });
});