const express = require('express');
const hello = require('./hello');
const error = require('./error');

const router = express.Router();

// require different handlers from this folder
// e.g. const landing = require("./landing");

router.get('/api/hello', hello);

// if in production mode, serve React files from static folder client/build
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  router.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// error handling routes
router.use(error.client);
router.use(error.server);

module.exports = router;
