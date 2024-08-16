// src/services/calendarificService.js
const axios = require('axios');
const NodeCache = require('node-cache');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const API_KEY = process.env.CALENDARIFIC_API_KEY;
const url = process.env.BASE_URL;
const cache = new NodeCache({ stdTTL: process.env.TTL }); // Cache TTL of 1 day

const fetchHolidays = async (country, year) => {
  const cacheKey = `${country}-${year}`;
  const cachedHolidays = cache.get(cacheKey);

  if (cachedHolidays) {
    return cachedHolidays;
  }

  try {
    const response = await axios.get(`${url}/holidays`, {
      params: {
        api_key: API_KEY,
        country,
        year,
      },
    });

    const holidays = response.data;
    cache.set(cacheKey, holidays);
    return holidays;
  } catch (error) {
    throw new Error('Failed to fetch holidays from Calendarific API.');
  }
};

const fetchCountries = async () => {
  const cacheKey = 'countries';
  const cachedCountries = cache.get(cacheKey);

  if (cachedCountries) {
    return cachedCountries;
  }

  try {
    const response = await axios.get(`${url}/countries`, {
      params: {
        api_key: API_KEY,
      },
    });

    const countries = response.data.response.countries;
    cache.set(cacheKey, countries);
    return countries;
  } catch (error) {
    throw new Error('Failed to fetch countries from Calendarific API.');
  }
};

module.exports = {
  fetchHolidays,
  fetchCountries,
};
