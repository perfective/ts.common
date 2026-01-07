import { assertIsNotNaN } from '../number/number';

/**
 * Returns the integer nearest to a given number.
 * Returns `Infinity` if the given value is `Infinity`.
 * Returns `-Infinity` if the given value is `-Infinity`.
 *
 * @throws {Exception} - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function rounded(value: number): number {
    assertIsNotNaN(value);
    return Math.round(value);
}

/**
 * Returns the largest integer less than or equal to a given number.
 * Returns `Infinity` if the given value is `Infinity`.
 * Returns `-Infinity` if the given value is `-Infinity`.
 *
 * @throws {Exception} - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function roundedDown(value: number): number {
    assertIsNotNaN(value);
    return Math.floor(value);
}

/**
 * Returns the smallest integer greater than or equal to a given number.
 * Returns `Infinity` if the given value is `Infinity`.
 * Returns `-Infinity` if the given value is `-Infinity`.
 *
 * @throws {Exception} - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function roundedUp(value: number): number {
    assertIsNotNaN(value);
    return Math.ceil(value);
}

/**
 * Returns the nearest 32-bit single precision float representation of a number.
 *
 * @throws {Exception} - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function roundedToFloat32(value: number): number {
    assertIsNotNaN(value);
    return Math.fround(value);
}

/**
 * Returns a floating-point number truncated to its integer part.
 *
 * @throws {Exception} - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function truncated(value: number): number {
    assertIsNotNaN(value);
    return Math.trunc(value);
}
