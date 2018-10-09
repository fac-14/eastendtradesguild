const Airtable = require('airtable');
const {
  makePostcodeArray,
  getGeolocation,
  makeLatLngArray,
} = require('./postcodes');

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'keyYBKUirvMxeaey5',
});

const base = Airtable.base('apphdQNWTLdRQbOOg');

const getNoGeo = () =>
  new Promise((resolve, reject) => {
    const outputArray = [];
    base('fonthilldummy')
      .select({
        maxRecords: 1000,
        pageSize: 100,
        view: 'no_geolocation',
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.
          records.forEach(function(record) {
            // set up objet to be populated using postcodesIO and sent back to airtable
            postcodeIdObj = {
              id: record.id,
              postcode: record.fields.postcode,
            };
            outputArray.push(postcodeIdObj);
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) reject(err);
          resolve(outputArray);
        }
      );
  });

const updateGeo = airtableResponse =>
  new Promise((resolve, reject) => {
    // convert input object to array of postcodes
    const postcodeArray = makePostcodeArray(airtableResponse);
    // get geolocation for each one
    getGeolocation(postcodeArray)
      .then(makeLatLngArray)
      // stitch ids and lat/lngs back together
      .then(latLng => joinWithIDs(airtableResponse, latLng))
      // update airtable
      .then(updateMany);
    //.then(console.log);
    // resolve promise
  });

const joinWithIDs = (airtableResponse, postcodeResponse) =>
  new Promise((resolve, reject) => {
    let updateArray = [];
    for (i = 0; i < airtableResponse.length; i++) {
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
        reject(err);
      }
      resolve(record);
    });
  });

const updateMany = array =>
  new Promise((resolve, reject) => {
    array.forEach(async row => await updateAirtable(row.id, row.fields));
    resolve(true);
  });

// const getNoGeo = new (resolve, reject) => {
//     const outputArray = []

//     base('fonthilldummy').select({
//         maxRecords: 1000,
//         pageSize: 100,
//         view: 'no_geolocation'
//     }).eachPage(function page(records, fetchNextPage) {
//         // This function (`page`) will get called for each page of records.
//         records.forEach(function (record) {
//             // set up objet to be populated using postcodesIO and sent back to airtable
//             postcodeIdObj = {
//                 id: record.id,
//                 postcode: record.fields.postcode,
//             }
//             outputArray.push(postcodeIdObj)
//         });
//         fetchNextPage()
//     }, function done(err) {
//         if (err) { console.error(err); return }
//     }
//     )

// }

module.exports = { getNoGeo, updateGeo };
