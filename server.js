const express = require('express');
const controllers = require('./controllers/index');

const app = express();
const port = process.env.PORT || 5000;

app.use(controllers);

// if in production mode, serve React files from static folder client/build
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  router.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
