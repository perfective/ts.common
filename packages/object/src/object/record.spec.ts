import { recordFromArray } from './record';

describe('recordFromArray', () => {
    it('creates an empty object from an empty array', () => {
        expect(recordFromArray([]))
            .toStrictEqual({});
    });

    it('flips a given array of string into an object', () => {
        expect(recordFromArray(['a', 'b', 'c']))
            .toStrictEqual({
                a: 0,
                b: 1,
                c: 2,
            });
    });
});
