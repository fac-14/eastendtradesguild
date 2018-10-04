const express = require('express');
const hello = require('./hello');

const router = express();

router.get('/api/hello', hello);

// TODO restrict to test environment only
const errorRoute = require('./error-route');
router.get('/api/error', errorRoute);

module.exports = router;
