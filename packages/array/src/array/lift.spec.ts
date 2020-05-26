import { concat, slice } from './lift';

const irrational: number[] = [1.20, 1.41, 1.61, 1.73, 2.23, 2.71, 3.14];

describe('concat', () => {
    it('lifts the Array.concat() method', () => {
        expect(concat([2.71, 3.14])([1.41, 1.73, 2.23]))
            .toStrictEqual([1.41, 1.73, 2.23, 2.71, 3.14]);
    });
});

describe('slice', () => {
    it('lifts the Array.slice() method', () => {
        expect(slice()(irrational))
            .toStrictEqual([1.20, 1.41, 1.61, 1.73, 2.23, 2.71, 3.14]);
        expect(slice(1)(irrational))
            .toStrictEqual([1.41, 1.61, 1.73, 2.23, 2.71, 3.14]);
        expect(slice(0, 2)(irrational))
            .toStrictEqual([1.20, 1.41]);
        expect(slice(-1, 2)(irrational))
            .toStrictEqual([]);
        expect(slice(-1)(irrational))
            .toStrictEqual([3.14]);
        expect(slice(-3, -1)(irrational))
            .toStrictEqual([2.23, 2.71]);
    });
});
