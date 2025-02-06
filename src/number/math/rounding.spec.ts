import { describe, expect, it } from '@jest/globals';

import { ceil, floor } from './rounding';

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

describe(floor, () => {
    describe('when input is a valid number', () => {
        it('returns the largest integer less than or equal to the given value', () => {
            expect(floor(0)).toBe(0);
            expect(floor(1.1)).toBe(1);
            expect(floor(-1.1)).toBe(-2);
            expect(floor(2.5)).toBe(2);
            expect(floor(-2.5)).toBe(-3);
        });
    });

    describe('when input is Infinity', () => {
        it('returns Infinity', () => {
            expect(floor(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });

    describe('when input is -Infinity', () => {
        it('returns -Infinity', () => {
            expect(floor(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => floor(Number.NaN))
                .toThrow('Argument `value` must be `number`, but was `NaN`');
        });
    });
});
