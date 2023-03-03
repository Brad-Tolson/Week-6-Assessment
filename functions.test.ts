const {shuffleArray} = require('./utils')

describe('shuffleArray should', () => {
    it('return an array', () => {
        const result = shuffleArray([1, 2, 3]);
        expect(Array.isArray(result)).toBe(true);
    });

    it('return an array of the same length as the input', () => {
        const input = [1, 2, 3, 4, 5];
        const result = shuffleArray(input);
        expect(result.length).toBe(input.length);
    });

    it('return an array with the same items', () => {
        const input = [1, 2, 3, 4, 5];
        const result = shuffleArray(input);
        input.forEach(item => {
            expect(result.includes(item)).toBe(true);
        });
    });

    it('return an array with shuffled items', () => {
        const input = [1, 2, 3, 4, 5];
        const result = shuffleArray(input);
        expect(result).not.toEqual(input);
    });
})
