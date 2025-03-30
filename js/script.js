const imgContainer = document.querySelector('.weather-icon');
const search = document.querySelector('#btn');
const inputCity = document.querySelector('#inputField');
const tempContainer = document.querySelector('#temp');
const cityContainer = document.querySelector('#city');

// Background color change
let colors = ["#5a708f", "#3c4e6e", "#a3c1d9", "#65718d", "#4e5c76",'#212121',"#515151"];
let canvas = document.querySelector('.canvas');
canvas.style.transition = 'background-color 2s ease-in-out';


inputCity.addEventListener('focus', function() {
    inputField.setAttribute('placeholder', '');
});

inputField.addEventListener('blur', function() {
    if (!inputField.value) {
        inputField.setAttribute('placeholder', 'Enter city name');
    }
});

setInterval(() => {
    let color = colors[Math.floor(Math.random() * colors.length)];
    canvas.style.backgroundColor = color; 
}, 2000);

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://weather-app-backend-qkv7.onrender.com/weather?city=${city}`);
        const data = await response.json();

        let temp = data.main.temp;
        let humidity = data.main.humidity;
        let wind = (data.wind.speed * 3.6).toFixed(1);

        document.querySelector("#h").innerText = `${humidity}%`;
        document.querySelector("#w").innerText = `${wind} km/h`;

        const iconCode = data.weather[0].icon;
        document.querySelector(".weather-icon img").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        tempContainer.querySelector('h1').innerText = `${temp}°C`;
        cityContainer.querySelector('h1').innerText = city;
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert("Failed to fetch weather. Please try again.");
    }
}

fetchWeather("New York");

inputCity.addEventListener("keydown", async function(event) {
    if(event.key==='Enter'){
        let cityName = inputCity.value.trim();
        if (cityName === "") {
            alert("Please enter a city name!");
            return;
        }
        await fetchWeather(cityName);
    }
    
});

search.addEventListener("click", async function() {
    let cityName = inputCity.value.trim();
    if (cityName === "") {
        alert("Please enter a city name!");
        return;
    }
    await fetchWeather(cityName);
});
