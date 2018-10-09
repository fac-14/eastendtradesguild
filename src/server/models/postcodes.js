const request = require("request");

const makePostcodeArray = inputArray => inputArray.map(entry => entry.postcode);

const getGeolocation = (postcodeArray, results = []) =>
  new Promise((resolve, reject) => {
    // console.log(array);
    request.post(
      "https://api.postcodes.io/postcodes",
      {
        json: { postcodes: postcodeArray.slice(0, 100) }
      },
      (error, res, body) => {
        if (error) {
          reject(error);
        } else {
          // console.log(body.result);
          resolve(body.result);
        }
      }
    );
  });

//
const makeLatLngArray = inputArray => {
  return inputArray.map(entry => {
    if (entry.result != null) {
      return {
        lat: entry.result.latitude,
        lng: entry.result.longitude
      };
    } else {
      return "invalid";
    }
  });
};
module.exports = { makePostcodeArray, getGeolocation, makeLatLngArray };
