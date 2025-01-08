import { variable } from "./variables.js";
const { city, temp, humidity, wind, display, weatherIcon, currentLocation, button, searchBox } = variable;

display.style.display = 'none';

// Helper function to update the UI with weather data
function updateWeatherUI(data) {
  city.textContent = `${data.location.name}, ${data.location.region}`;
  temp.textContent = `${Math.floor(data.current.feelslike_c)}°C`;
  humidity.textContent = `${data.current.humidity}%`;
  wind.textContent = `${data.current.wind_mph} km/h`;

  if (data.current.condition.text) {
    weatherIcon.src = data.current.condition.icon;
  }

  display.style.display = 'block';
}

// Function to fetch weather data based on a location (latitude and longitude or city name)
async function fetchWeatherData(query) {
  const url = `https://api.weatherapi.com/v1/current.json?key=930971becfa941f882053344220412&q=${query}&aqi=yes`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Function to get live weather data based on latitude and longitude
async function getLiveLocation(lat, long) {
  const data = await fetchWeatherData(`${lat},${long}`);
  updateWeatherUI(data);
}

// Function to get weather data based on city name
async function getCityWeather(cityName) {
  const data = await fetchWeatherData(cityName);
  updateWeatherUI(data);
}

// Event listener for getting weather based on the current geolocation
currentLocation.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(
    (position) => getLiveLocation(position.coords.latitude, position.coords.longitude),
    (error) => console.error('Geolocation error:', error)
  );
});

// Event listener for getting weather based on the city entered
button.addEventListener('click', () => {
  getCityWeather(searchBox.value);
  searchBox.value = ''; // Clear the input field after the search
});
