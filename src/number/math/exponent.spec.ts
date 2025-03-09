import { describe, expect, it } from '@jest/globals';

import { exp, expm1 } from './exponent';

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
                .toThrow('`value` must be `number`, but was `NaN`');
        });
    });
});

describe(expm1, () => {
    describe('when input is a valid number', () => {
        it('returns e^x - 1 for positive numbers', () => {
            expect(expm1(1)).toBeCloseTo(1.718_281_828_459_045);
            expect(expm1(0.5)).toBeCloseTo(0.648_721_270_700_128_2);
        });

        it('returns e^x - 1 for negative numbers', () => {
            expect(expm1(-1)).toBeCloseTo(-0.632_120_558_828_557_7);
            expect(expm1(-0.5)).toBeCloseTo(-0.393_469_340_287_366_6);
        });

        it('returns 0 for input 0', () => {
            expect(expm1(0)).toBe(0);
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => expm1(Number.NaN))
                .toThrow('`value` must be `number`, but was `NaN`');
        });
    });
});
