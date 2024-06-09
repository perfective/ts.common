import { isNotNumber } from '../number/number';

/**
 * Returns the result of addition of the given numbers.
 *
 * @since v0.4.0
 */
export function sum(augend: number, addend: number): number {
    return augend + addend;
}

/**
 * Returns the result of subtraction of a given `subtrahend` from a given `minuend`.
 *
 * @since v0.4.0
 */
export function difference(minuend: number, subtrahend: number): number {
    return minuend - subtrahend;
}

/**
 * Returns the result of multiplication of given numbers.
 *
 * @since v0.4.0
 */
export function product(multiplier: number, multiplicand: number): number {
    return multiplier * multiplicand;
}

/**
 * Returns the result of division of a given `dividend` by a given `divisor`.
 *
 * @since v0.4.0
 */
export function quotient(dividend: number, divisor: number): number {
    return dividend / divisor;
}

/**
 * Returns the remainder of division of a given `dividend` by a given `divisor`.
 *
 * @since v0.4.0
 */
export function remainder(dividend: number, divisor: number): number {
    return dividend % divisor;
}

/**
 * Returns the absolute value of a given number.
 *
 * @throws {TypeError} If the given value is not a number.
 *
 * @since v0.11.0
 */
export function absolute(value: number): number {
    // Runtime check to avoid NaN and input coercion to a number.
    if (isNotNumber(value)) {
        throw new TypeError('Value must be a number.');
    }
    return Math.abs(value);
}
