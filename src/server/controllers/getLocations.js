const request = require('request');
const { getNoGeo, updateGeo, getAllValidRows } = require('../models/table');

module.exports = async (req, res) => {
  const rowsWithNoGeolocation = await getNoGeo();
  updateGeo(rowsWithNoGeolocation);
  const locations = await getAllValidRows();
  res.send(locations);
};
