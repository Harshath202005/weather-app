// API Configuration
const apiKey = "6982a03a27684d00f63eb061f4cd8bf0";

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

// Event Listeners
searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

// Initialize with default city
fetchWeather("New York");

// Functions
function searchWeather() {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
}

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        alert(error.message);
        console.error("Error fetching weather data:", error);
    }
}

function updateWeatherUI(data) {
    // Update location
    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    
    // Update current weather
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('condition').textContent = data.weather[0].description;
    
    // Update weather details
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `${data.wind.speed}m/s`;
    document.getElementById('clouds').textContent = `${data.clouds.all}%`;
    document.getElementById('pressure').textContent = `${data.main.pressure}hpa`;
    
    // Update date and time
    updateDateTime();
    
    // Clear search input
    cityInput.value = '';
}

function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
    };
    document.getElementById('datetime').textContent = now.toLocaleDateString('en-US', options);
}