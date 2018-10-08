const express = require('express');
const path = require('path');
const controllers = require('./src/server/controllers/index');

const app = express();
const port = process.env.PORT || 5000;

app.use(controllers);

if (process.env.NODE_ENV === 'production') {
  // static route to serve React build
  app.use(express.static(path.join(__dirname, 'build')));
  // return all unhandled requests to React for routing
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
