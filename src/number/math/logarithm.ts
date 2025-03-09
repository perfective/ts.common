import { typeException } from '../../error/exception/exception';
import { assertIsNonNegativeNumber, assertIsNotNaN, NonNegativeNumber } from '../number/number';

/**
 * Returns the natural logarithm (base e) of a given non-negative number.
 *
 * @throws Exception - if the given value is NaN or less than zero.
 *
 * @since v0.11.0
 */
export function log(value: NonNegativeNumber): number {
    assertIsNonNegativeNumber(value);
    return Math.log(value);
}

/**
 * Returns the common (base 10) logarithm of a given non-negative number.
 *
 * @throws Exception - if the given value is NaN or less than zero.
 *
 * @since v0.11.0
 */
export function log10(value: NonNegativeNumber): number {
    assertIsNonNegativeNumber(value);
    return Math.log10(value);
}

/**
 * Returns the natural logarithm (base e) of 1 plus a given number.
 *
 * @throws Exception - if the given value is NaN or less than -1.
 *
 * @since v0.11.0
 */
export function log1p(value: number): number {
    assertIsNotNaN(value, '[-1, +∞)');
    if (value < -1) {
        throw typeException('value', '[-1, +∞)', String(value));
    }
    return Math.log1p(value);
}

/**
 * Returns the binary (base 2) logarithm of a given non-negative number.
 *
 * @throws Exception - if the given value is NaN or less than zero.
 *
 * @since v0.11.0
 */
export function log2(value: NonNegativeNumber): number {
    assertIsNonNegativeNumber(value);
    return Math.log2(value);
}
