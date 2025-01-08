import { variable } from "./variables.js";
const{city,temp,humidity,wind,display,weatherIcon,currentLocation,button,searchBox}=variable;
display.style.display = 'none';

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
  city.textContent = `${data.location.name}, ${data.location.region}`;
  temp.textContent = `${Math.floor(data.current.feelslike_c)}°C`;
  humidity.textContent = `${data.current.humidity}%`;
  wind.textContent = `${data.current.wind_mph} km/h`;

  if (data.current.condition.text) {
    weatherIcon.src = data.current.condition.icon;
  }

  display.style.display = 'block';
}

// Function to get weather data based on current geolocation
async function getLocation(position) {
  const { latitude, longitude } = position.coords;
  const conseq = await getLiveLocation(latitude, longitude);

  // Update the displayed information
  city.textContent = `${conseq.location.name}, ${conseq.location.region}`;
  temp.textContent = `${Math.floor(conseq.current.feelslike_c)}°C`;
  humidity.textContent = `${conseq.current.humidity}%`;
  wind.textContent = `${conseq.current.wind_mph} km/h`;

  if (conseq.current.condition.text) {
    weatherIcon.src = conseq.current.condition.icon;
  }

  display.style.display = 'block';
}

// Event listener for getting the current location weather
currentLocation.addEventListener('click', async () => {
  navigator.geolocation.getCurrentPosition(getLocation);
});

// Event listener for getting weather information based on the city entered
button.addEventListener('click', () => {
  getName(searchBox.value);
  searchBox.value = ''; // Clear the input field
});
