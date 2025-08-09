const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


const { getCurrentWeather } = require('./weather');

app.get('/', (req, res) => {
  res.send('WeatherApp backend is running');
});

// Endpoint to get current weather by city
app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  console.log('Received request for city:', city);
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }
  try {
    const weather = await getCurrentWeather(city);
    res.json(weather);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
