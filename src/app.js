const express = require('express');
const dotenv = require('dotenv');
const holidayRoutes = require('./routes/holidayRoutes');
const countryRoutes = require('./routes/countryRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/holidays', holidayRoutes);
app.use('/countries', countryRoutes);

module.exports = app;
