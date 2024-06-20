import { Unary } from '../../function/function/unary';

/**
 * Infers the element type of a given array `A`.
 *
 * If type `A` is not an array, falls back to `undefined`.
 *
 * @since v0.1.0
 */
export type Element<A> = A extends readonly (infer T)[] ? T : undefined;

/**
 * Returns the first element of a given `array`.
 *
 * If the `array` is empty, returns `undefined`.
 *
 * @since v0.1.0
 */
export function head<T>(array: T[]): T | undefined {
    return array[0];
}

/**
 * Returns a sub-array of a given `array`, without the first element.
 *
 * If the `array` is empty, returns an empty array.
 *
 * @since v0.1.0
 */
export function tail<T>(array: T[]): T[] {
    return array.slice(1);
}

/**
 * Returns the last element of a given `array`.
 *
 * If the `array` is empty, returns `undefined`.
 *
 * @since v0.4.0
 */
export function end<T>(array: T[]): T | undefined {
    return array[array.length - 1];
}

/**
 * Returns a sub-array of a given `array`, without the last element.
 *
 * If the `array` is empty, returns an empty array.
 *
 * TODO(https://github.com/perfective/ts.common/issues/26): Rename into `beginning()` or `beginningOf()`.
 *
 * @since v0.4.0
 */
export function init<T>(array: T[]): T[] {
    if (array.length === 0) {
        return [];
    }
    return array.slice(0, -1);
}

/**
 * Creates a callback that returns an element at a given `index` in the `array` input.
 *
 * @since v0.1.0
 */
export function element<T>(index: number): Unary<T[], T | undefined> {
    // eslint-disable-next-line security/detect-object-injection -- array index.
    return (array: T[]): T | undefined => array[index];
}

/**
 * Creates a callback that returns an array of the first `count` of the input `array` elements.
 *
 * @since v0.1.0
 */
export function first<T>(count: number = 1): Unary<T[], T[]> {
    return (array: T[]): T[] => array.slice(0, count);
}

/**
 * Creates a callback that returns an array of the last `count` of the input `array` elements.
 *
 * @since v0.1.0
 */
export function last<T>(count: number = 1): Unary<T[], T[]> {
    return (array: T[]): T[] => array.slice(-count);
}

/**
 * Creates a callback that returns a shallow copy of the input `array` with a given `element` added as the last element.
 *
 * TODO(https://github.com/perfective/ts.common/issues/27): Add support for an array/vararg input.
 *
 * @since v0.2.0
 */
export function append<T>(element: T): Unary<T[], T[]> {
    return (array: T[]): T[] => [
        ...array,
        element,
    ];
}

/**
 * Creates a callback that returns a shallow copy of the input `array` with a given `element` added as the first
 * element.
 *
 * TODO(https://github.com/perfective/ts.common/issues/27): Add support for an array/vararg input.
 *
 * @since v0.2.0
 */
export function prepend<T>(element: T): Unary<T[], T[]> {
    return (array: T[]): T[] => [
        element,
        ...array,
    ];
}

/**
 * Creates a callback that returns a shallow copy of the input `array` with a given `element` inserted
 * at a given `index`.
 *
 * TODO(https://github.com/perfective/ts.common/issues/27): Add support for an array/vararg input.
 */
export function insert<T>(index: number, element: T): Unary<T[], T[]> {
    return (array: T[]): T[] => [
        ...array.slice(0, index),
        element,
        ...array.slice(index),
    ];
}

/**
 * Creates a callback that returns a shallow copy of a given `array` with the input `element` inserted
 * at a given `index`.
 *
 * @since v0.3.0
 */
export function insertInto<T>(array: T[], index: number): Unary<T, T[]> {
    return (element: T): T[] => insert(index, element)(array);
}

/**
 * Creates a callback that returns a shallow copy of the input `array` with a given `element` replacing
 * the input array element at a given `index`.
 *
 * @since v0.2.0
 */
export function replace<T>(index: number, element: T): Unary<T[], T[]> {
    return (array: T[]): T[] => [
        ...array.slice(0, index),
        element,
        ...array.slice(index + 1),
    ];
}

/**
 * Creates a callback that returns a shallow copy of the input `array` without an element at a given `index`.
 *
 * @since v0.2.0
 */
export function remove<T>(index: number): Unary<T[], T[]> {
    return (array: T[]): T[] => [
        ...array.slice(0, index),
        ...array.slice(index + 1),
    ];
}
