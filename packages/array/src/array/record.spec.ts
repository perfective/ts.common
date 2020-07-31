import { flipped } from './record';

describe('flipped', () => {
    it('creates an empty object from an empty array', () => {
        expect(flipped([]))
            .toStrictEqual({});
    });

    it('flips a given array of string into an object', () => {
        expect(flipped(['a', 'b', 'c']))
            .toStrictEqual({
                a: 0,
                b: 1,
                c: 2,
            });
    });
});
