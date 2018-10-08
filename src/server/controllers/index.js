const express = require('express');

// require in your controller files
const hello = require('./hello');

// create a new router instance
const router = express();

// define your routes
router.get('/api/hello', hello);

module.exports = router;
