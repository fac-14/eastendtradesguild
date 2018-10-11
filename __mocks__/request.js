//const request = jest.genMockFromModule('request');

// require JSON data from files
const postcodesResponse = require('./json/postcodes_geolocation_data.json');
const postcodeGetResponse = require('./json/postcodeGetResponse.json');
const github = require('./json/github.json');
const airtableNoGeo = require('./json/airtable_no_geolocation.json');
const airtableAllValidRows = require('./json/airtable_all_valid_rows.json');

const getMocks = {
  'https://api.postcodes.io/postcodes/e83fp': postcodeGetResponse,
  'https://api.github.com/users/arrested-developer': github,
  'https://api.airtable.com/v0/apphdQNWTLdRQbOOg/fonthilldummy?maxRecords=1000&pageSize=100&view=no_geolocation': airtableNoGeo,
  'https://api.airtable.com/v0/apphdQNWTLdRQbOOg/fonthilldummy?maxRecords=1000&pageSize=100&view=valid_records': airtableAllValidRows,
};

const postMocks = {
  'https://api.postcodes.io/postcodes': postcodesResponse,
};

const setStatus = {
  'https://api.500.com': 500,
};

const setError = {
  'https://api.error.com': 'server error',
  'https://api.airtable.com/v0/apphdQNWTLdRQbOOg/fonthilldummy/givemeanerror?':
    'server error',
  'https://api.airtable.com/v0/apphdQNWTLdRQbOOg/fonthilldummy?maxRecords=1000&pageSize=100&view=throw_error':
    'server error',
};

const request = (options, callback) => {
  if (options.method === 'POST') {
    post(options, callback);
  } else if (options.method === 'GET') {
    get(options, callback);
  } else if (options.method === 'PATCH') {
    patch(options, callback);
  }
};

const get = jest.fn().mockImplementation((options, callback) => {
  callback(
    setError[options.url] || null,
    { statusCode: setStatus[options.url] || 200, text: getMocks[options.url] },
    getMocks[options.url]
  );
});

const post = jest.fn().mockImplementation((url, json, callback) => {
  callback(
    setError[url] || null,
    { statusCode: setStatus[url] || 200, text: postMocks[url] },
    postMocks[url]
  );
});

const patch = jest.fn().mockImplementation((options, callback) => {
  callback(setError[options.url] || null, {});
});

request.get = get;
request.post = post;
request.patch = patch;

module.exports = request;
