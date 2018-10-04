const express = require('express');
const hello = require('./hello');
const error = require('./error');

const router = express();

router.get('/api/hello', hello);

// TODO restrict to test environment only - test that error handling is operational
const errorRoute = require('./error-route');
router.get('/api/error', errorRoute);

// error handling will deal with next(err) in any controllers
router.use(error.server);

module.exports = router;
