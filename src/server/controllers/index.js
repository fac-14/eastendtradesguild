const express = require('express');
const getLocations = require('./getLocations');

const router = express();

router.get('/api/get_locations', getLocations);

module.exports = router;
