import { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!location.trim()) return alert("Enter a location");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setHasSearched(true);

      if (data.cod === 200) {
        setWeatherData({
          country: data.sys.country,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          pressure: data.main.pressure,
          main: data.weather[0].main,
          description: data.weather[0].description,
          icon: data.weather[0].icon
        });
      } else {
        setWeatherData(null);
        alert("City not found");
      }
    } catch (err) {
      setWeatherData(null);
      setHasSearched(true);
      alert("Error fetching weather data");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="box">
        <h1>🌦️ WEATHER FORECAST</h1>

        {hasSearched && weatherData && (
          <div className="weather-summary">
            <p><strong>Condition:</strong> {weatherData.main}</p>
            <p><strong>Description:</strong> {weatherData.description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt={weatherData.description}
              className="weather-icon"
            />
          </div>
        )}




        <input
          type="text"
          className="location-input"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={handleSearch} className="search-btn">Search</button>

        <hr />

        <div className="details">
          <h3>Weather Details</h3>
          <p><strong>Country:</strong> {weatherData?.country || '-'}</p>
          <p><strong>Humidity:</strong> {weatherData?.humidity ? `${weatherData.humidity}%` : '-'}</p>
          <p><strong>Wind:</strong> {weatherData?.wind ? `${weatherData.wind} m/s` : '-'}</p>
          <p><strong>Pressure:</strong> {weatherData?.pressure ? `${weatherData.pressure} hPa` : '-'}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
