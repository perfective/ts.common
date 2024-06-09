import { describe, expect, it } from '@jest/globals';

import { difference, product, quotient, remainder, sum } from './arithmetic';

describe(sum, () => {
    it('is commutative', () => {
        expect(sum(2, 3))
            .toStrictEqual(sum(3, 2));
    });

    it('is associative', () => {
        expect(sum(2, sum(3, 4)))
            .toStrictEqual(sum(sum(2, 3), 4));
    });

    it('has identity element 0', () => {
        expect(sum(2, 0))
            .toBe(2);
        expect(sum(0, 2))
            .toBe(2);
    });

    it('can be used to reduce an array of numbers', () => {
        expect([8, 5, 3, 2, 1].reduce(sum))
            .toBe(19);
    });
});

describe(difference, () => {
    it('is anti-commutative', () => {
        expect(difference(5, 3))
            .toStrictEqual(-difference(3, 5));
    });
});

describe(product, () => {
    it('is commutative', () => {
        expect(product(3, 5))
            .toStrictEqual(product(5, 3));
    });

    it('is associative', () => {
        expect(product(3, product(5, 7)))
            .toStrictEqual(product(product(3, 5), 7));
    });

    it('is distributive', () => {
        expect(product(3, sum(5, 7)))
            .toStrictEqual(sum(product(3, 5), product(3, 7)));
    });

    it('has identity element 1', () => {
        expect(product(3, 1))
            .toBe(3);
        expect(product(1, 3))
            .toBe(3);
    });

    it('has zero property', () => {
        expect(product(3, 0))
            .toBe(0);
        expect(product(0, 3))
            .toBe(0);
    });

    it('negates value when multiplied by -1', () => {
        expect(product(3, -1))
            .toBe(-3);
        expect(product(-1, -1))
            .toBe(1);
    });

    it('can be used to reduce array of numbers', () => {
        expect([5, 7, 11, 13].reduce(product))
            .toBe(5005);
    });
});

describe(quotient, () => {
    it('returns a float number result of division of dividend by divisor', () => {
        expect(quotient(5, 2))
            .toBe(2.5);
    });

    it('returns Infinity when divisor is 0', () => {
        expect(quotient(5, 0))
            .toStrictEqual(Number.POSITIVE_INFINITY);
        expect(quotient(-5, 0))
            .toStrictEqual(Number.NEGATIVE_INFINITY);
    });
});

describe(remainder, () => {
    it('returns an integer remainder of division of dividend by divisor', () => {
        expect(remainder(5, 3))
            .toBe(2);
    });

    it('returns NaN when divisor is 0', () => {
        expect(remainder(5, 0))
            .toStrictEqual(Number.NaN);
    });
});
