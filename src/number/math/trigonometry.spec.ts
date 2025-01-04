import { describe, expect, it } from '@jest/globals';

import { arccos, arccosh, arcsin, arcsinh, arctan, arctan2 } from './trigonometry';

describe(arccos, () => {
    describe('when cosine is less than -1', () => {
        it('throws an exception', () => {
            expect(() => arccos(-1.1))
                .toThrow('Argument `cosine` must be `[-1, 1]`, but was `-1.1`');
        });
    });

    describe('when cosine is greater than 1', () => {
        it('throws an exception', () => {
            expect(() => arccos(1.1))
                .toThrow('Argument `cosine` must be `[-1, 1]`, but was `1.1`');
        });
    });

    describe('when cosine is NaN', () => {
        it('throws an exception', () => {
            expect(() => arccos(Number.NaN))
                .toThrow('Argument `cosine` must be `[-1, 1]`, but was `NaN`');
        });
    });

    describe('when cosine is between -1 and 1', () => {
        it('returns the inverse cosine of the given cosine', () => {
            expect(arccos(-1)).toBe(Math.PI);
            expect(arccos(0)).toBe(Math.PI / 2);
            expect(arccos(0.5)).toBe(1.047_197_551_196_597_9); // == Math.PI / 3
            expect(arccos(1)).toBe(0);
        });
    });
});

describe(arcsin, () => {
    describe('when sine is less than -1', () => {
        it('throws an exception', () => {
            expect(() => arcsin(-1.1)).toThrow('Argument `sine` must be `[-1, 1]`, but was `-1.1`');
        });
    });

    describe('when sine is greater than 1', () => {
        it('throws an exception', () => {
            expect(() => arcsin(1.1)).toThrow('Argument `sine` must be `[-1, 1]`, but was `1.1`');
        });
    });

    describe('when sine is NaN', () => {
        it('throws an exception', () => {
            expect(() => arcsin(Number.NaN)).toThrow('Argument `sine` must be `[-1, 1]`, but was `NaN`');
        });
    });

    describe('when sine is between -1 and 1', () => {
        it('returns the inverse sine of the given sine', () => {
            expect(arcsin(-1)).toBe(-Math.PI / 2);
            expect(arcsin(0)).toBe(0);
            expect(arcsin(0.5)).toBe(0.523_598_775_598_298_9); // == Math.PI / 6
            expect(arcsin(1)).toBe(Math.PI / 2);
        });
    });
});

describe(arccosh, () => {
    describe('when input is less than 1', () => {
        it('throws an exception', () => {
            expect(() => arccosh(0)).toThrow('Argument `value` must be `[1, +∞)`, but was `0`');
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => arccosh(Number.NaN)).toThrow('Argument `value` must be `[1, +∞)`, but was `NaN`');
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

describe(arcsinh, () => {
    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => arcsinh(Number.NaN))
                .toThrow('Argument `value` must be `(-∞, +∞)`, but was `NaN`');
        });
    });

    describe('when value is a number', () => {
        it('returns the inverse hyperbolic sine of the given value', () => {
            expect(arcsinh(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
            expect(arcsinh(-1)).toBe(-0.881_373_587_019_543);
            expect(arcsinh(0)).toBe(0);
            expect(arcsinh(1)).toBe(0.881_373_587_019_543);
            expect(arcsinh(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });
});

describe(arctan, () => {
    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => arctan(Number.NaN))
                .toThrow('Argument `value` must be `(-∞, +∞)`, but was `NaN`');
        });
    });

    describe('when input is a number', () => {
        it('returns the inverse tangent (in radians) of the given value', () => {
            expect(arctan(Number.NEGATIVE_INFINITY)).toBe(-Math.PI / 2);
            expect(arctan(-1)).toBeCloseTo(-0.785_398_163_397_448_3);
            expect(arctan(0)).toBe(0);
            expect(arctan(1)).toBeCloseTo(0.785_398_163_397_448_3);
            expect(arctan(Number.POSITIVE_INFINITY)).toBe(Math.PI / 2);
        });
    });
});

describe(arctan2, () => {
    describe('when y is NaN', () => {
        it('throws an exception', () => {
            expect(() => arctan2(Number.NaN, 1))
                .toThrow('Argument `y` must be `(-∞, +∞)`, but was `NaN`');
        });
    });

    describe('when x is NaN', () => {
        it('throws an exception', () => {
            expect(() => arctan2(1, Number.NaN))
                .toThrow('Argument `x` must be `(-∞, +∞)`, but was `NaN`');
        });
    });

    describe('when both x or y are 0', () => {
        it('returns 0', () => {
            expect(arctan2(0, 0)).toBe(0);
        });
    });

    describe('when either x or y are an Infinity', () => {
        it('returns the arctangent of y / x', () => {
            expect(arctan2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)).toBe(Math.PI / 4);
            expect(arctan2(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)).toBe(-Math.PI / 4);
            expect(arctan2(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY)).toBe(3 * Math.PI / 4);
            expect(arctan2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY)).toBe(-3 * Math.PI / 4);
        });
    });

    describe('when both x and y are valid numbers', () => {
        it.each([
            [0, 1, 0],
            [1, 0, Math.PI / 2],
            [0, -1, Math.PI],
            [-1, 0, -Math.PI / 2],
            [1, 1, Math.PI / 4],
            [-1, -1, -3 * Math.PI / 4],
        ])('returns the arctangent of y / x', (y, x, expected) => {
            expect(arctan2(y, x)).toBe(expected);
        });
    });
});
