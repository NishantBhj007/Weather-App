let p = document.querySelector('.search input');
let btn = document.querySelector('button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(place) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${place}&appid=9a090cd868cf4d2054f2b725b14b2cf2`);

  if (res.status == 404) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
  } else {
    const data = await res.json();
    console.log(data);

    let temp = document.querySelector('.temp').textContent = `${Math.floor(data.main.temp)}°C`;
    let city = document.querySelector('.city').textContent = data.name;
    let humidity = document.querySelector('.humidity').textContent = `${data.main.humidity}%`;
    let wind = document.querySelector('.wind').textContent = `${data.wind.speed} km/h`;

    // Set weather icon based on the weather condition
    if (data.weather[0].main == 'Clear') {
      weatherIcon.src = 'images/sun.png';
    } else if (data.weather[0].main == 'Mist') {
      weatherIcon.src = 'images/mist.png';
    } else if (data.weather[0].main == 'Clouds') {
      weatherIcon.src = 'images/cloudy.png';
    } else if (data.weather[0].main == 'Rain') {
      weatherIcon.src = 'images/rainy-day.png';
    } else if (data.weather[0].main == 'Drizzle') {
      weatherIcon.src = 'images/drizzle.png';
    }

    // Display the weather info
    document.querySelector('.weather').style.display = 'block';
  }
}

btn.addEventListener('click', () => {
  console.log(p.value);
  checkWeather(p.value);
  p.value = '';
});











