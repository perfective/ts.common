import { exception, invalidArgumentException } from '../../error/exception/exception';
import { Unary } from '../../function/function/unary';
import { isDefined } from '../../value/value';
import { isInfinity } from '../number/infinity';
import { assertIsNotNaN, PositiveNumber } from '../number/number';

/**
 * Returns the cube root of a given number.
 *
 * @throws Exception - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function cubeRoot(value: number): number {
    assertIsNotNaN(value);
    return Math.cbrt(value);
}

/**
 * Returns the L2 norm (Euclidean norm) of given numbers.
 *
 * @throws Exception - if any of the given values is NaN.
 *
 * @since v0.11.0
 */
export function l2norm(...values: number[]): number;

/**
 * Returns the L2 norm (Euclidean norm) of given numbers.
 *
 * @throws Exception - if any of the given values is NaN.
 *
 * @since v0.11.0
 */
export function l2norm(values: number[]): number;

export function l2norm(arg1: number[] | number, ...arg2: number[]): number {
    const values = Array.isArray(arg1) ? arg1 : [arg1, ...arg2];
    if (values.some(Number.isNaN)) {
        throw exception('Argument `values` must be `number[]`, but contains `NaN`');
    }
    return Math.hypot(...values);
}

/**
 * Returns the result of raising a base to a given exponent.
 * Returns -1 or 1 if the base is -1 or 1 and exponent is Infinity
 * (overrides the default behavior to match IEEE 754).
 *
 * @throws Exception - if the base or exponent is NaN.
 *
 * @since v0.11.0
 */
export function power(base: number, exponent: number): number;

/**
 * Returns the result of raising a base to a given exponent.
 * Returns -1 or 1 if the base is -1 or 1 and exponent is Infinity
 * (overrides the default behavior to match IEEE 754).
 *
 * @throws Exception - if the base or exponent is NaN.
 *
 * @since v0.11.0
 */
export function power([base, exponent]: [number, number]): number;

/**
 * Returns a function that raises the base to the given exponent.
 *
 * @throws Exception - if the base is NaN.
 *
 * @since v0.11.0
 */
export function power(base: number): (exponent: number) => number;

export function power(arg1: number | [number, number], arg2?: number): number | Unary<number, number> {
    const [base, exponent] = Array.isArray(arg1) ? arg1 : [arg1, arg2];

    assertIsNotNaN('base', base);

    // eslint-disable-next-line complexity, prefer-arrow/prefer-arrow-functions -- assertions, conflicts with func-style
    function powerOf(exponent: number): number {
        assertIsNotNaN('exponent', exponent);

        // Override the default behavior to match IEEE 754.
        if (isInfinity(exponent)
            && (base === 1 || base === -1)) {
            return base;
        }
        return base ** exponent;
    }

    if (isDefined(exponent)) {
        return powerOf(exponent);
    }
    return powerOf;
}

/**
 * Returns a function that raises a given base to the specified exponent.
 *
 * @throws Exception - if the base or exponent is NaN.
 *
 * @since v0.11.0
 */
export function powerOf(exponent: number): (base: number) => number {
    assertIsNotNaN('exponent', exponent);
    return (base: number) => power(base, exponent);
}

/**
 * Returns the square root of a given non-negative number.
 *
 * @throws Exception - if the given value is NaN or a negative number.
 *
 * @since v0.11.0
 */
export function squareRoot(value: PositiveNumber): number {
    assertIsNotNaN(value, '[0, +∞)');
    if (value < 0) {
        throw invalidArgumentException('value', '[0, +∞)', String(value));
    }
    return Math.sqrt(value);
}
