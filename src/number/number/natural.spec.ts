import { describe, expect, it } from '@jest/globals';

import { isNatural } from './natural';

describe(isNatural, () => {
    describe('when value is a positive integer', () => {
        it('returns true', () => {
            expect(isNatural(1))
                .toBe(true);
        });
    });

    describe('when value is zero', () => {
        it('returns true', () => {
            expect(isNatural(0))
                .toBe(true);
        });
    });

    describe('when value is a maximum safe integer', () => {
        it('returns true', () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard testing
            expect(isNatural(Number.MAX_SAFE_INTEGER))
                .toBe(true);
        });
    });

    describe('when value is maximum value', () => {
        it('returns true', () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard testing
            expect(isNatural(Number.MAX_VALUE))
                .toBe(true);
        });
    });

    describe('when value is a positive infinity', () => {
        it('returns false', () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard testing
            expect(isNatural(Number.POSITIVE_INFINITY))
                .toBe(false);
        });
    });

    describe('when value is a negative integer', () => {
        it('returns false', () => {
            expect(isNatural(-1))
                .toBe(false);
        });
    });

    describe('when value is a float', () => {
        it('returns false', () => {
            expect(isNatural(3.14))
                .toBe(false);
        });
    });

    describe('when value is NaN', () => {
        it('returns false', () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard testing
            expect(isNatural(Number.NaN))
                .toBe(false);
        });
    });

    describe('when value is not a number', () => {
        it('returns false', () => {
            expect(isNatural('3'))
                .toBe(false);
            expect(isNatural(true))
                .toBe(false);
            expect(isNatural(false))
                .toBe(false);
        });
    });
});
