/**
 * Array map function type that can be passed into the Array.prototype.map().
 */
export type Map<T, U> = (value: T, index: number, array: T[]) => U;
