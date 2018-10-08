const express = require('express');
const hello = require('./hello');
const airtable = require('./airtable');

const router = express();

router.get('/api/hello', hello);
router.get('/api/airtable', airtable)

module.exports = router;
