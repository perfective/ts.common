import { Unary } from '@perfective/fp';

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
 * Curries the pick() function for the given properties.
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
 * Curries the omit() function for the given properties.
 *
 * @see omit()
 */
export function recordWithOmitted<T, K extends keyof T>(...property: readonly K[]): Unary<T, Omit<T, K>> {
    return (value: T): Omit<T, K> => omit<T, K>(value, ...property);
}
