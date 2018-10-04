const express = require('express');
const hello = require('./hello');

const router = express();

router.get('/api/hello', hello);

module.exports = router;
