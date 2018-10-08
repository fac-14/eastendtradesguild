module.exports = (err, req, res, next) => {
  res.status(500).send(`<h1>Server error: ${err.message}</h1>`);
};
