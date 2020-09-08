import { Unary } from '@perfective/fp';

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
    return [...array];
}

export function concatenated<T>(initial: T[], ...arrays: T[][]): T[] {
    return arrays.reduce((result, array) => result.concat(array), initial);
}

export function flatten<T>(arrays: T[][]): T[] {
    return arrays.reduce((result, array) => result.concat(array), []);
}

export function reversed<T>(array: T[]): T[] {
    return [...array].reverse();
}

export function sorted<T>(order?: Compare<T>): Unary<T[], T[]>;
export function sorted<T>(array: T[], order?: Compare<T>): T[];
export function sorted<T>(args1?: T[] | Compare<T>, args2?: Compare<T>): Unary<T[], T[]> | T[] {
    if (Array.isArray(args1)) {
        return [...args1].sort(args2);
    }
    return (array: T[]): T[] => [...array].sort(args1);
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
