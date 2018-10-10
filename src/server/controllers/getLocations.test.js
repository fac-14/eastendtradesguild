const request = require('supertest');
const requestModule = require('request');
const controllers = require('./index');

describe('controllers :: getLocations', () => {
  it('makes some calls to request', async () => {
    const response = await request(controllers).get('/api/get_locations');
    expect(response.statusCode).toBe(200);
    expect(requestModule.get.mock.calls).toHaveLength(2);
    //expect(request.get.mock.calls).toHaveLength(2);
  });
});
