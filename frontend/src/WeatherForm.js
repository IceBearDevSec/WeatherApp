import React, { useState } from 'react';
import axios from 'axios';

function WeatherForm() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setWeather(null);
    try {
  const response = await axios.get('http://localhost:5001/api/weather', {
        params: { city }
      });
      setWeather(response.data);
    } catch (err) {
      setError('Could not fetch weather.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter city name"
          required
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherForm;
