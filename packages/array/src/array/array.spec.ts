import { concatenated, length } from './array';

describe('concatenated', () => {
    it('creates a new array from a list of array', () => {
        expect(concatenated([]))
            .toStrictEqual([]);
        expect(concatenated(['a', 'b', 'c'], ['d', 'e'], ['f']))
            .toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f']);
    });
});

describe('length', () => {
    it('returns the length of an array', () => {
        expect(length([]))
            .toStrictEqual(0);
        expect(length(['a', 'b', 'c']))
            .toStrictEqual(3);
    });
});
