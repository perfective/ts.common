import { describe, expect, it } from '@jest/globals';

import { isInfinity, isNotInfinity } from './infinity';

describe(isInfinity, () => {
    describe('when given a positive infinity', () => {
        it('returns true', () => {
            // eslint-disable-next-line unicorn/prefer-number-properties -- test value
            expect(isInfinity(Infinity)).toBe(true);
            expect(isInfinity(Number.POSITIVE_INFINITY)).toBe(true);
        });
    });

    describe('when given a negative infinity', () => {
        it('returns true', () => {
            // eslint-disable-next-line unicorn/prefer-number-properties -- test value
            expect(isInfinity(-Infinity)).toBe(true);
            expect(isInfinity(Number.NEGATIVE_INFINITY)).toBe(true);
        });
    });

    describe('when given NaN', () => {
        it('returns true', () => {
            expect(isInfinity(Number.NaN)).toBe(false);
        });
    });

    describe('when given a number', () => {
        it('returns false', () => {
            expect(isInfinity(3.14)).toBe(false);
        });
    });
});

describe(isNotInfinity, () => {
    describe('when given a positive infinity', () => {
        it('returns false', () => {
            // eslint-disable-next-line unicorn/prefer-number-properties -- test value
            expect(isNotInfinity(Infinity)).toBe(false);
            expect(isNotInfinity(Number.POSITIVE_INFINITY)).toBe(false);
        });
    });

    describe('when given a negative infinity', () => {
        it('returns false', () => {
            // eslint-disable-next-line unicorn/prefer-number-properties -- test value
            expect(isNotInfinity(-Infinity)).toBe(false);
            expect(isNotInfinity(Number.NEGATIVE_INFINITY)).toBe(false);
        });
    });

    describe('when given NaN', () => {
        it('returns true', () => {
            expect(isNotInfinity(Number.NaN)).toBe(true);
        });
    });

    describe('when given a number', () => {
        it('returns true', () => {
            expect(isNotInfinity(3.14)).toBe(true);
        });
    });
});
