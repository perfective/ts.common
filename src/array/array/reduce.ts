/**
 * A callback that can passed into the `Array.prototype.reduce()` and `Array.prototype.reduceRight()` methods.
 *
 * @since v0.3.0
 */
export type Reduce<T, V> = (result: V, element: T, index: number, array: T[]) => V;
