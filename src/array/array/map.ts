/**
 * A callback that can be passed into the `Array.prototype.map()` method.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 *
 * @since v0.3.0
 */
export type Map<T, U> = (value: T, index: number, array: T[]) => U;
