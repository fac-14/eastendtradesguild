const request = require('supertest');
const router = require('./index');

it('handles server errors when thrown', () => {
  request(router)
    .get('/api/error')
    .expect(500)
    .end((err, res) => {
      expect(err).toBeFalsy();
    });
});
