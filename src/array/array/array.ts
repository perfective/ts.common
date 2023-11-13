import { toLongest, toShortest } from '../../function/function/length';
import { Unary } from '../../function/function/unary';
import { isPresent } from '../../value/value';

import { isFirstOccurrence } from './filter';
import { Compare } from './lift';

/**
 * Creates an array from given `elements`.
 *
 * @since v0.2.0
 */
export function array<T>(...elements: T[]): T[] {
    return Array.of(...elements);
}

/**
 * Creates an array from elements of a given {@linkcode Iterable} or an {@linkcode ArrayLike} `value`.
 *
 * @since v0.9.0
 */
export function elements<T>(value: Iterable<T> | ArrayLike<T>): T[] {
    return Array.from(value);
}

/**
 * Creates a shallow copy of a given `array`.
 *
 * @since v0.2.0
 */
export function copy<T>(array: T[]): T[] {
    return Array.from(array);
}

/**
 * Concatenates given `arrays` in order they are given.
 *
 * @since v0.9.0
 */
export function concatenated<T>(arrays: T[][]): T[];

/**
 * Concatenates given arrays in order they are given.
 *
 * @since v0.1.0
 */
export function concatenated<T>(initial: T[], ...arrays: T[][]): T[];

export function concatenated<T>(first: T[], ...second: T[][]): T[] {
    const hasRest = Array.isArray(second) && second.length > 0;
    const [initial, arrays] = hasRest ? [first, second] : [[], first as T[][]];
    return arrays.reduce((result, array) => result.concat(array), initial);
}

/**
 * Returns an array of unique elements that are included in both given arrays.
 *
 * @since v0.4.0
 */
export function intersection<T>(array1: T[], array2: T[]): T[] {
    const longest: T[] = [array1, array2].reduce(toLongest);
    const shortest: T[] = [array1, array2].reduce(toShortest);
    return longest
        .filter(value => shortest.includes(value))
        .filter(isFirstOccurrence);
}

/**
 * Creates an array with a given `value` replicated a given `count` of times.
 *
 * @param value - A value to repeat.
 * @param count - A non-negative integer length of a new array.
 *
 * @throws RangeError - An error when the given length is a negative or a real number.
 *
 * @since v0.2.1
 */
export function replicated<T>(value: T, count: number): T[];

/**
 * Creates a callback that replicates the input `value` a given `count` of times.
 *
 * @param count - A non-negative integer length of a new array.
 *
 * @throws RangeError - An error when the given length is a negative or a real number.
 *
 * @since v0.2.1
 */
export function replicated<T>(count: number): Unary<T, T[]>;

export function replicated<T>(first: T | number, second?: number): T[] | Unary<T, T[]> {
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#using_fill_to_populate_an_empty_array
    /* eslint-disable unicorn/new-for-builtins -- populate an empty array */
    if (isPresent(second)) {
        return Array(second).fill(first) as T[];
    }
    return (value: T): T[] => Array(first).fill(value) as T[];
    /* eslint-enable unicorn/new-for-builtins */
}

/**
 * Creates a shallow copy of a given `array` with elements in reversed order.
 *
 * @since v0.2.0
 */
export function reversed<T>(array: T[]): T[] {
    return Array.from(array).reverse();
}

/**
 * Creates a callback to return a shallow copy of the input array sorted with a given `order` callback.
 *
 * @since v0.2.0
 */
export function sorted<T>(order?: Compare<T>): Unary<T[], T[]>;

/**
 * Returns a shallow copy of a given `array` sorted with a given `order` callback.
 *
 * @since v0.2.0
 */
export function sorted<T>(array: T[], order?: Compare<T>): T[];

export function sorted<T>(first?: T[] | Compare<T>, second?: Compare<T>): Unary<T[], T[]> | T[] {
    if (Array.isArray(first)) {
        return Array.from(first).sort(second);
    }
    return (array: T[]): T[] => Array.from(array).sort(first);
}

/**
 * Returns an array with only the first occurrence of each value in a given `array`.
 *
 * TODO(https://github.com/perfective/ts.common/issues/25): Rewrite using `Set`.
 *
 * @since v0.2.0
 */
export function unique<T>(array: T[]): T[] {
    return array.filter(isFirstOccurrence);
}

/**
 * Returns an array that consists only of a given `value`.
 *
 * If a given `value` is an array, returns the original `value`.
 *
 * @since v0.2.1
 */
export function wrapped<T>(value: T | T[]): T[] {
    if (Array.isArray(value)) {
        return value;
    }
    return [value];
}

/**
 * Returns `true` if a given `value` is an array.
 *
 * Otherwise, returns `false`.
 *
 * @since v0.2.0
 */
export function isArray<T, V = unknown>(value: T[] | V): value is T[] {
    return Array.isArray(value);
}

/**
 * Returns `true` if a given `value` is not an array.
 *
 * Otherwise, returns `false`.
 *
 * @since v0.2.0
 */
export function isNotArray<T, V = unknown>(value: T[] | V): value is V {
    return !Array.isArray(value);
}
