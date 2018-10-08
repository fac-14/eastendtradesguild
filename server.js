const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
// const compression = require('compression');
// const controllers = require('./src/server/controllers/index');

const app = express();
const port = process.env.PORT || 5000;

// app.use(bodyParser);
// app.use(compression);
// app.use(controllers);
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

if (process.env.NODE_ENV === 'production') {
  // static route to serve React build
  app.use(express.static(path.join(__dirname, 'build')));
  // return all unhandled requests to React for routing
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
