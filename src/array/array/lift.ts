import { Predicate } from '../../boolean/predicate/predicate';
import { Unary, UnaryVoid } from '../../function/function/unary';
import { isDefined } from '../../value/value';

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents -- -1 is an error code
export type NumberOrErrorCode = number | -1;

/**
 * Creates a callback that merges given `arrays` to the input `array`.
 *
 * @since v0.1.0
 */
export function concat<T>(...arrays: ConcatArray<T>[]): Unary<T[], T[]> {
    return (array: T[]): T[] => array.concat(...arrays);
}

/**
 * Creates a callback that shallow copies elements within a given `start` to `end` range
 * starting from the `target` index.
 *
 * @since v0.2.0
 */
export function copyWithin<T>(target: number, start: number = 0, end?: number): Unary<T[], T[]> {
    return (array: T[]): T[] => array.copyWithin(target, start, end);
}

/**
 * Returns a new array iterator that contains the key/value pairs for each index of a given array.
 *
 * @since v0.2.0
 */
export function entries<T>(array: T[]): IterableIterator<[number, T]> {
    return array.entries();
}

/**
 * Creates a callback that returns `true` if all elements of the input `array` satisfy a given `condition`.
 *
 * @since v0.2.0
 */
export function every<T>(condition: Predicate<T>): Predicate<T[]> {
    return (array: T[]): boolean => array.every(condition);
}

/**
 * Creates a callback that changes all elements of the input `array` within a given `start` to `end` range
 * to a given `value`.
 *
 * @since v0.2.0
 */
export function fill<T>(value: T, start?: number, end?: number): Unary<T[], T[]> {
    return (array: T[]): T[] => array.fill(value, start, end);
}

/**
 * Creates a callback that returns an array with element the input `array` that satisfy a given `condition`.
 *
 * @since v0.2.0
 */
export function filter<T>(condition: Predicate<T>): Unary<T[], T[]> {
    return (array: T[]): T[] => array.filter(condition);
}

/**
 * Creates a callback that returns the first element of the input `array` that satisfies a given `condition`;
 * or returns `undefined` if no elements satisfy the `condition`.
 *
 * @since v0.2.0
 */
export function find<T>(condition: Predicate<T>): Unary<T[], T | undefined> {
    return (array: T[]): T | undefined => array.find(condition);
}

/**
 * Creates a callback that returns the index of the first element of the input `array`
 * that satisfies a given `condition`;
 * or returns `-1` if no elements satisfy the `condition`.
 *
 * TODO(https://github.com/perfective/ts.common/issues/29): Return undefined instead of -1.
 *
 * @since v0.2.0
 */
export function findIndex<T>(condition: Predicate<T>): Unary<T[], NumberOrErrorCode> {
    return (array: T[]): NumberOrErrorCode => array.findIndex(condition);
}

/**
 * Creates a callback that executes a given `procedure` on every element of the input `array`.
 *
 * @since v0.2.0
 */
export function forEach<T>(procedure: UnaryVoid<T>): UnaryVoid<T[]> {
    return (array: T[]): void => array.forEach(procedure);
}

/**
 * Creates a callback that returns `true` if a given `value` is included in the input array
 * (optionally, starting `from` a given index).
 *
 * @since v0.2.0
 */
export function includes<T>(value: T, from?: number): Predicate<T[]> {
    return (array: T[]): boolean => array.includes(value, from);
}

/**
 * Creates a callback that returns the first index of a given `value` in the input array
 * (optionally, starting `from` a given index);
 * or returns `-1` if the `value` is not present.
 *
 * TODO(https://github.com/perfective/ts.common/issues/29): Return undefined instead of -1.
 *
 * @since v0.2.0
 */
export function indexOf<T>(value: T, from?: number): Unary<T[], NumberOrErrorCode> {
    return (array: T[]): NumberOrErrorCode => array.indexOf(value, from);
}

/**
 * Creates a callback that returns a string concatenated from elements of the input `array` with a given `separator`.
 *
 * @since v0.2.0
 */
export function join<T>(separator: string = ','): Unary<T[], string> {
    return (array: T[]): string => array.join(separator);
}

/**
 * Returns a new array iterator that contains the keys of each index in the array.
 *
 * @since v0.2.0
 */
export function keys<T>(array: T[]): IterableIterator<number> {
    return array.keys();
}

/**
 * Creates a callback that returns the last index of a given `value` in the input array;
 * or returns `-1` if the `value` is not present.
 *
 * TODO(https://github.com/perfective/ts.common/issues/29): Return undefined instead of -1.
 *
 * @since v0.2.0
 */
export function lastIndexOf<T>(value: T, from?: number): Unary<T[], NumberOrErrorCode> {
    return (array: T[]): NumberOrErrorCode => array.lastIndexOf(
        value,
        isDefined(from) ? from : array.length - 1,
    );
}

/**
 * Creates a callback that returns an array of results of a given `callback` applied to each element of the input array.
 *
 * @since v0.2.0
 */
export function map<T, V>(callback: Unary<T, V>): Unary<T[], V[]> {
    return (array: T[]): V[] => array.map(callback);
}

/**
 * Returns the last element of a given `array` and removes it from the `array`.
 *
 * Returns `undefined` if the array is empty.
 *
 * @since v0.2.0
 */
export function pop<T>(array: T[]): T | undefined {
    return array.pop();
}

/**
 * Creates a callback that adds given `elements` to the end of the input array and returns its new length.
 *
 * @since v0.2.0
 */
export function push<T>(...elements: T[]): Unary<T[], number> {
    return (array: T[]): number => array.push(...elements);
}

/**
 * Creates a callback that adds the input `elements` to the end of a given `array` and returns its new length.
 *
 * @since v0.9.0
 */
export function pushInto<T>(array: T[]): (...elements: T[]) => number {
    return (...elements: T[]): number => array.push(...elements);
}

/**
 * A reduce callback that can be passed into the `Array.prototype.reduce()` method.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * TODO(https://github.com/perfective/ts.common/issues/30): Merge with the Reduce type.
 *
 * @since v0.2.0
 */
export type Reducer<T, V> = (result: V, element: T, index: number) => V;

/**
 * Creates a callback that reduces the input array with a given `reducer` callback using a given `initial` value.
 *
 * @since v0.2.0
 */
export function reduce<T, V>(reducer: Reducer<T, V>, initial: V): Unary<T[], V> {
    return (array: T[]): V => array.reduce(reducer, initial);
}

/**
 * Creates a callback that reduces the input array with a given `reducer` callback without an initial value.
 * If the input array is empty, the callback throws a {@link TypeError}.
 *
 * @since v0.2.0
 */
export function reduceTo<T>(reducer: Reducer<T, T>): Unary<T[], T> {
    return (array: T[]): T => array.reduce(reducer);
}

/**
 * Creates a callback that reduces the input array with a given `reducer` callback using a given `initial` value
 * starting  from the end of the array.
 *
 * @since v0.2.0
 */
export function reduceRight<T, V>(reducer: Reducer<T, V>, initial: V): Unary<T[], V> {
    return (array: T[]): V => array.reduceRight(reducer, initial);
}

/**
 * Creates a callback that reduces the input array with a given `reducer` callback without an initial value
 * starting from te end of the array.
 * If the input array is empty, the callback throws a {@link TypeError}.
 *
 * @since v0.2.0
 */
export function reduceRightTo<T>(reducer: Reducer<T, T>): Unary<T[], T> {
    return (array: T[]): T => array.reduceRight(reducer);
}

/**
 * Reverses a given `array` (in-place).
 *
 * @since v0.2.0
 */
export function reverse<T>(array: T[]): T[] {
    return array.reverse();
}

/**
 * Removes the first element of a given `array` and it.
 *
 * @since v0.2.0
 */
export function shift<T>(array: T[]): T | undefined {
    return array.shift();
}

/**
 * Creates a callback that returns an array of elements between given `start` and `end` (exclusive) indices
 * of the input array.
 *
 * @since v0.1.0
 */
export function slice<T>(start?: number, end?: number): Unary<T[], T[]> {
    return (array: T[]): T[] => array.slice(start, end);
}

/**
 * Creates a callback that returns `true` if the input array contains at least one element
 * that satisfies a given `condition`.
 *
 * @since v0.2.0
 */
export function some<T>(condition: Predicate<T>): Predicate<T[]> {
    return (array: T[]): boolean => array.some(condition);
}

/**
 * A function that defines the sort order and can be passed into the `Array.prototype.sort()` method.
 *
 * The function should return:
 * - negative number, if `a` is less than `b`;
 * - positive number, if` a` is greater than `b`;
 * - zero or `NaN`, if `a` equals `b`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 *
 * @since v0.2.0
 */
export type Compare<T> = (a: T, b: T) => number;

/**
 * Creates a callback that returns the input array sorted in-place using a given `order` function.
 *
 * @since v0.2.0
 */
export function sort<T>(order?: Compare<T>): Unary<T[], T[]> {
    return (array: T[]): T[] => array.sort(order);
}

/**
 * Creates a callback that removes (in-place) `count` number of elements of the input array from a given `start` index
 * and returns the array.
 *
 * @since v0.2.0
 */
export function splice<T>(start: number, count?: number): Unary<T[], T[]> {
    return (array: T[]): T[] => array.splice(
        start,
        isDefined(count) ? count : array.length - 1,
    );
}

/**
 * Creates a callback that replaces (in-place) `count` number of elements of the input array from a given `start` index
 * with given `elements` and returns the array.
 *
 * @since v0.2.0
 */
export function spliceWith<T>(start: number, count: number, ...elements: T[]): Unary<T[], T[]> {
    return (array: T[]): T[] => array.splice(start, count, ...elements);
}

/**
 * Creates a callback that adds given `elements` to the beginning of the input array and returns its new length.
 *
 * @since v0.2.0
 */
export function unshift<T>(...elements: T[]): Unary<T[], number> {
    return (array: T[]): number => array.unshift(...elements);
}

/**
 * Returns a new array iterator that iterates the value of each item in a given `array`.
 *
 * @since v0.2.0
 */
export function values<T>(array: T[]): IterableIterator<T> {
    return array.values();
}
