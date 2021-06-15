import { Predicate } from '../../boolean/predicate/predicate';
import { Unary } from '../../function/function/unary';
import { isDefined } from '../../value/value/type-guard';

export function concat<T>(...items: ConcatArray<T>[]): Unary<T[], T[]> {
    return (array: T[]): T[] => array.concat(...items);
}

export function copyWithin<T>(target: number, start: number = 0, end?: number): Unary<T[], T[]> {
    return (array: T[]): T[] => array.copyWithin(target, start, end);
}

export function entries<T>(array: T[]): IterableIterator<[number, T]> {
    return array.entries();
}

export function every<T>(condition: Predicate<T>): Predicate<T[]> {
    return (array: T[]): boolean => array.every(condition);
}

export function fill<T>(value: T, start?: number, end?: number): Unary<T[], T[]> {
    return (array: T[]): T[] => array.fill(value, start, end);
}

export function filter<T>(condition: Predicate<T>): Unary<T[], T[]> {
    return (array: T[]): T[] => array.filter(condition);
}

export function find<T>(condition: Predicate<T>): Unary<T[], T | undefined> {
    return (array: T[]): T | undefined => array.find(condition);
}

export function findIndex<T>(condition: Predicate<T>): Unary<T[], number | -1> {
    return (array: T[]): number | -1 => array.findIndex(condition);
}

export function forEach<T>(procedure: Unary<T, void>): Unary<T[], void> {
    return (array: T[]): void => array.forEach(procedure);
}

export function includes<T>(search: T, from?: number): Predicate<T[]> {
    return (array: T[]): boolean => array.includes(search, from);
}

export function indexOf<T>(search: T, from?: number): Unary<T[], number | -1> {
    return (array: T[]): number | -1 => array.indexOf(search, from);
}

export function join<T>(separator: string = ','): Unary<T[], string> {
    return (array: T[]): string => array.join(separator);
}

export function keys<T>(array: T[]): IterableIterator<number> {
    return array.keys();
}

export function lastIndexOf<T>(search: T, from?: number): Unary<T[], number | -1> {
    return (array: T[]): number | -1 => array.lastIndexOf(
        search,
        isDefined(from) ? from : array.length - 1,
    );
}

export function map<T, V>(lift: Unary<T, V>): Unary<T[], V[]> {
    return (array: T[]): V[] => array.map(lift);
}

export function pop<T>(array: T[]): T | undefined {
    return array.pop();
}

export function push<T>(...items: T[]): Unary<T[], number> {
    return (array: T[]): number => array.push(...items);
}

export type Reducer<T, V> = (result: V, element: T, index: number) => V;

export function reduce<T, V>(reducer: Reducer<T, V>, initial: V): Unary<T[], V> {
    return (array: T[]): V => array.reduce(reducer, initial);
}

export function reduceTo<T>(reducer: Reducer<T, T>): Unary<T[], T> {
    return (array: T[]): T => array.reduce(reducer);
}

export function reduceRight<T, V>(reducer: Reducer<T, V>, initial: V): Unary<T[], V> {
    return (array: T[]): V => array.reduceRight(reducer, initial);
}

export function reduceRightTo<T>(reducer: Reducer<T, T>): Unary<T[], T> {
    return (array: T[]): T => array.reduceRight(reducer);
}

export function reverse<T>(array: T[]): T[] {
    return array.reverse();
}

export function shift<T>(array: T[]): T | undefined {
    return array.shift();
}

export function slice<T>(start?: number, end?: number): Unary<T[], T[]> {
    return (array: T[]): T[] => array.slice(start, end);
}

export function some<T>(condition: Predicate<T>): Predicate<T[]> {
    return (array: T[]): boolean => array.some(condition);
}

export type Compare<T> = (a: T, b: T) => number;

export function sort<T>(order?: Compare<T>): Unary<T[], T[]> {
    return (array: T[]): T[] => array.sort(order);
}

export function splice<T>(start: number, deleteCount?: number): Unary<T[], T[]> {
    return (array: T[]): T[] => array.splice(
        start,
        isDefined(deleteCount) ? deleteCount : array.length - 1,
    );
}

export function spliceWith<T>(start: number, deleteCount: number, ...items: T[]): Unary<T[], T[]> {
    return (array: T[]): T[] => array.splice(start, deleteCount, ...items);
}

export function unshift<T>(...items: T[]): Unary<T[], number> {
    return (array: T[]): number => array.unshift(...items);
}

export function values<T>(array: T[]): IterableIterator<T> {
    return array.values();
}
