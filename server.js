const express = require('express');
const router = require('./router');

const app = express();
const port = process.env.PORT || 5000;

app.use(router);

app.listen(port, () => console.log(`Listening on port ${port}`));
