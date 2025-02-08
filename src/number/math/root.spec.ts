import { describe, expect, it } from '@jest/globals';

import { cubeRoot, squareRoot } from './root';

describe(cubeRoot, () => {
    describe('when input is a positive number', () => {
        it('returns the cube root of the given value', () => {
            expect(cubeRoot(8)).toBe(2);
            expect(cubeRoot(27)).toBe(3);
            expect(cubeRoot(1)).toBe(1);
        });
    });

    describe('when input is a negative number', () => {
        it('returns the cube root of the given value', () => {
            expect(cubeRoot(-8)).toBe(-2);
            expect(cubeRoot(-27)).toBe(-3);
            expect(cubeRoot(-1)).toBe(-1);
        });
    });

    describe('when input is zero', () => {
        it('returns 0', () => {
            expect(cubeRoot(0)).toBe(0);
        });
    });

    describe('when input is Infinity', () => {
        it('returns Infinity', () => {
            expect(cubeRoot(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });

    describe('when input is -Infinity', () => {
        it('returns -Infinity', () => {
            expect(cubeRoot(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => cubeRoot(Number.NaN))
                .toThrow('Argument `value` must be `number`, but was `NaN`');
        });
    });
});

describe(squareRoot, () => {
    describe('when input is a positive number', () => {
        it('returns the square root of the given value', () => {
            expect(squareRoot(4)).toBe(2);
            expect(squareRoot(9)).toBe(3);
            expect(squareRoot(1)).toBe(1);
        });
    });

    describe('when input is zero', () => {
        it('returns 0', () => {
            expect(squareRoot(0)).toBe(0);
        });
    });

    describe('when input is Infinity', () => {
        it('returns Infinity', () => {
            expect(squareRoot(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => squareRoot(Number.NaN))
                .toThrow('Argument `value` must be `[0, +∞)`, but was `NaN`');
        });
    });

    describe('when input is a negative number', () => {
        it('throws an exception', () => {
            expect(() => squareRoot(-1))
                .toThrow('Argument `value` must be `[0, +∞)`, but was `-1`');
        });
    });
});
