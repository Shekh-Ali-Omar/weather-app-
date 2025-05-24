import React, { useState, useEffect, useRef } from 'react';
import { useWeather } from '../../context/WeatherContext';
import { Search, MapPin, X } from 'lucide-react';
import { fetchCitySuggestions } from '../../api/weatherApi';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const { searchWeather, isLoading } = useWeather();
  const formRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const delay = setTimeout(async () => {
        const results = await fetchCitySuggestions(searchTerm);
        setSuggestions(results);
        setHighlightedIndex(-1); // Reset highlight on new suggestions
      }, 300);
      return () => clearTimeout(delay);
    } else {
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setSuggestions([]);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    searchWeather(searchTerm);
    if (!recentSearches.includes(searchTerm)) {
      setRecentSearches([searchTerm, ...recentSearches.slice(0, 4)]);
    }
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  const handleSuggestionClick = (cityObj) => {
    const fullName = `${cityObj.name}${cityObj.state ? ', ' + cityObj.state : ''}, ${cityObj.country}`;
    setSearchTerm(fullName);
    searchWeather(fullName);
    if (!recentSearches.includes(fullName)) {
      setRecentSearches([fullName, ...recentSearches.slice(0, 4)]);
    }
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  const handleRecentSearch = (city) => {
    setSearchTerm(city);
    searchWeather(city);
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        e.preventDefault();
        handleSuggestionClick(suggestions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      <form ref={formRef} onSubmit={handleSubmit} className="relative mb-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter city name..."
          onKeyDown={handleKeyDown}
          className="w-full py-3 px-4 pl-12 rounded-lg border border-white/30 
                     bg-white/20 backdrop-blur-sm text-white placeholder-white/70
                     focus:outline-none focus:ring-2 focus:ring-white/50"
          autoComplete="off"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 h-5 w-5" />
        <button
          type="submit"
          disabled={isLoading || !searchTerm.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/40 text-white 
                     font-medium py-1.5 px-4 rounded-md transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute z-50 mt-2 w-full bg-white/90 text-black rounded-md shadow-md max-h-60 overflow-y-auto">
            {suggestions.map((s, idx) => (
              <li
                key={idx}
                onMouseDown={() => handleSuggestionClick(s)}
                className={`cursor-pointer px-4 py-2 hover:bg-gray-200 transition-colors text-sm ${
                  idx === highlightedIndex ? 'bg-gray-300' : ''
                }`}
              >
                {s.name}
                {s.state ? `, ${s.state}` : ''}, {s.country}
              </li>
            ))}
          </ul>
        )}
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
