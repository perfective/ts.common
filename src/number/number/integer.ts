/**
 * A positive natural number, zero, and negative integer number.
 *
 * @since v0.6.0
 */
export type Integer = number;

/**
 * Returns `true` if a given number is an integer.
 *
 * @since v0.6.0
 */
export function isInteger(value: number): value is Integer {
    return Number.isInteger(value);
}

/**
 * An integer from `-(2^53 - 1)` to `2^53 - 1`, inclusive.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger
 *
 * @since v0.6.0
 */
export type SafeInteger = number;

/**
 * Returns `true` if a given number is from `-(2^53 - 1)` to `2^53 - 1`, inclusive.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger
 *
 * @since v0.6.0
 */
export function isSafeInteger(value: number): value is SafeInteger {
    return Number.isSafeInteger(value);
}

/**
 * An integer that is greater than or equal to 0.
 *
 * @since v0.6.0
 */
export type NonNegativeInteger = number;

/**
 * Returns `true` if a given number is an integer and is greater than or equal to 0.
 *
 * @since v0.6.0
 */
export function isNonNegativeInteger(value: number): value is NonNegativeInteger {
    return value >= 0 && isInteger(value);
}

/**
 * An integer that is greater than 0.
 *
 * @since v0.6.0
 */
export type PositiveInteger = number;

/**
 * Returns `true` if a given number is an integer and is greater than 0.
 *
 * @since v0.6.0
 */
export function isPositiveInteger(value: number): value is PositiveInteger {
    return value > 0 && isInteger(value);
}

/**
 * An integer that is less than or equal to 0.
 *
 * @since v0.6.0
 */
export type NonPositiveInteger = number;

/**
 * Returns `true` if a given number is an integer and is less than or equal to 0.
 *
 * @since v0.6.0
 */
export function isNonPositiveInteger(value: number): value is NonPositiveInteger {
    return value <= 0 && isInteger(value);
}

/**
 * An integer that is less than 0.
 *
 * @since v0.6.0
 */
export type NegativeInteger = number;

/**
 * Returns `true` if a given number is an integer and is less than 0.
 *
 * @since v0.6.0
 */
export function isNegativeInteger(value: number): value is NegativeInteger {
    return value < 0 && isInteger(value);
}
