
// OpenWeatherMap API service

const API_KEY = 'c27e9d7110f1c08371ffdf21108c7392'; // User's personal API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetches current weather data for a city
 * @param {string} city - City name to get weather for
 * @returns {Promise} - Weather data
 */
export const fetchCurrentWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('City not found or API error');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

/**
 * Fetches 5-day forecast data for a city
 * @param {string} city - City name to get forecast for
 * @returns {Promise} - Forecast data
 */
export const fetchForecast = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('City not found or API error');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

/**
 * Gets the appropriate weather icon based on the weather condition
 * @param {string} weatherCode - Weather condition code from API
 * @param {boolean} isDay - Whether it's daytime or nighttime
 * @returns {string} - Icon name for Lucide icons
 */
export const getWeatherIcon = (weatherCode, isDay = true) => {
  // Weather condition code ranges as per OpenWeatherMap API
  // https://openweathermap.org/weather-conditions
  
  // Thunderstorm: 200-299
  if (weatherCode >= 200 && weatherCode < 300) {
    return 'cloud-lightning';
  }
  
  // Drizzle and Rain: 300-599
  if (weatherCode >= 300 && weatherCode < 600) {
    return 'cloud-rain';
  }
  
  // Snow: 600-699
  if (weatherCode >= 600 && weatherCode < 700) {
    return 'cloud-snow';
  }
  
  // Atmosphere (fog, mist, etc): 700-799
  if (weatherCode >= 700 && weatherCode < 800) {
    return 'cloudy';
  }
  
  // Clear: 800
  if (weatherCode === 800) {
    return isDay ? 'sun' : 'moon';
  }
  
  // Clouds: 801-899
  if (weatherCode > 800) {
    return isDay ? 'cloud-sun' : 'cloud';
  }
  
  // Default
  return 'cloud';
};

/**
 * Gets background gradient class based on weather condition
 * @param {string} weatherCode - Weather condition code from API
 * @returns {string} - Tailwind class for background
 */
export const getWeatherBackground = (weatherCode) => {
  // Thunderstorm: 200-299
  if (weatherCode >= 200 && weatherCode < 300) {
    return 'bg-stormy-gradient';
  }
  
  // Drizzle and Rain: 300-599
  if (weatherCode >= 300 && weatherCode < 600) {
    return 'bg-rainy-gradient';
  }
  
  // Snow: 600-699
  if (weatherCode >= 600 && weatherCode < 700) {
    return 'bg-snowy-gradient';
  }
  
  // Atmosphere (fog, mist, etc): 700-799
  if (weatherCode >= 700 && weatherCode < 800) {
    return 'bg-cloudy-gradient';
  }
  
  // Clear: 800
  if (weatherCode === 800) {
    return 'bg-sunny-gradient';
  }
  
  // Clouds: 801-899
  if (weatherCode > 800) {
    return 'bg-cloudy-gradient';
  }
  
  // Default
  return 'bg-sunny-gradient';
};
