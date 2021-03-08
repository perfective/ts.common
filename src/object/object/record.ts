import { Predicate } from '../../fp/function/predicate';
import { Unary } from '../../fp/function/unary';

export function recordFromArray(array: string[]): Record<string, number> {
    return array.reduce<Record<string, number>>(indexByValue, {});
}

function indexByValue(record: Record<string, number>, value: string, index: number): Record<string, number> {
    record[value] = index;
    return record;
}

export type Entry<K = string, V = unknown> = [K, V];

/**
 * Creates an plain object from an array of pairs (entries).
 *
 * This function is an inverse for Object.entries().
 *
 * @see Object.entries()
 */
export function recordFromEntries(entries: Entry[]): Record<string, unknown> {
    return entries.reduce(toRecordFromEntries, {});
}

/**
 * Reducer to build a record from entries.
 */
export function toRecordFromEntries(record: Record<string, unknown>, value: Entry): Record<string, unknown> {
    record[value[0]] = value[1];
    return record;
}

/**
 * Creates a copy of the record only with the given properties.
 *
 * @see Pick
 */
export function pick<T, K extends keyof T>(record: T, ...property: readonly K[]): Pick<T, K> {
    return Object.entries(record)
        .filter(([key]: Entry) => property.includes(key as K))
        .reduce(toRecordFromEntries, {}) as Pick<T, K>;
}

/**
 * Partially applies the pick() function for the given properties.
 *
 * @see pick()
 */
export function recordWithPicked<T, K extends keyof T>(...property: readonly K[]): Unary<T, Pick<T, K>> {
    return (value: T): Pick<T, K> => pick<T, K>(value, ...property);
}

/**
 * Creates a copy of the record without the given properties.
 *
 * @see Omit
 */
export function omit<T, K extends keyof T>(record: T, ...property: readonly K[]): Omit<T, K> {
    return Object.entries(record)
        .filter(([key]: Entry) => !property.includes(key as K))
        .reduce(toRecordFromEntries, {}) as Omit<T, K>;
}

/**
 * Partially applies the omit() function for the given properties.
 *
 * @see omit()
 */
export function recordWithOmitted<T, K extends keyof T>(...property: readonly K[]): Unary<T, Omit<T, K>> {
    return (value: T): Omit<T, K> => omit<T, K>(value, ...property);
}

/**
 * Creates a copy of the record where each value meets the condition.
 */
export function filter<T, K extends keyof T>(record: T, condition: Predicate<T[K]>): Partial<T> {
    return Object.entries(record)
        .filter(([, value]: Entry) => condition(value as T[K]))
        .reduce(toRecordFromEntries, {}) as Partial<T>;
}

/**
 * Partially applies the filter() function for the given condition.
 *
 * @see filter()
 */
export function recordFiltered<T, K extends keyof T = keyof T>(condition: Predicate<T[K]>): Unary<T, Partial<T>> {
    return (record: T): Partial<T> => filter(record, condition);
}

/**
 * Creates a shallow copy of the given value with the given overrides.
 *
 * @see Object.assign()
 */
export function assigned<T, V = Partial<T>>(value: T, ...overrides: (V | Partial<T>)[]): T & V {
    return overrides.reduce<T & V>(
        (result: T & V, current: V | Partial<T>) => ({
            ...result,
            ...current,
        }),
        // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter -- TSC errors without type casting.
        value as T & V,
    );
}

/**
 * Partially applies the assign() with the given overrides.
 */
export function recordWithAssigned<T, V = Partial<T>>(...overrides: (V | Partial<T>)[]): (value: T) => T & V {
    return (value: T): T & V => assigned(value, ...overrides);
}
