const axios = require('axios');
require('dotenv').config();

const OWM_API_KEY = process.env.OWM_API_KEY;
console.log('OWM_API_KEY:', OWM_API_KEY);
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function getCurrentWeather(city) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: OWM_API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { getCurrentWeather };
