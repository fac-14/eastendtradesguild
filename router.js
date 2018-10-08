const express = require('express');
const path = require('path');
const controllers = require('./src/server/controllers');

const router = express();

router.use(controllers);

if (process.env.NODE_ENV === 'production') {
  // static route to serve React build
  app.use(express.static(path.join(__dirname, '../../build')));
  // return all unhandled requests to React for routing
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
}

module.exports = router;
