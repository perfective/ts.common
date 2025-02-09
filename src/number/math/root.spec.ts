import { describe, expect, it } from '@jest/globals';

import { cubeRoot, l2norm, squareRoot } from './root';

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

describe(l2norm, () => {
    describe('l2norm(...values)', () => {
        describe('when input contains valid numbers', () => {
            it('returns the L2 norm of the given values', () => {
                expect(l2norm(3, 4)).toBe(5);
                expect(l2norm(1, 2, 2)).toBe(3);
                expect(l2norm(0, 0, 0)).toBe(0);
            });
        });

        describe('when input contains Infinity', () => {
            it('returns Infinity', () => {
                expect(l2norm(Number.POSITIVE_INFINITY, 1)).toBe(Number.POSITIVE_INFINITY);
                expect(l2norm(1, Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
            });
        });

        describe('when input contains NaN', () => {
            it('throws an exception', () => {
                expect(() => l2norm(Number.NaN, 1))
                    .toThrow('Argument `values` must be `number[]`, but contains `NaN`');
                expect(() => l2norm(1, Number.NaN))
                    .toThrow('Argument `values` must be `number[]`, but contains `NaN`');
            });
        });
    });

    describe('l2norm(values)', () => {
        describe('when input contains valid numbers', () => {
            it('returns the L2 norm of the given values', () => {
                expect(l2norm([3, 4])).toBe(5);
                expect(l2norm([1, 2, 2])).toBe(3);
                expect(l2norm([0, 0, 0])).toBe(0);
            });
        });

        describe('when input contains Infinity', () => {
            it('returns Infinity', () => {
                expect(l2norm([Number.POSITIVE_INFINITY, 1])).toBe(Number.POSITIVE_INFINITY);
                expect(l2norm([1, Number.POSITIVE_INFINITY])).toBe(Number.POSITIVE_INFINITY);
            });
        });

        describe('when input contains NaN', () => {
            it('throws an exception', () => {
                expect(() => l2norm([Number.NaN, 1]))
                    .toThrow('Argument `values` must be `number[]`, but contains `NaN`');
                expect(() => l2norm([1, Number.NaN]))
                    .toThrow('Argument `values` must be `number[]`, but contains `NaN`');
            });
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
