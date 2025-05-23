
import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import { CloudSun, CloudRain, CloudSnow, CloudLightning, Sun, Cloudy, Wind, Droplets, ArrowUp, ArrowDown } from 'lucide-react';
import { getWeatherIcon } from '../../api/weatherApi';

const ForecastDay = ({ data, showCelsius }) => {
  // Get date from timestamp
  const date = new Date(data.dt * 1000);
  
  // Format date as day of week
  const day = date.toLocaleDateString('en-US', { weekday: 'short' });
  
  // Get date as numeric day
  const dayNum = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  
  // Get weather icon
  const weatherIconName = getWeatherIcon(data.weather[0].id);
  
  // Convert temperatures if needed
  const temp = showCelsius ? Math.round(data.main.temp) : Math.round((data.main.temp * 9/5) + 32);
  const tempUnit = showCelsius ? '°C' : '°F';
  
  // Get min and max temperatures
  const minTemp = showCelsius ? Math.round(data.main.temp_min) : Math.round((data.main.temp_min * 9/5) + 32);
  const maxTemp = showCelsius ? Math.round(data.main.temp_max) : Math.round((data.main.temp_max * 9/5) + 32);
  
  // Render the appropriate weather icon
  const renderWeatherIcon = () => {
    switch (weatherIconName) {
      case 'cloud-rain':
        return <CloudRain className="h-10 w-10 text-white" />;
      case 'cloud-snow':
        return <CloudSnow className="h-10 w-10 text-white" />;
      case 'cloud-lightning':
        return <CloudLightning className="h-10 w-10 text-white" />;
      case 'sun':
        return <Sun className="h-10 w-10 text-white" />;
      case 'cloudy':
      case 'cloud':
        return <Cloudy className="h-10 w-10 text-white" />;
      case 'cloud-sun':
        return <CloudSun className="h-10 w-10 text-white" />;
      default:
        return <CloudSun className="h-10 w-10 text-white" />;
    }
  };
  
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 text-center flex flex-col items-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
      <div className="flex flex-col mb-2">
        <p className="text-white font-semibold text-lg">{day}</p>
        <p className="text-white/70 text-sm">{month} {dayNum}</p>
      </div>
      
      <div className="my-3 bg-white/10 rounded-full p-3">
        {renderWeatherIcon()}
      </div>
      
      <div className="flex flex-col items-center">
        <p className="text-white font-semibold text-2xl">{temp}{tempUnit}</p>
        <p className="text-white/70 text-sm capitalize">{data.weather[0].description}</p>
        
        <div className="flex justify-between w-full mt-3 px-2">
          <div className="flex items-center">
            <ArrowDown className="h-4 w-4 text-blue-300 mr-1" />
            <span className="text-blue-300 text-sm">{minTemp}{tempUnit}</span>
          </div>
          <div className="flex items-center">
            <ArrowUp className="h-4 w-4 text-red-300 mr-1" />
            <span className="text-red-300 text-sm">{maxTemp}{tempUnit}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 w-full mt-3">
          <div className="flex items-center justify-center bg-white/5 rounded p-1">
            <Droplets className="h-3 w-3 text-white/70 mr-1" />
            <span className="text-white/70 text-xs">{data.main.humidity}%</span>
          </div>
          <div className="flex items-center justify-center bg-white/5 rounded p-1">
            <Wind className="h-3 w-3 text-white/70 mr-1" />
            <span className="text-white/70 text-xs">{data.wind.speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Forecast = ({ showCelsius = true }) => {
  const { forecast, isLoading, error } = useWeather();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-10 animate-pulse-slow">
        <CloudSun className="h-20 w-20 text-white animate-spin-slow" />
        <p className="text-white text-lg mt-4">Loading forecast data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 text-center max-w-md mx-auto">
        <p className="text-white font-medium mb-4">{error}</p>
        <p className="text-white/70 text-sm">Try searching for another city</p>
      </div>
    );
  }

  if (!forecast) {
    return (
      <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 text-center max-w-md mx-auto">
        <h2 className="text-white text-2xl font-bold mb-4">5-Day Forecast</h2>
        <p className="text-white/80 mb-6">
          Search for a city to see weather forecast for the next 5 days.
        </p>
        <div className="flex justify-center">
          <div className="flex flex-col items-center max-w-xs">
            <CloudSun className="h-20 w-20 text-white/50 mb-6" />
            <p className="text-white/70 text-sm">Get accurate weather predictions for any location worldwide. Simply enter a city name in the search bar above and plan ahead with confidence.</p>
          </div>
        </div>
      </div>
    );
  }

  // Get daily forecast (one forecast per day) by filtering the timestamps at noon (closest to 12:00)
  const dailyData = forecast.list.filter((item, index, array) => {
    const date = new Date(item.dt * 1000);
    const hour = date.getHours();
    
    // Try to get forecasts around noon (12:00) or the closest hour to noon
    return hour >= 11 && hour <= 14;
  });

  // Take only the first 5 days
  const fiveDayForecast = dailyData.slice(0, 5);

  return (
    <div className="animate-fade-in">
      <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {fiveDayForecast.map((day, index) => (
            <ForecastDay key={index} data={day} showCelsius={showCelsius} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forecast;
