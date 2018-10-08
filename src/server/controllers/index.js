const express = require('express');
const hello = require('./hello');
const errorHandler = require('./error-handler');
const errorRoute = require('./error-route');

const router = express();

router.get('/api/hello', hello);
router.get('/api/error', errorRoute);

//router.use(errorHandler);

module.exports = router;
