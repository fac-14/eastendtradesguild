const { updateGeo, joinWithIDs, updateAirtable } = require('./updateRecords');
const request = require('request');

beforeEach(() => {
  // disable console as we're testing some error handling which should throw up errors
  global.console.error = jest.fn().mockImplementation(() => {});
  global.console.log = jest.fn().mockImplementation(() => {});
});
afterEach(() => {
  global.console.error.mockRestore();
  global.console.log.mockRestore();
});

const airtableResponse = [
  {
    id: 1,
    postcode: 'N4 3HF',
  },
  {
    id: 2,
    postcode: 'N4 3HH',
  },
  {
    id: 3,
    postcode: 'N4 3HQ',
  },
  {
    id: 4,
    postcode: '',
  },
];

const geolocationOutput = [
  { lat: 51.564261, lng: -0.108292 },
  { lat: 51.530337, lng: -0.082451 },
  { lat: 51.540557, lng: -0.094451 },
  'invalid',
];

const joinedData = [
  {
    id: 1,
    fields: { geolocation: '{"lat":51.564261,"lng":-0.108292}' },
  },
  {
    id: 2,
    fields: { geolocation: '{"lat":51.530337,"lng":-0.082451}' },
  },
  {
    id: 3,
    fields: { geolocation: '{"lat":51.540557,"lng":-0.094451}' },
  },
  { id: 4, fields: { geolocation: '"invalid"' } },
];

describe('table :: joinWithIDs', () => {
  it('returns an array with IDs and geolocation data', async () => {
    const actual = await joinWithIDs(airtableResponse, geolocationOutput);
    expect(actual).toEqual(joinedData);
  });
});

describe('table :: updateGeo', () => {
  it('calls API once for each record', async () => {
    const response = await updateGeo(airtableResponse);
    expect(response).toBeTruthy();
    expect(request.patch.mock.calls).toHaveLength(4);
    request.patch.mockClear();
  });
  it('returns 0 when called with an empty array', async () => {
    const response = await updateGeo([]);
    expect(response).toBe(0);
  });
});

describe('table :: updateAirtable', () => {
  it('makes one call to the request module', async () => {
    const actual = await updateAirtable('sdkuhsg', {
      postcode: 'E2 3PD',
    });
    expect(request.patch.mock.calls).toHaveLength(1);
    request.patch.mockClear();
  });
  it('handles error from airtable module', async () => {
    const actual = await updateAirtable('givemeanerror', {
      postcode: 'E2 3DD',
    });
    expect(request.patch.mock.calls).toHaveLength(1);
    request.patch.mockClear();
  });
});
