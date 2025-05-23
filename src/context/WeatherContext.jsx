
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchCurrentWeather, fetchForecast } from '../api/weatherApi';
import { useToast } from "@/hooks/use-toast.js";

// Create the context
const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearchedCity, setLastSearchedCity] = useState(null);
  const { toast } = useToast();

  // Load saved city from localStorage on initial render
  useEffect(() => {
    const savedCity = localStorage.getItem('lastSearchedCity');
    if (savedCity) {
      setLastSearchedCity(savedCity);
      searchWeather(savedCity);
    }
  }, []);

  const searchWeather = async (cityName) => {
    if (!cityName || cityName.trim() === '') {
      toast({
        title: "City name required",
        description: "Please enter a city name to search for weather.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch both current weather and forecast in parallel
      const [weatherData, forecastData] = await Promise.all([
        fetchCurrentWeather(cityName),
        fetchForecast(cityName)
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setCity(cityName);
      
      // Save to localStorage
      localStorage.setItem('lastSearchedCity', cityName);
      setLastSearchedCity(cityName);
      
      toast({
        title: "Weather updated",
        description: `Showing weather for ${weatherData.name}, ${weatherData.sys.country}`,
      });
    } catch (err) {
      setError('City not found or network error. Please try again.');
      toast({
        title: "Error",
        description: "City not found or network error. Please try again.",
        variant: "destructive",
      });
      console.error("Error fetching weather data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear all weather data
  const clearWeather = () => {
    setCurrentWeather(null);
    setForecast(null);
    setCity('');
    localStorage.removeItem('lastSearchedCity');
    setLastSearchedCity(null);
  };

  // Value object to provide through the context
  const value = {
    city,
    currentWeather,
    forecast,
    isLoading,
    error,
    searchWeather,
    clearWeather,
    lastSearchedCity,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

// Custom hook to use the weather context
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
