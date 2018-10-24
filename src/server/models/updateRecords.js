const Airtable = require('airtable');
const {
  makePostcodeArray,
  getGeolocation,
  makeLatLngArray,
} = require('./postcodes');

/* istanbul ignore next */
const apiKey = process.env.AIRTABLE_API_KEY
  ? process.env.AIRTABLE_API_KEY
  : process.env.NODE_ENV === 'production'
    ? null
    : 'keyTestValue';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey,
});
const base = Airtable.base('appZ5iPToPB60Mo0F');

// updateRecords :: Contents
//
// updateGeo - takes airtable response of records without geolocation (array of objects)
//            and updates them with latitude and longitude - adds to Airtable
// joinWithIds - used by updateGeo to join the airtable response object's IDs with the
//             latitude and longitude retrieved from the postcodes.io API
// updateAirtable - updates one row in Airtable, takes id and object of fields to update
// updateMany - takes array of multiple records to update

const updateGeo = airtableResponse =>
  new Promise((resolve, reject) => {
    if (airtableResponse.length === 0) {
      resolve(0);
    } else {
      // convert input object to array of postcodes
      const postcodeArray = makePostcodeArray(airtableResponse);
      // get geolocation for each one
      getGeolocation(postcodeArray)
        .then(makeLatLngArray)
        // stitch ids and lat/lngs back together
        .then(latLng => joinWithIDs(airtableResponse, latLng))
        // update airtable
        .then(updateMany)
        .then(resolve)
        .catch(console.log);
    }
  });

const joinWithIDs = (airtableResponse, postcodeResponse) =>
  new Promise((resolve, reject) => {
    let updateArray = [];
    for (let i = 0; i < airtableResponse.length; i++) {
      updateArray[i] = {
        id: airtableResponse[i].id,
        fields: {
          geolocation: JSON.stringify(postcodeResponse[i]),
        },
      };
    }
    resolve(updateArray);
  });

const updateAirtable = (id, fields) =>
  new Promise((resolve, reject) => {
    base('RENTCHECK').update(id, fields, function(err, record) {
      if (err) {
        console.error('error with Airtable module: ', err);
        resolve(false);
      }
      resolve(record);
    });
  });

const updateMany = array =>
  new Promise((resolve, reject) => {
    array.forEach(async row => await updateAirtable(row.id, row.fields));
    resolve(true);
  });

module.exports = {
  updateGeo,
  joinWithIDs,
  updateAirtable,
  updateMany,
};
