import { describe, expect, it } from '@jest/globals';

import { arccosh, arccosine, arcsine } from './trigonometry';

describe(arccosine, () => {
    describe('when cosine is less than -1', () => {
        it('returns null', () => {
            expect(arccosine(-1.1)).toBeNull();
        });
    });

    describe('when cosine is greater than 1', () => {
        it('returns null', () => {
            expect(arccosine(1.1)).toBeNull();
        });
    });

    describe('when cosine is between -1 and 1', () => {
        it('returns the inverse cosine of the given cosine', () => {
            expect(arccosine(-1)).toBe(Math.PI);
            expect(arccosine(0)).toBe(Math.PI / 2);
            expect(arccosine(0.5)).toBe(1.047_197_551_196_597_9); // == Math.PI / 3
            expect(arccosine(1)).toBe(0);
        });
    });
});

describe(arcsine, () => {
    describe('when sine is less than -1', () => {
        it('returns null', () => {
            expect(arcsine(-1.1)).toBeNull();
        });
    });

    describe('when sine is greater than 1', () => {
        it('returns null', () => {
            expect(arcsine(1.1)).toBeNull();
        });
    });

    describe('when sine is between -1 and 1', () => {
        it('returns the inverse sine of the given sine', () => {
            expect(arcsine(-1)).toBe(-Math.PI / 2);
            expect(arcsine(0)).toBe(0);
            expect(arcsine(0.5)).toBe(0.523_598_775_598_298_9); // == Math.PI / 6
            expect(arcsine(1)).toBe(Math.PI / 2);
        });
    });
});

describe(arccosh, () => {
    describe('when input is less than 1', () => {
        it('returns null', () => {
            expect(arccosh(0)).toBeNull();
        });
    });

    describe('when input is 1 or more', () => {
        it('returns the hyperbolic arccosine of the given value', () => {
            expect(arccosh(1)).toBe(0);
            expect(arccosh(2)).toBe(1.316_957_896_924_816_6);
        });
    });

    describe('when input is a positive infinity', () => {
        it('returns Infinity', () => {
            // eslint-disable-next-line unicorn/prefer-number-properties -- test values
            expect(arccosh(Infinity)).toBe(Infinity);
            expect(arccosh(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });
});
