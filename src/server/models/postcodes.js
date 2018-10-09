const request = require('request');

const makePostcodeArray = inputArray =>
    inputArray.map(entry => entry.postcode)

const getGeolocation = array => {
    //console.log('hello');
    request.post('https://api.postcodes.io/postcodes', {
        json: { "postcodes": array },
    }, (error, res, body) => {
        console.log('I\'m a callback')
    })
    //return [{ lat: 10, lng: 5 }, { lat: 108, lng: -180 }, { lat: 55, lng: 120 }];
}
module.exports = { makePostcodeArray, getGeolocation }