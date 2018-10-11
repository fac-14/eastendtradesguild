const xhr = require("./utils/xhr");

const makePostcodeArray = inputArray => inputArray.map(entry => entry.postcode);

const getGeolocation = postcodeArray =>
  new Promise((resolve, reject) => {
    xhr
      .post("https://api.postcodes.io/postcodes", {
        postcodes: postcodeArray.slice(0, 100)
      })
      .then(body => resolve(body.result));
  });

const makeLatLngArray = inputArray => {
  return inputArray.map(entry => {
    if (entry.result != null) {
      return [entry.result.latitude, entry.result.longitude];
    } else {
      return "invalid";
    }
  });
};
module.exports = { makePostcodeArray, getGeolocation, makeLatLngArray };
