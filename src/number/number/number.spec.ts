import { describe, expect, it } from '@jest/globals';

import { isNotNumber, isNumber, negative } from './number';

describe(isNumber, () => {
    describe('when value is a number', () => {
        it('returns true', () => {
            expect(isNumber(3.14)).toBe(true);
        });
    });

    describe('when value is not a number', () => {
        it('returns false', () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard testing
            expect(isNumber(Number.NaN)).toBe(false);
            expect(isNumber('3.14')).toBe(false);
            expect(isNumber(true)).toBe(false);
        });
    });
});

describe(isNotNumber, () => {
    describe('when value is a number', () => {
        it('returns false', () => {
            expect(isNotNumber(3.14)).toBe(false);
        });
    });

    describe('when value is not a number', () => {
        it('returns true', () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard testing
            expect(isNotNumber(Number.NaN)).toBe(true);
            expect(isNotNumber('3.14')).toBe(true);
            expect(isNotNumber(false)).toBe(true);
        });
    });
});

describe(negative, () => {
    describe('when given a zero', () => {
        it('returns 0', () => {
            expect(negative(0)).toBe(0);
            expect(negative(-0)).toBe(0);
        });
    });

    describe('when given a positive value', () => {
        it('returns a negative value', () => {
            expect(negative(3.14)).toBe(-3.14);
            expect(negative(-42)).toBe(42);
        });
    });

    describe('when given a negative value', () => {
        it('returns a positive value', () => {
            expect(negative(-42)).toBe(42);
        });
    });

    describe('when given an NEGATIVE_INFINITY', () => {
        it('returns POSITIVE_INFINITY', () => {
            expect(negative(Number.NEGATIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });

    describe('when given an POSITIVE_INFINITY', () => {
        it('returns NEGATIVE_INFINITY', () => {
            expect(negative(Number.POSITIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
        });
    });

    describe('when given NaN', () => {
        it('returns NaN', () => {
            expect(negative(Number.NaN)).toBe(Number.NaN);
        });
    });
});
