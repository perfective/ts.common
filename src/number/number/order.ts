import { Predicate } from '../../boolean/predicate/predicate';

/**
 * Creates a function that returns `true` if the input number is equal to a given `value`.
 *
 * @since v0.1.0
 */
export function isEqualTo(value: number): Predicate<number> {
    return (variable: number): boolean => variable === value;
}

/**
 * Creates a function that returns `true` if the input number is not equal to a given `value`.
 *
 * @since v0.1.0
 */
export function isNotEqualTo(value: number): Predicate<number> {
    return (variable: number): boolean => variable !== value;
}

/**
 * Creates a function that returns `true` if the input number is greater than a given `value`.
 *
 * @since v0.1.0
 */
export function isGreaterThan(value: number): Predicate<number> {
    return (variable: number): boolean => variable > value;
}

/**
 * Creates a function that returns `true` if the input number is greater than or equal to a given `value`.
 *
 * @since v0.1.0
 */
export function isGreaterThanOrEqualTo(value: number): Predicate<number> {
    return (variable: number): boolean => variable >= value;
}

/**
 * Creates a function that returns `true` if the input number is less than a given `value`.
 *
 * @since v0.1.0
 */
export function isLessThan(value: number): Predicate<number> {
    return (variable: number): boolean => variable < value;
}

/**
 * Creates a function that returns `true` if the input number is less than or equal to a given `value`.
 *
 * @since v0.1.0
 */
export function isLessThanOrEqualTo(value: number): Predicate<number> {
    return (variable: number): boolean => variable <= value;
}

/**
 * Returns a negative number if the first argument is less than the second argument.
 *
 * Can be used as a callback for the `Array.prototype.sort()` method to sort numbers in ascending order.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 *
 * @since v0.2.0
 */
export function ascending(a: number, b: number): number {
    return a - b;
}

/**
 * Returns a positive number if the first argument is greater than the second argument.
 *
 * Can be used as a callback for the `Array.prototype.sort()` method to sort numbers in descending order.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 *
 * @since v0.2.0
 */
export function descending(a: number, b: number): number {
    return b - a;
}
