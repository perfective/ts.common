import { describe, expect, it } from '@jest/globals';

import { cubeRoot, l2norm, power, powerOf, squareRoot } from './algebraic';

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
                .toThrow('`value` must be `number`, but was `NaN`');
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
                    .toThrow('`values` must be `number[]`, but contains `NaN`');
                expect(() => l2norm(1, Number.NaN))
                    .toThrow('`values` must be `number[]`, but contains `NaN`');
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
                    .toThrow('`values` must be `number[]`, but contains `NaN`');
                expect(() => l2norm([1, Number.NaN]))
                    .toThrow('`values` must be `number[]`, but contains `NaN`');
            });
        });
    });
});

describe(power, () => {
    const infinityTests = [
        [0, Number.POSITIVE_INFINITY, 0],
        [-0, Number.POSITIVE_INFINITY, 0],
        [0, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
        [-0, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
        [0.5, Number.POSITIVE_INFINITY, 0],
        [-0.5, Number.POSITIVE_INFINITY, 0],
        [0.5, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
        [-0.5, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
        [1, Number.POSITIVE_INFINITY, 1],
        [-1, Number.POSITIVE_INFINITY, -1],
        [1, Number.NEGATIVE_INFINITY, 1],
        [-1, Number.NEGATIVE_INFINITY, -1],
        [2, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
        [-2, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
        [2, Number.NEGATIVE_INFINITY, 0],
        [-2, Number.NEGATIVE_INFINITY, 0],
    ];

    describe('power(base, exponent)', () => {
        describe('when base and exponent are valid numbers', () => {
            it('returns the result of raising the base to the given exponent', () => {
                expect(power(2, 3)).toBe(8);
                expect(power(5, 0)).toBe(1);
                expect(power(2, -2)).toBe(0.25);
                expect(power(1, 0)).toBe(1);
                expect(power(1, 5)).toBe(1);
            });
        });

        describe('when exponent is Infinity', () => {
            it.each(infinityTests)('returns the base for base %d and exponent %d', (base, exponent, expected) => {
                expect(power(base, exponent)).toBe(expected);
            });
        });

        describe('when base is NaN', () => {
            it('throws an exception', () => {
                expect(() => power(Number.NaN, 2))
                    .toThrow('`base` must be `number`, but was `NaN`');
            });
        });

        describe('when exponent is NaN', () => {
            it('throws an exception', () => {
                expect(() => power(2, Number.NaN))
                    .toThrow('`exponent` must be `number`, but was `NaN`');
            });
        });
    });

    describe('power([base, exponent])', () => {
        describe('when base and exponent are valid numbers', () => {
            it('returns the result of raising the base to the given exponent', () => {
                expect(power([2, 3])).toBe(8);
                expect(power([5, 0])).toBe(1);
                expect(power([2, -2])).toBe(0.25);
                expect(power([1, 0])).toBe(1);
                expect(power([1, 5])).toBe(1);
            });
        });

        describe('when exponent is Infinity', () => {
            it.each(infinityTests)('returns the base for base %d and exponent %d', (base, exponent, expected) => {
                expect(power([base, exponent])).toBe(expected);
            });
        });

        describe('when base is NaN', () => {
            it('throws an exception', () => {
                expect(() => power([Number.NaN, 2]))
                    .toThrow('`base` must be `number`, but was `NaN`');
            });
        });

        describe('when exponent is NaN', () => {
            it('throws an exception', () => {
                expect(() => power([2, Number.NaN]))
                    .toThrow('`exponent` must be `number`, but was `NaN`');
            });
        });
    });

    describe('power(base)(exponent)', () => {
        describe('when base and exponent are valid numbers', () => {
            it('returns the result of raising the base to the given exponent', () => {
                expect(power(2)(3)).toBe(8);
                expect(power(5)(0)).toBe(1);
                expect(power(2)(-2)).toBe(0.25);
                expect(power(1)(0)).toBe(1);
                expect(power(1)(5)).toBe(1);
            });
        });

        describe('when exponent is Infinity', () => {
            it.each(infinityTests)('returns the base for base %d and exponent %d', (base, exponent, expected) => {
                expect(power(base)(exponent)).toBe(expected);
            });
        });

        describe('when base is NaN', () => {
            it('throws an exception', () => {
                expect(() => power(Number.NaN)(2))
                    .toThrow('`base` must be `number`, but was `NaN`');
            });
        });

        describe('when exponent is NaN', () => {
            it('throws an exception', () => {
                expect(() => power(2)(Number.NaN))
                    .toThrow('`exponent` must be `number`, but was `NaN`');
            });
        });
    });
});

describe(powerOf, () => {
    describe('when exponent is a valid number', () => {
        it('returns a function that raises the base to the given exponent', () => {
            expect(powerOf(2)(3)).toBe(9);
            expect(powerOf(0)(3)).toBe(1);
            expect(powerOf(-1)(2)).toBe(0.5);
        });
    });

    describe('when base is NaN', () => {
        it('throws an exception', () => {
            expect(() => powerOf(2)(Number.NaN))
                .toThrow('`base` must be `number`, but was `NaN`');
        });
    });

    describe('when exponent is NaN', () => {
        it('throws an exception', () => {
            expect(() => powerOf(Number.NaN))
                .toThrow('`exponent` must be `number`, but was `NaN`');
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
                .toThrow('`value` must be `>= 0`, but was `NaN`');
        });
    });

    describe('when input is a negative number', () => {
        it('throws an exception', () => {
            expect(() => squareRoot(-1))
                .toThrow('`value` must be `>= 0`, but was `-1`');
        });
    });
});
