const request = require('supertest');
const controllers = require('./index');

it('retrieves data from airtable', async () => {
  const response = await request(controllers).get('/api/get_locations');
  expect(response.statusCode).toBe(200);
});
