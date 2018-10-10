const table = require('./table');

const validOutput = [
  { id: 'recavzIUC1T3IT1uO', postcode: 'N4 3HF' },
  { id: 'recqmLe3AjHxnUEPT', postcode: 'N4 3HH' },
  { id: 'rec6i8mI1ua3ZK6D9', postcode: 'N4 3HQ' },
];

describe('table :: getNoGeo', () => {
  it('returns array with just ID and postcode', async () => {
    const actual = await table.getNoGeo();
    expect(actual).toEqual(validOutput);
  });
});

describe('table :: getAllValidRows', () => {
  it('returns an array of valid data rows', async () => {
    const actual = await table.getAllValidRows();
    expect(actual.length).toBe(11);
    console.log(actual);
  });
});
