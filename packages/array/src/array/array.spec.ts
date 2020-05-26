import { concatenated } from './array';

describe('concatenated', () => {
    it('creates a new array from a list of array', () => {
        expect(concatenated([]))
            .toStrictEqual([]);
        expect(concatenated(['a', 'b', 'c'], ['d', 'e'], ['f']))
            .toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f']);
    });
});
