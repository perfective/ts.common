import { describe, expect, it } from '@jest/globals';

import { exp } from './exponent';

describe(exp, () => {
    describe('when input is a valid number', () => {
        it('returns Euler\'s number `e` raised to the power of the given number', () => {
            expect(exp(Number.NEGATIVE_INFINITY)).toBe(0);
            expect(exp(-1)).toBe(0.367_879_441_171_442_33);
            expect(exp(0)).toBe(1);
            expect(exp(1)).toBe(Math.E);
            expect(exp(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => exp(Number.NaN))
                .toThrow('Argument `value` must be `number`, but was `NaN`');
        });
    });
});
