const request = require('request');
const { getNoGeo, updateGeo, getAllValidRows } = require('../models/table');

module.exports = async (req, res) => {
  const rowsWithNoGeolocation = await getNoGeo();
  if (rowsWithNoGeolocation.length > 0) {
    await updateGeo(rowsWithNoGeolocation);
  }
  const locations = await getAllValidRows();
  res.send(locations);
};
