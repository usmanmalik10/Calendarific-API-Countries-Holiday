const calendarificService = require('../services/calendarificService');

const getCountries = async (req, res) => {
  try {
    const countries = await calendarificService.fetchCountries();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCountries,
};
