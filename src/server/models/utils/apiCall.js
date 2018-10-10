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
    request.get(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (response.statusCode != 200) {
        reject(response.statusCode);
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
          reject(error);
        } else if (res.statusCode != 200) {
          reject(res.statusCode);
        } else {
          resolve(body);
        }
      }
    );
  });

module.exports = { get, post };
