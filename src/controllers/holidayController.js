const calendarificService = require('../services/calendarificService');

const getHolidays = async (req, res) => {
  const { country, year } = req.query;

  if (!country || !year) {
    return res
      .status(400)
      .json({ error: 'Country and year are required parameters.' });
  }

  try {
    const holidays = await calendarificService.fetchHolidays(country, year);
    res.json(holidays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getHolidays,
};
