import { concatenated, isArray, isNotArray, length } from './array';

describe('concatenated', () => {
    it('creates a new array from a list of array', () => {
        expect(concatenated([]))
            .toStrictEqual([]);
        expect(concatenated(['a', 'b', 'c'], ['d', 'e'], ['f']))
            .toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f']);
    });
});

describe('isArray', () => {
    it('returns true when value is an array', () => {
        expect(isArray(['0', 0]))
            .toStrictEqual(true);
    });

    it('returns false when value is not an array', () => {
        expect(isArray(0))
            .toStrictEqual(false);
    });
});

describe('isNotArray', () => {
    it('returns true when value is not an array', () => {
        expect(isNotArray('0'))
            .toStrictEqual(true);
    });

    it('returns false when value is an array', () => {
        expect(isNotArray(['0', 0]))
            .toStrictEqual(false);
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
