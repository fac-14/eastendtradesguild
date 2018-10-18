const { getNoGeo, getAllValidRows } = require('../models/getRecords');
const { updateGeo } = require('../models/updateRecords');

module.exports = async (req, res) => {
  const rowsWithNoGeolocation = await getNoGeo();
  updateGeo(rowsWithNoGeolocation);
  const locations = await getAllValidRows();
  res.send(locations);
};
