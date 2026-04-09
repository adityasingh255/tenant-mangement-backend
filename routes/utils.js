const express = require('express');
const { getTimeZones } = require('../controllers/utils');
const router = express.Router();
router.get('/timezones', getTimeZones);
module.exports = router;