import { invalidArgumentException } from '../../error/exception/exception';

/**
 * Returns the natural logarithm (base e) of a given non-negative number.
 *
 * @throws Exception - if the given value is NaN or less than zero.
 *
 * @since v0.11.0
 */
export function log(value: number): number {
    if (Number.isNaN(value) || value < 0) {
        throw invalidArgumentException('value', '[0, +∞)', String(value));
    }
    return Math.log(value);
}

/**
 * Returns the common (base 10) logarithm of a given non-negative number.
 *
 * @throws Exception - if the given value is NaN or less than zero.
 *
 * @since v0.11.0
 */
export function log10(value: number): number {
    if (Number.isNaN(value) || value < 0) {
        throw invalidArgumentException('value', '[0, +∞)', String(value));
    }
    return Math.log10(value);
}
