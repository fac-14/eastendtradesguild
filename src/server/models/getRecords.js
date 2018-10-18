const fs = require('fs');
const path = require('path');
const Airtable = require('airtable');
const {
  makePostcodeArray,
  getGeolocation,
  makeLatLngArray,
} = require('./postcodes');

// Airtable configuration:

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
const base = Airtable.base('apphdQNWTLdRQbOOg');

// getRecords :: Contents:

// getNoGeo - retrieve all records from Airtable which are missing geolocation
// isValidRow - checks that row contains all the vital info to be displayed
// getAllValidRows - retrieves all rows with valid data from Airtable
// saveCached - takes the response of all valid data and caches as JSON
// getCached - gets the cached data directly from the filesystem without external API call
// requestRows - takes 2 arguments - airtable view and callback to be performed on
//               each record.Returns an array of objects

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
    price_sqft,
    use_class,
    date_of_last_rent_review,
    geolocation,
  },
}) => {
  if (
    postcode &&
    price_sqft &&
    use_class &&
    date_of_last_rent_review &&
    geolocation &&
    geolocation != 'invalid'
  ) {
    return true;
  }
  return false;
};

const saveCached = response =>
  new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(__dirname, 'cache', 'results.json'),
      JSON.stringify(response),
      err => {
        if (err) {
          console.error(err);
          resolve(response);
        } else {
          resolve(response);
        }
      }
    );
  });

const getCached = () =>
  new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, 'cache', 'results.json'), (err, data) => {
      if (err) {
        console.error(err);
        resolve({});
      } else {
        resolve(data);
      }
    });
  });

const getAllValidRows = () =>
  new Promise((resolve, reject) => {
    requestRows('valid_records', (array, record) => {
      if (isValidRow(record)) {
        array.push(record.fields);
      }
    })
      .then(saveCached)
      .then(resolve);
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

module.exports = {
  getNoGeo,
  getAllValidRows,
  requestRows,
  getCached,
};
