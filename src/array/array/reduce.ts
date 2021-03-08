/**
 * Array reduce function type that be passed into the Array.prototype.reduce() or Array.prototype.reduceRight().
 */
export type Reduce<T, V> = (result: V, element: T, index: number, array: T[]) => V;
