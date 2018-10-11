const xhr = require('./xhr');
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

describe('xhr :: get', () => {
  it('resolves on successful request', () => {
    xhr.get('https://api.github.com/users/arrested-developer').then(body => {
      expect(body.login).toEqual('the-jester');
      console.log(request.get.mock.calls);
      expect(request.get.mock.calls).toHaveLength(1);
    });
  });
  it('handles non-400 status without crashing', async () => {
    const actual = await xhr.get('https://api.500.com');
    expect(actual).toEqual({});
    expect(global.console.error.mock.calls).toHaveLength(1);
  });
  it('handles error argument without crashing', async () => {
    const actual = await xhr.get('https://api.error.com');
    expect(actual).toEqual({});
    expect(global.console.error.mock.calls).toHaveLength(1);
  });
});

describe('xhr :: post', () => {
  it('resolves on successful request', () => {
    xhr
      .post('https://api.postcodes.io/postcodes', {})
      .then(body => expect(body.status).toBe(200));
  });
  it('handles non-400 status without crashing', async () => {
    const actual = await xhr.post('https://api.500.com');
    expect(actual).toEqual({});
    expect(global.console.error.mock.calls).toHaveLength(1);
  });
  it('handles error argument without crashing', async () => {
    const actual = await xhr.post('https://api.error.com');
    expect(actual).toEqual({});
    expect(global.console.error.mock.calls).toHaveLength(1);
  });
});
