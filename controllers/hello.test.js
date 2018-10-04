const request = require('supertest');
const router = require('./index');

it('returns JSON to say hello', () => {
  request(router)
    .get('/api/hello')
    .expect(200)
    .end((err, res) => {
      expect(err).toBeFalsy();
      expect(res.body.express).toMatch(/Hello/);
    });
});
