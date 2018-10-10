const Airtable = require('airtable');
const {
  makePostcodeArray,
  getGeolocation,
  makeLatLngArray,
} = require('./postcodes');

const apiKey = process.env.AIRTABLE_API_KEY || null;

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey,
});

const base = Airtable.base('apphdQNWTLdRQbOOg');

const getNoGeo = () =>
  new Promise((resolve, reject) => {
    requestRows('no_geolocation', (array, record) => {
      //if (record.fields.postcode != null) {
      const postcodeIdObj = {
        id: record.id,
        postcode: record.fields.postcode,
      };
      array.push(postcodeIdObj);
      // }
    }).then(resolve);
  });

const isValidRow = ({
  fields: {
    postcode,
    address,
    price_sqft,
    use_class,
    date_of_last_rent_review,
    geolocation,
  },
}) => {
  if (
    postcode &&
    address &&
    price_sqft &&
    use_class &&
    date_of_last_rent_review &&
    geolocation != 'invalid'
  ) {
    return true;
  }
  return false;
};

const getAllValidRows = () =>
  new Promise((resolve, reject) => {
    requestRows('valid_records', (array, record) => {
      if (isValidRow(record)) {
        array.push(record.fields);
      }
    }).then(resolve);
  });

const requestRows = (view, cb) =>
  new Promise((resolve, reject) => {
    const outputArray = [];
    base('fonthilldummy')
      .select({
        maxRecords: 1000,
        pageSize: 100,
        view,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.
          records.forEach(record => {
            cb(outputArray, record);
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) console.error(err);
          // console.log(outputArray);
          resolve(outputArray);
        }
      );
  });

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
    base('fonthilldummy').update(id, fields, function(err, record) {
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
  getNoGeo,
  updateGeo,
  getAllValidRows,
  joinWithIDs,
  updateAirtable,
  requestRows,
};
