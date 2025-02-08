import { invalidArgumentException } from '../../error/exception/exception';
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
