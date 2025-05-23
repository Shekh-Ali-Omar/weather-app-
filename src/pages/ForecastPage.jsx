
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import SearchBar from '../components/weather/SearchBar';
import Forecast from '../components/weather/Forecast';
import { useWeather } from '../context/WeatherContext';
import { Calendar, Map, Thermometer } from 'lucide-react';
import { Switch } from '../components/ui/switch';

const ForecastPage = () => {
  const [showCelsius, setShowCelsius] = useState(true);
  const { forecast } = useWeather();

  const toggleUnit = () => setShowCelsius(!showCelsius);

  return (
    <Layout>
      <div className="container mx-auto px-4 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center text-white drop-shadow-md mb-2">
            5-Day Weather Forecast
          </h1>
          <p className="text-center text-white/80 max-w-2xl mx-auto">
            Get detailed weather forecasts for the next 5 days, helping you plan ahead with confidence.
          </p>
        </div>
        
        <SearchBar />
        
        {forecast && (
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-white" />
              <span className="text-white font-medium">5-Day Forecast</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Map className="h-5 w-5 text-white" />
              <span className="text-white font-medium">{forecast.city.name}, {forecast.city.country}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-white font-medium">°C</span>
              <Switch
                checked={!showCelsius}
                onCheckedChange={toggleUnit}
              />
              <span className="text-white font-medium">°F</span>
              <Thermometer className="h-5 w-5 text-white ml-1" />
            </div>
          </div>
        )}
        
        <Forecast showCelsius={showCelsius} />
      </div>
    </Layout>
  );
};

export default ForecastPage;
