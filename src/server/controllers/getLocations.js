const {
  getNoGeo,
  getAllValidRows,
  getCached,
} = require('../models/getRecords');
const { updateGeo } = require('../models/updateRecords');

module.exports = async (req, res) => {
  const rowsWithNoGeolocation = await getNoGeo();
  if (rowsWithNoGeolocation.length > 0) {
    await updateGeo(rowsWithNoGeolocation);
    const locations = await getAllValidRows();
    res.send(locations);
  } else {
    const locations = await getCached();
    res.send(locations);
  }
};
