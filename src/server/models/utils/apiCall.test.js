const apiCall = require('./apiCall');

beforeEach(() => {
  // disable console as we're testing some error handling which should throw up errors
  global.console.error = jest.fn().mockImplementation(() => {});
  global.console.log = jest.fn().mockImplementation(() => {});
});
afterEach(() => {
  global.console.error.mockRestore();
  global.console.log.mockRestore();
});

describe('apiCall :: get', () => {
  it('resolves on successful request', () => {
    apiCall
      .get('https://api.github.com/users/arrested-developer')
      .then(body => expect(body.login).toEqual('the-jester'));
  });
  it('handles 500 status code', () => {
    apiCall.get('https://api.500.com').catch(err => {
      expect(err).toEqual(500);
    });
  });
  it('handles error thrown by request', () => {
    apiCall.get('https://api.error.com').catch(err => {
      expect(err).toEqual('server error');
    });
  });
});

describe('apiCall :: post', () => {
  it('resolves on successful request', () => {
    apiCall
      .post('https://api.postcodes.io/postcodes', {})
      .then(body => expect(body.status).toBe(200));
  });
  it('handles 500 status code', () => {
    apiCall.post('https://api.500.com').catch(err => {
      expect(err).toEqual(500);
    });
  });
  it('handles error thrown by request', () => {
    apiCall.post('https://api.error.com').catch(err => {
      expect(err).toEqual('server error');
    });
  });
});
