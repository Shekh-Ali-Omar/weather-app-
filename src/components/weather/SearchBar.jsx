
import React, { useState, useEffect } from 'react';
import { useWeather } from '../../context/WeatherContext';
import { Search, MapPin, X } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const { searchWeather, isLoading } = useWeather();

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save recent searches to localStorage when they change
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchWeather(searchTerm);
      
      // Add to recent searches if not already present
      if (!recentSearches.includes(searchTerm)) {
        const updatedSearches = [searchTerm, ...recentSearches.slice(0, 4)];
        setRecentSearches(updatedSearches);
      }
    }
  };

  const handleRecentSearch = (city) => {
    searchWeather(city);
    setSearchTerm(city);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative flex items-center mb-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter city name..."
          className="w-full py-3 px-4 pl-12 rounded-lg border border-white/30 
                    bg-white/20 backdrop-blur-sm text-white placeholder-white/70
                    focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <Search className="absolute left-4 text-white/70 h-5 w-5" />
        <button
          type="submit"
          disabled={isLoading || !searchTerm.trim()}
          className="absolute right-2 bg-white/30 hover:bg-white/40 text-white 
                    font-medium py-1.5 px-4 rounded-md transition-colors
                    disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {recentSearches.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="text-xs text-white/70">Recent:</span>
          
          {recentSearches.map((city, index) => (
            <button
              key={index}
              onClick={() => handleRecentSearch(city)}
              className="bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1 py-1 px-2 rounded-md transition-colors"
            >
              <MapPin className="h-3 w-3" />
              {city}
            </button>
          ))}
          
          <button
            onClick={clearRecentSearches}
            className="ml-auto text-white/50 hover:text-white/80 text-xs flex items-center transition-colors"
          >
            <X className="h-3 w-3 mr-1" />
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
