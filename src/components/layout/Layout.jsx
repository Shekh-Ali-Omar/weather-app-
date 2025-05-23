import React from 'react';
import Header from './Header';
import { useWeather } from '../../context/WeatherContext';
import { getWeatherBackground } from '../../api/weatherApi';

// استيراد الأيقونات من react-icons
import { FaLinkedin, FaInstagram, FaGithub, FaWhatsapp } from 'react-icons/fa';

const Layout = ({ children }) => {
  const { currentWeather } = useWeather();
  
  // اختيار خلفية الطقس
  const bgClass = currentWeather 
    ? getWeatherBackground(currentWeather.weather[0].id) 
    : 'bg-gradient-to-br from-blue-400 to-blue-600';

  return (
    <div className={`min-h-screen transition-colors duration-500 ease-in-out ${bgClass}`}>
      <div className="container mx-auto px-4 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-6">
          {children}
        </main>
        <footer className="py-4 text-center text-sm text-white/80 flex flex-col items-center gap-2">
          <div className="flex gap-6 text-xl">
            {/* روابط الأيقونات */}
            <a href="https://www.linkedin.com/in/omar-shekh-ali-71b34831b/?originalSubdomain=dz" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="hover:text-blue-600 transition-colors" />
            </a>
            <a href="https://www.instagram.com/accounts/login/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="hover:text-pink-500 transition-colors" />
            </a>
            <a href="https://github.com/Shekh-Ali-Omar" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://wa.me/00213552447253" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp className="hover:text-green-500 transition-colors" />
            </a>
          </div>
          <div>
            Omar Shekh Ali &copy; {new Date().getFullYear()} | Powered by OpenWeatherMap API
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
