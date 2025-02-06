import { describe, expect, it } from '@jest/globals';

import { ceil } from './rounding';

describe(ceil, () => {
    describe('when input is a valid number', () => {
        it('returns the smallest integer greater than or equal to the given value', () => {
            expect(ceil(0)).toBe(0);
            expect(ceil(1.1)).toBe(2);
            expect(ceil(-1.1)).toBe(-1);
            expect(ceil(2.5)).toBe(3);
            expect(ceil(-2.5)).toBe(-2);
        });
    });

    describe('when input is Infinity', () => {
        it('returns Infinity', () => {
            expect(ceil(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });

    describe('when input is -Infinity', () => {
        it('returns -Infinity', () => {
            expect(ceil(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => ceil(Number.NaN))
                .toThrow('Argument `value` must be `number`, but was `NaN`');
        });
    });
});
