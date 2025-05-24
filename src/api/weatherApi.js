// weatherApi.js

const API_KEY = 'c27e9d7110f1c08371ffdf21108c7392';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetch current weather data
 * @param {string} city - City name
 * @returns {Promise}
 */
export const fetchCurrentWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) throw new Error('City not found or API error');
    return await response.json();
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

/**
 * Fetch 5-day weather forecast
 * @param {string} city - City name
 * @returns {Promise}
 */
export const fetchForecast = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) throw new Error('City not found or API error');
    return await response.json();
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

/**
 * Fetch city suggestions using OpenWeather Geocoding API
 * @param {string} query - Partial city name
 * @returns {Promise<Array>}
 */
export const fetchCitySuggestions = async (query) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );

    if (!response.ok) throw new Error('Error fetching suggestions');
    return await response.json();
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    return [];
  }
};

/**
 * Get appropriate weather icon
 * @param {number} weatherCode
 * @param {boolean} isDay
 * @returns {string}
 */
export const getWeatherIcon = (weatherCode, isDay = true) => {
  if (weatherCode >= 200 && weatherCode < 300) return 'cloud-lightning';
  if (weatherCode >= 300 && weatherCode < 600) return 'cloud-rain';
  if (weatherCode >= 600 && weatherCode < 700) return 'cloud-snow';
  if (weatherCode >= 700 && weatherCode < 800) return 'cloudy';
  if (weatherCode === 800) return isDay ? 'sun' : 'moon';
  if (weatherCode > 800) return isDay ? 'cloud-sun' : 'cloud';
  return 'cloud';
};

/**
 * Get background gradient class based on weather code
 * @param {number} weatherCode
 * @returns {string}
 */
export const getWeatherBackground = (weatherCode) => {
  if (weatherCode >= 200 && weatherCode < 300) return 'bg-stormy-gradient';
  if (weatherCode >= 300 && weatherCode < 600) return 'bg-rainy-gradient';
  if (weatherCode >= 600 && weatherCode < 700) return 'bg-snowy-gradient';
  if (weatherCode >= 700 && weatherCode < 800) return 'bg-cloudy-gradient';
  if (weatherCode === 800) return 'bg-sunny-gradient';
  if (weatherCode > 800) return 'bg-cloudy-gradient';
  return 'bg-sunny-gradient';
};
