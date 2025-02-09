import { describe, expect, it } from '@jest/globals';

import { log, log1p, log10 } from './logarithm';

describe(log, () => {
    describe('when input is a positive number', () => {
        it('returns the natural logarithm of the given value', () => {
            expect(log(1)).toBe(0);
            expect(log(Math.E)).toBe(1);
            expect(log(10)).toBeCloseTo(2.302_585_092_994_046);
        });
    });

    describe('when input is zero', () => {
        it('returns -Infinity', () => {
            expect(log(0)).toBe(Number.NEGATIVE_INFINITY);
        });
    });

    describe('when input is Infinity', () => {
        it('returns Infinity', () => {
            expect(log(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });

    describe('when input is a negative number', () => {
        it('throws an exception', () => {
            expect(() => log(-1)).toThrow('Argument `value` must be `[0, +∞)`, but was `-1`');
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => log(Number.NaN)).toThrow('Argument `value` must be `[0, +∞)`, but was `NaN`');
        });
    });
});

describe(log10, () => {
    describe('when input is a positive number', () => {
        it('returns the base-10 logarithm of the given value', () => {
            expect(log10(1)).toBe(0);
            expect(log10(10)).toBe(1);
            expect(log10(100)).toBe(2);
        });
    });

    describe('when input is zero', () => {
        it('returns -Infinity', () => {
            expect(log10(0)).toBe(Number.NEGATIVE_INFINITY);
        });
    });

    describe('when input is Infinity', () => {
        it('returns Infinity', () => {
            expect(log10(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });

    describe('when input is a negative number', () => {
        it('throws an exception', () => {
            expect(() => log10(-1)).toThrow('Argument `value` must be `[0, +∞)`, but was `-1`');
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => log10(Number.NaN)).toThrow('Argument `value` must be `[0, +∞)`, but was `NaN`');
        });
    });
});

describe(log1p, () => {
    describe('when input is a positive number', () => {
        it('returns the natural logarithm of 1 plus the given value', () => {
            expect(log1p(1)).toBe(0.693_147_180_559_945_3);
            expect(log1p(2)).toBe(1.098_612_288_668_109_6);
        });
    });

    describe('when input is zero', () => {
        it('returns 0', () => {
            expect(log1p(0)).toBe(0);
        });
    });

    describe('when input is a negative number greater than -1', () => {
        it('returns the natural logarithm of 1 plus the given value', () => {
            expect(log1p(-0.5)).toBe(-0.693_147_180_559_945_3);
        });
    });

    describe('when input is -1', () => {
        it('returns -Infinity', () => {
            expect(log1p(-1)).toBe(Number.NEGATIVE_INFINITY);
        });
    });

    describe('when input is less than -1', () => {
        it('throws an exception', () => {
            expect(() => log1p(-1.1)).toThrow('Argument `value` must be `[-1, +∞)`, but was `-1.1`');
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => log1p(Number.NaN)).toThrow('Argument `value` must be `[-1, +∞)`, but was `NaN`');
        });
    });
});
