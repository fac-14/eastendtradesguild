const { makePostcodeArray, getGeolocation } = require('./postcodes');

const noGeoOutput = [
    { id: 'recavzIUC1T3IT1uO', postcode: 'N4 3HF' },
    { id: 'recqmLe3AjHxnUEPT', postcode: 'N4 3HH' },
    { id: 'rec6i8mI1ua3ZK6D9', postcode: 'N4 3HQ' }
]

const postcodeArray = ['N4 3HF', 'N4 3HH', 'N4 3HQ'];

const postcodeGeoData = require('../../../mocks/postcodes_geolocation_data.json')

it('produces an array', () => {
    const actual = Array.isArray(makePostcodeArray(noGeoOutput));
    expect(actual).toBeTruthy();
    expect(makePostcodeArray(noGeoOutput)).toEqual(postcodeArray);
})

it('takes an array of postcodes and sends back lat and long for each item', () => {
    const actual = getGeolocation(postcodeArray);
    expect(Array.isArray(actual)).toBeTruthy();
    expect(actual.length).toBe(3);
    expect(typeof actual[0]).toBe('object');
})