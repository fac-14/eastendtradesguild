const request = require("request");

const makePostcodeArray = inputArray => inputArray.map(entry => entry.postcode);

const getGeolocation = array =>
  new Promise((resolve, reject) => {
    console.log(array);
    request.post(
      "https://api.postcodes.io/postcodes",
      {
        json: { postcodes: array }
      },
      (error, res, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body.result);
        }
      }
    );
  });

const makeLatLngArray = inputArray =>
  inputArray.map(entry => ({
    lat: entry.result.latitude,
    lng: entry.result.longitude
  }));

module.exports = { makePostcodeArray, getGeolocation, makeLatLngArray };
