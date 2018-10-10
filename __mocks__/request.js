const request = jest.genMockFromModule('request');

// require JSON data from files
const postcodesResponse = require('./json/postcodes_geolocation_data.json');
const postcodeGetResponse = require('./json/postcodeGetResponse.json');
const github = require('./json/github.json');

const getMocks = {
  'https://api.postcodes.io/postcodes/e83fp': postcodeGetResponse,
  'https://api.github.com/users/arrested-developer': github,
};

const postMocks = {
  'https://api.postcodes.io/postcodes': postcodesResponse,
};

const setStatus = {
  'https://api.500.com': 500,
};

const setError = {
  'https://api.error.com': 'server error',
};

const get = (options, callback) => {
  callback(
    setError[options.url] || null,
    { statusCode: setStatus[options.url] || 200, text: getMocks[options.url] },
    getMocks[options.url]
  );
};

const post = (url, json, callback) => {
  callback(
    setError[url] || null,
    { statusCode: setStatus[url] || 200, text: postMocks[url] },
    postMocks[url]
  );
};

request.get = get;
request.post = post;

module.exports = request;
