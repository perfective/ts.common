import { Unary } from '../../function/function/unary';

/**
 * A nominal type (alias) for number of fraction digits after decimal point.
 *
 * @since v0.3.0
 */
export type Digits = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
| 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

/**
 * A nominal type (alias) for significant digits precision after decimal point.
 *
 * @since v0.3.0
 */
export type Precision = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
| 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;

/**
 * Creates a function that returns the input number in exponential notation
 * rounded to a given number of `fraction` digits.
 *
 * @since v0.3.0
 */
export function exponential(fraction: Digits): Unary<number, string> {
    return (value: number): string => value.toExponential(fraction);
}

/**
 * Creates a function that returns the input number in fixed-point notation with a given number of `fraction` digits.
 *
 * @since v0.3.0
 */
export function fixed(fraction: Digits): Unary<number, string> {
    return (value: number): string => value.toFixed(fraction);
}

/**
 * Creates a function that returns the input number in fixed-point or exponential notation
 * rounded to a given `precision`.
 *
 * @since v0.3.0
 */
export function precision(precision: Precision): Unary<number, string> {
    return (value: number): string => value.toPrecision(precision);
}
