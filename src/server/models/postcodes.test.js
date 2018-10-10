const { makePostcodeArray, getGeolocation } = require('./postcodes');

const noGeoOutput = [
  { id: 'recavzIUC1T3IT1uO', postcode: 'N4 3HF' },
  { id: 'recqmLe3AjHxnUEPT', postcode: 'N4 3HH' },
  { id: 'rec6i8mI1ua3ZK6D9', postcode: 'N4 3HQ' },
];

const postcodeArray = ['N4 3HF', 'N4 3HH', 'N4 3HQ'];

describe('tests are running', () => {
  it('can add', () => {
    expect(1 + 1).toEqual(2);
  });
});
