const express = require('express');
const hello = require('./hello');
//const error = require('./error');

const router = express.Router();

router.get('/api/hello', hello);

// // error handling routes
// router.use(error.client);
// router.use(error.server);

module.exports = router;
