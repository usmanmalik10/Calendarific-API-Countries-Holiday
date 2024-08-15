const express = require('express');
const { getHolidays } = require('../controllers/holidayController');

const router = express.Router();

router.get('/', getHolidays);

module.exports = router;
