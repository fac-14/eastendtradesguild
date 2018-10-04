const express = require('express');

const router = express();

router.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

module.exports = router;
