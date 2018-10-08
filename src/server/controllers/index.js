const express = require('express');
const hello = require('./hello');
const getLocations = require('./getLocations');

const router = express();

router.get('/api/hello', hello);
router.get('/api/get_locations', getLocations)

module.exports = router;
