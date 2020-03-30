const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('Should generate an unique ID', () => {
        expect(generateUniqueId()).toHaveLength(8);
    });
});