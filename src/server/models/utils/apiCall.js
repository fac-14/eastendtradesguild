const request = require('request');

const get = url =>
  new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      url,
      headers: {
        'User-Agent': 'request',
      },
    };
    request.get(options, (error, res, body) => {
      if (error) {
        console.log('apiCall module failed, error: ', error);
        resolve({});
      } else if (res.statusCode != 200) {
        console.error('apiCall module failed, status: ', res.statusCode);
        resolve({});
      } else {
        resolve(body);
      }
    });
  });

const post = (url, json) =>
  new Promise((resolve, reject) => {
    request.post(
      url,
      {
        json,
      },
      (error, res, body) => {
        if (error) {
          console.error('apiCall module failed, error: ', error);
          resolve({});
        } else if (res.statusCode != 200) {
          console.error('apiCall module failed, status: ', res.statusCode);
          resolve({});
        } else {
          resolve(body);
        }
      }
    );
  });

module.exports = { get, post };
