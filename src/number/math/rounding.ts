import { invalidArgumentException } from '../../error/exception/exception';

/**
 * Returns the smallest integer greater than or equal to a given number.
 * Returns `Infinity` if the given value is `Infinity`.
 * Returns `-Infinity` if the given value is `-Infinity`.
 *
 * @throws Exception - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function ceil(value: number): number {
    if (Number.isNaN(value)) {
        throw invalidArgumentException('value', 'number', String(value));
    }
    return Math.ceil(value);
}

/**
 * Returns the largest integer less than or equal to a given number.
 * Returns `Infinity` if the given value is `Infinity`.
 * Returns `-Infinity` if the given value is `-Infinity`.
 *
 * @throws Exception - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function floor(value: number): number {
    if (Number.isNaN(value)) {
        throw invalidArgumentException('value', 'number', String(value));
    }
    return Math.floor(value);
}

/**
 * Returns the nearest 32-bit single precision float representation of a number.
 *
 * @throws Exception - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function floatRound(value: number): number {
    if (Number.isNaN(value)) {
        throw invalidArgumentException('value', 'number', String(value));
    }
    return Math.fround(value);
}
