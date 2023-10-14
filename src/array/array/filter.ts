import { Predicate } from '../../boolean/predicate/predicate';

/**
 * A callback that can be passed into `Array.prototype.filter()` method.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 *
 * @since v0.3.0
 */
export type Filter<T, S extends T> = (value: T, index: number, array: T[]) => value is S;

/**
 * Returns `true`, if a given `value` has its first occurrence at given `index` in a given `array`.
 *
 * Otherwise, returns `false`.
 *
 * @since v0.3.0
 */
export function isFirstOccurrence<T>(value: T, index: number, array: T[]): boolean {
    return array.indexOf(value) === index;
}

/**
 * Returns `true`, if a given `value` has its last occurrence at given `index` in a given `array`.
 *
 * Otherwise, returns `false`.
 *
 * @since v0.3.0
 */
export function isLastOccurrence<T>(value: T, index: number, array: T[]): boolean {
    return array.lastIndexOf(value) === index;
}

/**
 * Creates a filter callback that returns `true`
 * if a given `property` of the input `value` satisfies a given `condition`.
 *
 * TODO: Add support for the index input argument.
 *
 * @since v0.3.1
 */
export function by<T, K extends keyof T>(property: K, condition: Predicate<T[K]>): Filter<T, T> {
    return (value: T): value is T => condition(value[property]);
}
