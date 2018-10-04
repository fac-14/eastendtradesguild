module.exports = (req, res, next) => {
  try {
    throw new Error("Simulated server error");
  } catch (err) {
    next(err);
  }
};
