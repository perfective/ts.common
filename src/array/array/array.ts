import { toLongest, toShortest } from '../../function/function/length';
import { Unary } from '../../function/function/unary';
import { isPresent } from '../../value/value';

import { isFirstOccurrence } from './filter';
import { Compare } from './lift';

export function array<T>(...elements: T[]): T[] {
    return Array.of(...elements);
}

export function arrayFromIterable<T>(elements: Iterable<T>): T[] {
    return Array.from(elements);
}

export function arrayFromArrayLike<T>(elements: ArrayLike<T>): T[] {
    return Array.from(elements);
}

export function copy<T>(array: T[]): T[] {
    return Array.from(array);
}

export function concatenated<T>(initial: T[], ...arrays: T[][]): T[] {
    return arrays.reduce((result, array) => result.concat(array), initial);
}

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

export function replicated<T>(argument1: T | number, argument2?: number): T[] | Unary<T, T[]> {
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#using_fill_to_populate_an_empty_array
    /* eslint-disable unicorn/new-for-builtins -- populate an empty array */
    if (isPresent(argument2)) {
        return Array(argument2).fill(argument1) as T[];
    }
    return (value: T): T[] => Array(argument1).fill(value) as T[];
    /* eslint-enable unicorn/new-for-builtins */
}

export function reversed<T>(array: T[]): T[] {
    return Array.from(array).reverse();
}

export function sorted<T>(order?: Compare<T>): Unary<T[], T[]>;
export function sorted<T>(array: T[], order?: Compare<T>): T[];
export function sorted<T>(args1?: T[] | Compare<T>, args2?: Compare<T>): Unary<T[], T[]> | T[] {
    if (Array.isArray(args1)) {
        return Array.from(args1).sort(args2);
    }
    return (array: T[]): T[] => Array.from(array).sort(args1);
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
