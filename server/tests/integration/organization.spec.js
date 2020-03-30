const request = require('supertest');
const app = require('../../src/app');
const persist = require('../../src/persistence');

describe('Organization', () => {
    beforeEach(async () => {
        await persist.migrate.rollback();
        await persist.migrate.latest();
    });

    afterAll(() => {
        persist.destroy();
    });

    it('Should be able to create a new organization.', async () => {
        const response = await request(app)
            .post('/organizations')
            .send({
                name: 'Dreaming Together',
                email: 'contact@dreamingtogether.org',
                phone: '81999999999',
                city: 'Olinda',
                state: 'PE'
            });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});
