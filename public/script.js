let submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', getData);

function getData() {
    let city = document.querySelector('.city-search').value;
    getWeather(city);
}

function getWeather(city) {
    city = city;
    const data = JSON.stringify({ "place": city });
    fetch('http://localhost:5500/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        body: data
    })
    .then(res => res.json())
    .then(data => setWeather(data, city))
    .catch(err => console.log(err));
}

const weather_icons = {
    sunny: "./images/sun-solid.svg",
    clear: "./images/sun-solid.svg",
    cloudy: "./images/cloud-sun-solid.svg",
    haze: "./images/smog-solid.svg",
    rainy: "./images/cloud-rain-solid.svg",
    rain: "./images/cloud-rain-solid.svg",
    windy: "./images/wind-solid.svg",
    wind: "./images/wind-solid.svg",
    default_icon: "./images/cloud-solid.svg"
};

const iconElement = document.querySelector('#icon');
const locationElement = document.querySelector('#data-location');
const statusElement = document.querySelector('#data-status');
const temperatureElement = document.querySelector('#data-temperature');
const precipitationElement = document.querySelector('#data-precipitation');
const windElement = document.querySelector('#data-wind');

function setWeather(data, city) {
    statusElement.textContent = data.weather_descriptions[0];
    const weather_lowercase = data.weather_descriptions[0].toLowerCase();
    if (weather_lowercase in weather_icons) {
        iconElement.src = weather_icons[weather_lowercase];
    } else {
        iconElement.src = weather_icons.default_icon;
    };
    locationElement.textContent = city;
    temperatureElement.textContent = `${data.temperature} C`;
    precipitationElement.textContent = `${data.precip} mm`;
    windElement.textContent = `${data.wind_speed} km/h`;
}