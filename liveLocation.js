import { variable } from "./variables.js";

variable.display.style.display = 'none';

// Function to get live location data based on latitude and longitude
async function getLiveLocation(lat, long) {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=930971becfa941f882053344220412&q=${lat},${long}&aqi=yes`);
  const data = await response.json();
  return data;
}

// Function to get weather information based on city name
async function getName(cityName) {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=930971becfa941f882053344220412&q=${cityName}&aqi=yes`);
  const data = await response.json();

  // Update the displayed information
  variable.city.textContent = `${data.location.name}, ${data.location.region}`;
  variable.temp.textContent = `${Math.floor(data.current.feelslike_c)}°C`;
  variable.humidity.textContent = `${data.current.humidity}%`;
  variable.wind.textContent = `${data.current.wind_mph} km/h`;

  if (data.current.condition.text) {
    variable.weatherIcon.src = data.current.condition.icon;
  }

  variable.display.style.display = 'block';
}

// Function to get weather data based on current geolocation
async function getLocation(position) {
  const { latitude, longitude } = position.coords;
  const conseq = await getLiveLocation(latitude, longitude);

  // Update the displayed information
  variable.city.textContent = `${conseq.location.name}, ${conseq.location.region}`;
  variable.temp.textContent = `${Math.floor(conseq.current.feelslike_c)}°C`;
  variable.humidity.textContent = `${conseq.current.humidity}%`;
  variable.wind.textContent = `${conseq.current.wind_mph} km/h`;

  if (conseq.current.condition.text) {
    variable.weatherIcon.src = conseq.current.condition.icon;
  }

  variable.display.style.display = 'block';
}

// Event listener for getting the current location weather
variable.CurrentLocation.addEventListener('click', async () => {
  navigator.geolocation.getCurrentPosition(getLocation);
});

// Event listener for getting weather information based on the city entered
variable.btn.addEventListener('click', () => {
  getName(variable.p.value);
  variable.p.value = ''; // Clear the input field
});
