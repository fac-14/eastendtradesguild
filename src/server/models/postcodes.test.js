const { makePostcodeArray } = require('./postcodes');

const noGeoOutput = [
    { id: 'recavzIUC1T3IT1uO', postcode: 'N4 3HF' },
    { id: 'recqmLe3AjHxnUEPT', postcode: 'N4 3HH' },
    { id: 'rec6i8mI1ua3ZK6D9', postcode: 'N4 3HQ' }
]

it('produces an array', () => {
    const actual = Array.isArray(makePostcodeArray(noGeoOutput));
    expect(actual).toBeTruthy();
})