const express = require('express');
const controllers = require('./controllers/index');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(controllers);

app.listen(port, () => console.log(`Listening on port ${port}`));
