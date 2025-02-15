import { assertIsNotNaN, NonNegativeNumber } from '../number/number';

/**
 * Returns Euler's number `e` raised to the power of the given number.
 *
 * @throws Exception - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function exp(value: number): NonNegativeNumber {
    assertIsNotNaN(value);
    return Math.exp(value);
}

/**
 * Returns Euler's number `e` raised to the power of the given number minus 1.
 *
 * @throws Exception - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function expm1(value: number): number {
    assertIsNotNaN(value);
    return Math.expm1(value);
}
