/**
 * Array filter function type that can be passed into Array.prototype.filter().
 */
import { Predicate } from '../../fp/function/predicate';

export type Filter<T, S extends T> = (value: T, index: number, array: T[]) => value is S;

export function isFirstOccurrence<T>(value: T, index: number, array: T[]): boolean {
    return array.indexOf(value) === index;
}

export function isLastOccurrence<T>(value: T, index: number, array: T[]): boolean {
    return array.lastIndexOf(value) === index;
}

export function by<T, K extends keyof T>(property: K, condition: Predicate<T[K]>): Filter<T, T> {
    return (value: T): value is T => condition(value[property]);
}
