const request = require('supertest');
const controllers = require('./index');

it('responds from hello endpoint', async () => {
  const response = await request(controllers).get('/api/hello');
  expect(response.statusCode).toBe(200);
  expect(response.body.express).toBe('Hello From Express');
});
