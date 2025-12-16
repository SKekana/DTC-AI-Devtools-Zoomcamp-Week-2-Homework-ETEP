const request = require('supertest');
const app = require('./app');

describe('GET /api/health', () => {
    it('responds with json', async () => {
        const response = await request(app)
            .get('/api/health')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toEqual({ status: 'ok' });
    });
});
