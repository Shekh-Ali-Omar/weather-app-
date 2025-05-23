
# Weather App

A professional weather application built with React that provides current weather conditions and a 5-day forecast.

## Features

- Elegant responsive design that works on mobile and desktop
- Current weather information including:
  - City name
  - Temperature
  - Weather condition with appropriate icon
  - Humidity, wind speed, and atmospheric pressure
- 5-day weather forecast
- Search functionality for any city
- Weather-based dynamic backgrounds
- Loading indicators and error handling

## Technology Stack

- React (with Hooks)
- React Router for navigation
- Tailwind CSS for styling
- OpenWeatherMap API for weather data
- Context API for state management

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone this repository
```
git clone <repository-url>
```

2. Navigate to the project directory
```
cd weather-app
```

3. Install dependencies
```
npm install
```

4. Start the development server
```
npm run dev
```

5. Open your browser and navigate to `http://localhost:8080`

## API Key Setup

The application uses OpenWeatherMap API for weather data. A demo API key is included for convenience, but it's recommended to use your own API key for production use.

To use your own API key:

1. Sign up for an account at [OpenWeatherMap](https://openweathermap.org/api)
2. Generate an API key in your account dashboard
3. Replace the `API_KEY` value in `src/api/weatherApi.js` with your own key:

```javascript
const API_KEY = 'your-api-key-here';
```

## Project Structure

- `/src/api` - API service for fetching weather data
- `/src/components` - Reusable UI components
- `/src/context` - React Context for state management
- `/src/pages` - Page components for routing

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/api)
- Icons from [Lucide React](https://lucide.dev)
