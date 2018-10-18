const { getNoGeo, getAllValidRows, requestRows } = require('./getRecords');
const request = require('request');

beforeEach(() => {
  // disable console as we're testing some error handling which should throw up errors
  global.console.error = jest.fn().mockImplementation(() => {});
  // global.console.log = jest.fn().mockImplementation(() => {});
});
afterEach(() => {
  global.console.error.mockRestore();
  // global.console.log.mockRestore();
  request.get.mockClear();
});

const validOutput = [
  { id: 'recavzIUC1T3IT1uO', postcode: 'N4 3HF' },
  { id: 'recqmLe3AjHxnUEPT', postcode: 'N4 3HH' },
  { id: 'rec6i8mI1ua3ZK6D9', postcode: 'N4 3HQ' },
];

describe('table :: getNoGeo', () => {
  it('returns array with just ID and postcode', async () => {
    const actual = await getNoGeo();
    expect(actual).toEqual(validOutput);
  });
});

describe('table :: getAllValidRows', () => {
  it('returns an array of 9 valid data rows', async () => {
    const actual = await getAllValidRows();
    expect(actual.length).toBe(8);
  });
});

const triggerError = () =>
  new Promise((resolve, reject) => {
    requestRows('throw_error', (array, record) => {
      array.push(record.fields);
    }).then(resolve);
  });

describe('table :: requestRows', () => {
  it('handles error from Airtable module', async () => {
    const actual = await triggerError();
    expect(global.console.error.mock.calls).toHaveLength(1);
  });
});
