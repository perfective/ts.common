import { Unary } from '@perfective/fp';

import { Compare } from './lift';
import { isPresent } from '@perfective/value';

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
    if (isPresent(argument2)) {
        /* eslint-disable @typescript-eslint/no-unsafe-assignment -- spread array to allocate elements */
        /* eslint-disable array-func/prefer-array-from -- custom use of new Array to  */
        return [...new Array(argument2)].map<T>(() => argument1 as T);
        /* eslint-enable array-func/prefer-array-from */
        /* eslint-enable @typescript-eslint/no-unsafe-assignment */
    }
    return (value: T): T[] => [...new Array(argument1)].map(() => value);
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
    return array.filter((value: T, index: number, values: T[]) => index === values.indexOf(value));
}

export function isArray<T, V = unknown>(value: T[] | V): value is T[] {
    return Array.isArray(value);
}

export function isNotArray<T, V = unknown>(value: T[] | V): value is V {
    return !Array.isArray(value);
}

export function isEmpty<T>(array: T[]): boolean {
    return array.length === 0;
}

export function isNotEmpty<T>(array: T[]): boolean {
    return array.length > 0;
}

export function length<T>(array: T[]): number {
    return array.length;
}
