import { exception, invalidArgumentException } from '../../error/exception/exception';
import { PositiveNumber } from '../number/number';

/**
 * Returns the cube root of a given number.
 *
 * @throws Exception - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function cubeRoot(value: number): number {
    if (Number.isNaN(value)) {
        throw invalidArgumentException('value', 'number', String(value));
    }
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
 * Returns the square root of a given non-negative number.
 *
 * @throws Exception - if the given value is NaN or a negative number.
 *
 * @since v0.11.0
 */
export function squareRoot(value: PositiveNumber): number {
    if (Number.isNaN(value) || value < 0) {
        throw invalidArgumentException('value', '[0, +∞)', String(value));
    }
    return Math.sqrt(value);
}
