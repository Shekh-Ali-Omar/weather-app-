
import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import { CloudSun, CloudRain, CloudSnow, CloudLightning, Sun, Cloudy, Droplets, Wind, Gauge, Calendar, MapPin, Sunrise, Sunset, ThermometerSun } from 'lucide-react';
import { getWeatherIcon } from '../../api/weatherApi';

const WeatherInfoCard = ({ icon, title, value }) => (
  <div className="bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors p-4 rounded-lg flex flex-col items-center justify-center gap-2">
    {icon}
    <div className="text-center">
      <p className="text-white/80 text-xs">{title}</p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  </div>
);

const CurrentWeather = ({ showCelsius = true }) => {
  const { currentWeather, isLoading, error } = useWeather();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-10 animate-pulse-slow">
        <CloudSun className="h-20 w-20 text-white animate-spin-slow" />
        <p className="text-white text-lg mt-4">Loading weather data...</p>
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

  if (!currentWeather) {
    return (
      <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 text-center max-w-md mx-auto">
        <h2 className="text-white text-2xl font-bold mb-4">Welcome to the Weather App</h2>
        <p className="text-white/80 mb-6">
          Search for a city above to see current weather conditions.
        </p>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
            <div className="flex flex-col items-center">
              <MapPin className="h-12 w-12 text-white/50 mb-3" />
              <p className="text-white/70 text-sm">Search for any location worldwide</p>
            </div>
            <div className="flex flex-col items-center">
              <CloudSun className="h-12 w-12 text-white/50 mb-3" />
              <p className="text-white/70 text-sm">Get real-time weather updates</p>
            </div>
            <div className="flex flex-col items-center">
              <Calendar className="h-12 w-12 text-white/50 mb-3" />
              <p className="text-white/70 text-sm">View 5-day forecast predictions</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get icon based on weather condition
  const weatherIconName = getWeatherIcon(currentWeather.weather[0].id);
  
  // Convert temperature if needed
  const temp = showCelsius 
    ? Math.round(currentWeather.main.temp) 
    : Math.round((currentWeather.main.temp * 9/5) + 32);
  
  const tempUnit = showCelsius ? '°C' : '°F';
  
  // Get feels like temperature
  const feelsLike = showCelsius 
    ? Math.round(currentWeather.main.feels_like)
    : Math.round((currentWeather.main.feels_like * 9/5) + 32);

  // Format sunrise and sunset times
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const sunriseTime = formatTime(currentWeather.sys.sunrise);
  const sunsetTime = formatTime(currentWeather.sys.sunset);
  
  // Render the appropriate weather icon
  const renderWeatherIcon = () => {
    switch (weatherIconName) {
      case 'cloud-rain':
        return <CloudRain className="h-24 w-24 text-white" />;
      case 'cloud-snow':
        return <CloudSnow className="h-24 w-24 text-white" />;
      case 'cloud-lightning':
        return <CloudLightning className="h-24 w-24 text-white" />;
      case 'sun':
        return <Sun className="h-24 w-24 text-white" />;
      case 'cloudy':
      case 'cloud':
        return <Cloudy className="h-24 w-24 text-white" />;
      case 'cloud-sun':
        return <CloudSun className="h-24 w-24 text-white" />;
      default:
        return <CloudSun className="h-24 w-24 text-white" />;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-white/20 backdrop-blur-md rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                <MapPin className="h-5 w-5 text-white" />
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  {currentWeather.name}, {currentWeather.sys.country}
                </h2>
              </div>
              
              <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                <Calendar className="h-4 w-4 text-white/80" />
                <p className="text-white/80 text-lg">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              
              <div className="flex items-center justify-center md:justify-start">
                <div className="text-white text-6xl sm:text-7xl font-bold">
                  {temp}{tempUnit}
                </div>
                <div className="flex flex-col ml-4 items-start">
                  <p className="text-white text-xl capitalize">
                    {currentWeather.weather[0].description}
                  </p>
                  <p className="text-white/70 text-sm flex items-center">
                    <ThermometerSun className="h-4 w-4 mr-1" />
                    Feels like {feelsLike}{tempUnit}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center bg-white/10 p-6 rounded-lg">
              {renderWeatherIcon()}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <WeatherInfoCard
              icon={<Droplets className="h-6 w-6 text-blue-300" />}
              title="Humidity"
              value={`${currentWeather.main.humidity}%`}
            />
            
            <WeatherInfoCard
              icon={<Wind className="h-6 w-6 text-cyan-300" />}
              title="Wind Speed"
              value={`${currentWeather.wind.speed} m/s`}
            />
            
            <WeatherInfoCard
              icon={<Gauge className="h-6 w-6 text-green-300" />}
              title="Pressure"
              value={`${currentWeather.main.pressure} hPa`}
            />
            
            <WeatherInfoCard
              icon={<CloudSun className="h-6 w-6 text-yellow-300" />}
              title="Cloudiness"
              value={`${currentWeather.clouds.all}%`}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center justify-between flex-1">
              <div className="flex items-center">
                <Sunrise className="h-8 w-8 text-yellow-300 mr-3" />
                <div>
                  <p className="text-white/80 text-xs">Sunrise</p>
                  <p className="text-white font-semibold">{sunriseTime}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center justify-between flex-1">
              <div className="flex items-center">
                <Sunset className="h-8 w-8 text-orange-300 mr-3" />
                <div>
                  <p className="text-white/80 text-xs">Sunset</p>
                  <p className="text-white font-semibold">{sunsetTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
