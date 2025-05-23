
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import SearchBar from '../components/weather/SearchBar';
import CurrentWeather from '../components/weather/CurrentWeather';
import { useWeather } from '../context/WeatherContext';
import { Switch } from '../components/ui/switch';

const CurrentPage = () => {
  const [showCelsius, setShowCelsius] = useState(true);
  const { currentWeather } = useWeather();

  return (
    <Layout>
      <div className="container mx-auto px-4 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center text-white drop-shadow-md mb-2">
            Current Weather Conditions
          </h1>
          <p className="text-center text-white/80 max-w-2xl mx-auto">
            Get real-time weather updates for any location worldwide.
          </p>
        </div>
        
        <SearchBar />
        
        {currentWeather && (
          <div className="mb-6 flex justify-end">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-3">
              <span className="text-white font-medium">°C</span>
              <Switch
                checked={!showCelsius}
                onCheckedChange={() => setShowCelsius(!showCelsius)}
              />
              <span className="text-white font-medium">°F</span>
            </div>
          </div>
        )}
        
        <CurrentWeather showCelsius={showCelsius} />
      </div>
    </Layout>
  );
};

export default CurrentPage;
