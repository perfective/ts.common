import { describe, expect, it } from '@jest/globals';

import {
    arccos,
    arccosh,
    arcsin,
    arcsinh,
    arctan,
    arctan2,
    arctanh,
    cos,
    cosh,
    sin,
    sinh,
    tan,
    tanh,
} from './trigonometry';

describe(arccos, () => {
    describe('when cosine is less than -1', () => {
        it('throws an exception', () => {
            expect(() => arccos(-1.1))
                .toThrow('`cosine` must be `[-1, 1]`, but was `-1.1`');
        });
    });

    describe('when cosine is greater than 1', () => {
        it('throws an exception', () => {
            expect(() => arccos(1.1))
                .toThrow('`cosine` must be `[-1, 1]`, but was `1.1`');
        });
    });

    describe('when cosine is NaN', () => {
        it('throws an exception', () => {
            expect(() => arccos(Number.NaN))
                .toThrow('`cosine` must be `[-1, 1]`, but was `NaN`');
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
            expect(() => arcsin(-1.1)).toThrow('`sine` must be `[-1, 1]`, but was `-1.1`');
        });
    });

    describe('when sine is greater than 1', () => {
        it('throws an exception', () => {
            expect(() => arcsin(1.1)).toThrow('`sine` must be `[-1, 1]`, but was `1.1`');
        });
    });

    describe('when sine is NaN', () => {
        it('throws an exception', () => {
            expect(() => arcsin(Number.NaN)).toThrow('`sine` must be `[-1, 1]`, but was `NaN`');
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
            expect(() => arccosh(0)).toThrow('`value` must be `>= 1`, but was `0`');
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => arccosh(Number.NaN)).toThrow('`value` must be `>= 1`, but was `NaN`');
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
                .toThrow('`value` must be `number`, but was `NaN`');
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
                .toThrow('`value` must be `number`, but was `NaN`');
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
    const testCases = [
        [0, 0, 0],
        [0, 1, 0],
        [1, 0, Math.PI / 2],
        [0, -1, Math.PI],
        [-1, 0, -Math.PI / 2],
        [1, 1, Math.PI / 4],
        [-1, -1, -3 * Math.PI / 4],
        [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Math.PI / 4],
        [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, -Math.PI / 4],
        [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, 3 * Math.PI / 4],
        [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, -3 * Math.PI / 4],
    ];

    describe('arctan2(y, x)', () => {
        describe('when y is NaN', () => {
            it('throws an exception', () => {
                expect(() => arctan2(Number.NaN, 1))
                    .toThrow('`y` must be `number`, but was `NaN`');
            });
        });

        describe('when x is NaN', () => {
            it('throws an exception', () => {
                expect(() => arctan2(1, Number.NaN))
                    .toThrow('`x` must be `number`, but was `NaN`');
            });
        });

        describe('when both x and y are valid numbers', () => {
            it.each(testCases)('returns the arctangent of y / x', (y, x, expected) => {
                expect(arctan2(y, x)).toBe(expected);
            });
        });
    });

    describe('arctan2([y, x])', () => {
        describe('when y is NaN', () => {
            it('throws an exception', () => {
                expect(() => arctan2([Number.NaN, 1]))
                    .toThrow('`y` must be `number`, but was `NaN`');
            });
        });

        describe('when x is NaN', () => {
            it('throws an exception', () => {
                expect(() => arctan2([1, Number.NaN]))
                    .toThrow('`x` must be `number`, but was `NaN`');
            });
        });

        describe('when both x and y are valid numbers', () => {
            it.each(testCases)('returns the arctangent of y / x', (y, x, expected) => {
                expect(arctan2([y, x])).toBe(expected);
            });
        });
    });
});

describe(arctanh, () => {
    describe('when input is between -1 and 1', () => {
        it('returns the inverse hyperbolic tangent of the given value', () => {
            expect(arctanh(-0.5)).toBe(-0.549_306_144_334_054_8);
            expect(arctanh(0)).toBe(0);
            expect(arctanh(0.5)).toBe(0.549_306_144_334_054_8);
        });
    });

    describe('when input is less than or equal to -1', () => {
        it('throws an exception', () => {
            expect(() => arctanh(-1)).toThrow('`value` must be `(-1, 1)`, but was `-1`');
            expect(() => arctanh(-1.1)).toThrow('`value` must be `(-1, 1)`, but was `-1.1`');
        });
    });

    describe('when input is greater than or equal to 1', () => {
        it('throws an exception', () => {
            expect(() => arctanh(1)).toThrow('`value` must be `(-1, 1)`, but was `1`');
            expect(() => arctanh(1.1)).toThrow('`value` must be `(-1, 1)`, but was `1.1`');
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => arctanh(Number.NaN)).toThrow('`value` must be `(-1, 1)`, but was `NaN`');
        });
    });
});

describe(cos, () => {
    describe('when input is a valid angle in radians', () => {
        it('returns the cosine of the given angle', () => {
            expect(cos(0)).toBe(1);
            expect(cos(Math.PI / 2)).toBeCloseTo(0);
            expect(cos(Math.PI)).toBe(-1);
            expect(cos((3 * Math.PI) / 2)).toBeCloseTo(0);
            expect(cos(2 * Math.PI)).toBe(1);
        });
    });

    describe('when input is Infinity', () => {
        it('throws an exception', () => {
            expect(() => cos(Number.POSITIVE_INFINITY))
                .toThrow('`angle` must be `FiniteNumber`, but was `Infinity`');
            expect(() => cos(Number.NEGATIVE_INFINITY))
                .toThrow('`angle` must be `FiniteNumber`, but was `-Infinity`');
            // eslint-disable-next-line unicorn/prefer-number-properties -- testing
            expect(() => cos(Infinity))
                .toThrow('`angle` must be `FiniteNumber`, but was `Infinity`');
            // eslint-disable-next-line unicorn/prefer-number-properties -- testing
            expect(() => cos(-Infinity))
                .toThrow('`angle` must be `FiniteNumber`, but was `-Infinity`');
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => cos(Number.NaN))
                .toThrow('`angle` must be `FiniteNumber`, but was `NaN`');
        });
    });
});

describe(cosh, () => {
    describe('when input is 1 or more', () => {
        it('returns the hyperbolic cosine of the given value', () => {
            expect(cosh(1)).toBe(1.543_080_634_815_243_7);
            expect(cosh(Math.PI)).toBe(11.591_953_275_521_519);
            expect(cosh(0)).toBe(1);
        });
    });

    describe('when input is a positive infinity', () => {
        it('returns Infinity', () => {
            expect(cosh(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
            // eslint-disable-next-line unicorn/prefer-number-properties -- testing
            expect(cosh(Infinity)).toBe(Infinity);
        });
    });

    describe('when input is a negative infinity', () => {
        it('returns Infinity', () => {
            expect(cosh(Number.NEGATIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => cosh(Number.NaN))
                .toThrow('`value` must be `number`, but was `NaN`');
        });
    });
});

describe(sin, () => {
    describe('when input is a valid angle in radians', () => {
        it('returns the sine of the given angle', () => {
            expect(sin(0)).toBe(0);
            expect(sin(Math.PI / 2)).toBe(1);
            expect(sin(Math.PI)).toBeCloseTo(0);
            expect(sin((3 * Math.PI) / 2)).toBe(-1);
            expect(sin(2 * Math.PI)).toBeCloseTo(0);
        });
    });

    describe('when input is Infinity', () => {
        it('throws an exception', () => {
            expect(() => sin(Number.POSITIVE_INFINITY))
                .toThrow('`angle` must be `FiniteNumber`, but was `Infinity`');
            expect(() => sin(Number.NEGATIVE_INFINITY))
                .toThrow('`angle` must be `FiniteNumber`, but was `-Infinity`');
            // eslint-disable-next-line unicorn/prefer-number-properties -- testing
            expect(() => sin(Infinity))
                .toThrow('`angle` must be `FiniteNumber`, but was `Infinity`');
            // eslint-disable-next-line unicorn/prefer-number-properties -- testing
            expect(() => sin(-Infinity))
                .toThrow('`angle` must be `FiniteNumber`, but was `-Infinity`');
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => sin(Number.NaN))
                .toThrow('`angle` must be `FiniteNumber`, but was `NaN`');
        });
    });
});

describe(sinh, () => {
    describe('when input is a valid number', () => {
        it('returns the hyperbolic sine of the given value', () => {
            expect(sinh(0)).toBe(0);
            expect(sinh(1)).toBe(1.175_201_193_643_801_4);
            expect(sinh(-1)).toBe(-1.175_201_193_643_801_4);
            expect(sinh(Math.PI)).toBe(11.548_739_357_257_748);
        });
    });

    describe('when input is Infinity', () => {
        it('returns Infinity', () => {
            expect(sinh(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });

    describe('when input is -Infinity', () => {
        it('returns -Infinity', () => {
            expect(sinh(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => sinh(Number.NaN))
                .toThrow('`value` must be `number`, but was `NaN`');
        });
    });
});

describe(tan, () => {
    describe('when input is a valid angle in radians', () => {
        it('returns the tangent of the given angle', () => {
            expect(tan(0)).toBe(0);
            expect(tan(Math.PI / 4)).toBeCloseTo(1);
            expect(tan(Math.PI)).toBeCloseTo(0);
            expect(tan((3 * Math.PI) / 4)).toBeCloseTo(-1);
        });
    });

    describe('when input is Math.PI / 2', () => {
        it('returns a finite number', () => {
            // Due to floating point precision issues
            expect(tan(Math.PI / 2)).toBeCloseTo(16_331_239_353_195_370);
        });
    });

    describe('when input is Infinity', () => {
        it('throws an exception', () => {
            expect(() => tan(Number.POSITIVE_INFINITY))
                .toThrow('`angle` must be `FiniteNumber`, but was `Infinity`');
            expect(() => tan(Number.NEGATIVE_INFINITY))
                .toThrow('`angle` must be `FiniteNumber`, but was `-Infinity`');
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => tan(Number.NaN))
                .toThrow('`angle` must be `FiniteNumber`, but was `NaN`');
        });
    });
});

describe(tanh, () => {
    describe('when input is a valid number', () => {
        it('returns the hyperbolic tangent of the given value', () => {
            expect(tanh(0)).toBe(0);
            expect(tanh(1)).toBeCloseTo(0.761_594_155_955_764_9);
            expect(tanh(-1)).toBeCloseTo(-0.761_594_155_955_764_9);
            expect(tanh(Math.PI)).toBeCloseTo(0.996_272_076_220_75);
        });
    });

    describe('when input is Infinity', () => {
        it('returns 1', () => {
            expect(tanh(Number.POSITIVE_INFINITY)).toBe(1);
        });
    });

    describe('when input is -Infinity', () => {
        it('returns -1', () => {
            expect(tanh(Number.NEGATIVE_INFINITY)).toBe(-1);
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => tanh(Number.NaN))
                .toThrow('`value` must be `number`, but was `NaN`');
        });
    });
});
