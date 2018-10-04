const express = require('express');
const hello = require('./hello');
const error = require('./error');

const router = express();

router.get('/api/hello', hello);

if (process.env.NODE_ENV !== 'production') {
  // allows us to test that error handling is working, not needed in production
  const errorRoute = require('./error-route');
  router.get('/api/error', errorRoute);
}

// error handling will deal with next(err) in any controllers
router.use(error.server);

module.exports = router;
