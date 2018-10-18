const {
  getNoGeo,
  getAllValidRows,
  getCached,
} = require('../models/getRecords');
const { updateGeo } = require('../models/updateRecords');

module.exports = async (req, res) => {
  const rowsWithNoGeolocation = await getNoGeo();
  if (rowsWithNoGeolocation.length > 0) {
    const checkUpdate = await updateGeo(rowsWithNoGeolocation);
    console.log('updated: ', checkUpdate);
    if (checkUpdate) {
      const locations = await getAllValidRows();
      res.send(locations);
    } else {
      res.send('nope');
    }
  } else {
    const locations = await getCached();
    res.send(locations);
  }
};
