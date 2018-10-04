const express = require('express');
const controllers = require('./controllers/index');

const app = express();
const port = process.env.PORT || 5000;

app.use(controllers);

app.listen(port, () => console.log(`Listening on port ${port}`));
