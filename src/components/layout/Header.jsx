
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CloudSun, Calendar, Home } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-sm bg-white/5 rounded-lg mb-6">
      <div className="flex items-center">
        <CloudSun className="h-8 w-8 mr-2 text-primary animate-pulse-slow" />
        <h1 className="text-2xl font-bold">Weather App</h1>
      </div>
      
      <nav className="flex items-center space-x-1">
        <Link 
          to="/" 
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            location.pathname === '/' 
              ? 'bg-white/20 text-white font-semibold' 
              : 'text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Home className="h-4 w-4" />
          <span>Current</span>
        </Link>
        <Link 
          to="/forecast" 
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            location.pathname === '/forecast' 
              ? 'bg-white/20 text-white font-semibold' 
              : 'text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Calendar className="h-4 w-4" />
          <span>Forecast</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
