const request = require('request');
const apiCall = require('./utils/apiCall');

const makePostcodeArray = inputArray => inputArray.map(entry => entry.postcode);

const getGeolocation = postcodeArray =>
  new Promise((resolve, reject) => {
    apiCall
      .post('https://api.postcodes.io/postcodes', {
        postcodes: postcodeArray.slice(0, 100),
      })
      .then(body => resolve(body.result));
  });

const makeLatLngArray = inputArray => {
  return inputArray.map(entry => {
    if (entry.result != null) {
      return {
        lat: entry.result.latitude,
        lng: entry.result.longitude,
      };
    } else {
      return 'invalid';
    }
  });
};
module.exports = { makePostcodeArray, getGeolocation, makeLatLngArray };
