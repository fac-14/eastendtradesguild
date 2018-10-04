const express = require('express');
const path = require('path');
const controllers = require('./controllers/index');
const error = require('./error');

const app = express();
const port = process.env.PORT || 5000;

app.use(controllers);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.use(error.server);

app.listen(port, () => console.log(`Listening on port ${port}`));
