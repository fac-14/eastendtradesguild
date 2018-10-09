const request = require('request');
const { getNoGeo, updateGeo } = require('../models/airtable');

module.exports = async (req, res, next) => {
  const rowsWithNoGeolocation = await getNoGeo();
  if (rowsWithNoGeolocation.length > 0) {
    const response = await updateGeo(rowsWithNoGeolocation);
  }
  // if any rows had no geolocation, they have now been updated

  // request all rows from airtable

  // send all rows to client
};
