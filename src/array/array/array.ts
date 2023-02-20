import { toLongest, toShortest } from '../../function/function/length';
import { Unary } from '../../function/function/unary';
import { isPresent } from '../../value/value';

import { isFirstOccurrence } from './filter';
import { Compare } from './lift';

export function array<T>(...elements: T[]): T[] {
    return Array.of(...elements);
}

/**
 * @see elements
 * @deprecated Since v0.9.0.
 */
export function arrayFromIterable<T>(elements: Iterable<T>): T[] {
    return Array.from(elements);
}

/**
 * @see elements
 * @deprecated Since v0.9.0.
 */
export function arrayFromArrayLike<T>(elements: ArrayLike<T>): T[] {
    return Array.from(elements);
}

/**
 * Creates an array of elements of a given {@linkcode Iterable} or an {@linkcode ArrayLike} {@linkcode value}.
 *
 * @since v0.9.0
 */
export function elements<T>(value: Iterable<T> | ArrayLike<T>): T[] {
    return Array.from(value);
}

export function copy<T>(array: T[]): T[] {
    return Array.from(array);
}

/**
 * Flattens a given array of arrays by concatenating them in order they are present.
 *
 * @since v0.9.0
 */
export function concatenated<T>(arrays: T[][]): T[];

/**
 * Concatenates given arrays into one array in order they are given.
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
 * @see concatenated
 * @deprecated Since v0.9.0. Use {@linkcode concatenated()}.
 */
export function flatten<T>(arrays: T[][]): T[] {
    return arrays.reduce((result, array) => result.concat(array), []);
}

export function intersection<T>(array1: T[], array2: T[]): T[] {
    const longest: T[] = [array1, array2].reduce(toLongest);
    const shortest: T[] = [array1, array2].reduce(toShortest);
    return longest
        .filter(value => shortest.includes(value))
        .filter(isFirstOccurrence);
}

/**
 * Creates a new array of the given value replicated the given number of times.
 *
 * @param value - A value to repeat.
 * @param length - A non-negative integer length of a new array.
 *
 * @throws RangeError - An error when the given length is a negative or a real number.
 */
export function replicated<T>(value: T, length: number): T[];

/**
 * Creates a new function that replicates a given value the given number of times.
 *
 * @param length - A non-negative integer length of a new array.
 *
 * @throws RangeError - An error when the given length is a negative or a real number.
 */
export function replicated<T>(length: number): Unary<T, T[]>;

export function replicated<T>(first: T | number, second?: number): T[] | Unary<T, T[]> {
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#using_fill_to_populate_an_empty_array
    /* eslint-disable unicorn/new-for-builtins -- populate an empty array */
    if (isPresent(second)) {
        return Array(second).fill(first) as T[];
    }
    return (value: T): T[] => Array(first).fill(value) as T[];
    /* eslint-enable unicorn/new-for-builtins */
}

export function reversed<T>(array: T[]): T[] {
    return Array.from(array).reverse();
}

export function sorted<T>(order?: Compare<T>): Unary<T[], T[]>;
export function sorted<T>(array: T[], order?: Compare<T>): T[];
export function sorted<T>(first?: T[] | Compare<T>, second?: Compare<T>): Unary<T[], T[]> | T[] {
    if (Array.isArray(first)) {
        return Array.from(first).sort(second);
    }
    return (array: T[]): T[] => Array.from(array).sort(first);
}

export function unique<T>(array: T[]): T[] {
    return array.filter(isFirstOccurrence);
}

/**
 * If value is an array, returns the original array; otherwise returns an array with that value.
 */
export function wrapped<T>(value: T | T[]): T[] {
    if (Array.isArray(value)) {
        return value;
    }
    return [value];
}

export function isArray<T, V = unknown>(value: T[] | V): value is T[] {
    return Array.isArray(value);
}

export function isNotArray<T, V = unknown>(value: T[] | V): value is V {
    return !Array.isArray(value);
}
