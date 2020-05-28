import { Predicate, Unary } from '@perfective/fp';

export function concat<T>(items: T[]): Unary<T[], T[]> {
    return (array: T[]): T[] => array.concat(items);
}

export function includes<T>(searchElement: T, fromIndex?: number): Predicate<T[]> {
    return (array: T[]): boolean => array.includes(searchElement, fromIndex);
}

export function slice<T>(start?: number, end?: number): Unary<T[], T[]> {
    return (array: T[]): T[] => array.slice(start, end);
}
