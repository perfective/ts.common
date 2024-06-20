import { Predicate } from '../../boolean/predicate/predicate';
import { Unary } from '../../function/function/unary';

/**
 * Creates an object from a given array with the array values as keys and their indexes as values.
 *
 * @since v0.2.0
 */
export function recordFromArray(array: string[]): Record<string, number> {
    return array.reduce<Record<string, number>>(indexByValue, {});
}

function indexByValue(record: Record<string, number>, value: string, index: number): Record<string, number> {
    // eslint-disable-next-line security/detect-object-injection -- array index checked statically
    record[value] = index;
    return record;
}

/**
 * A key-value pair (array).
 *
 * @since v0.3.0
 */
export type Entry<K = string, V = unknown> = [K, V];

/**
 * Creates an object from a given array of entries. An inverse for `Object.entries()`.
 *
 * @see Object.entries()
 *
 * @since v0.3.0
 */
export function recordFromEntries(entries: Entry[]): Record<string, unknown> {
    return entries.reduce(toRecordFromEntries, {});
}

/**
 * A reducer to build a record from entries.
 *
 * @since v0.3.0
 */
export function toRecordFromEntries(record: Record<string, unknown>, value: Entry): Record<string, unknown> {
    record[value[0]] = value[1];
    return record;
}

/**
 * Creates a copy of a given `record` only with given `properties`.
 *
 * @see Pick
 *
 * @since v0.3.0
 */
export function pick<T, K extends keyof T>(record: NonNullable<T>, ...properties: readonly K[]): Pick<T, K> {
    return Object.entries(record)
        .filter(([key]: Entry) => properties.includes(key as K))
        .reduce(toRecordFromEntries, {}) as Pick<T, K>;
}

/**
 * Creates a function to `pick` given `properties` from its argument.
 *
 * @see pick()
 *
 * @since v0.3.0
 */
export function recordWithPicked<T, K extends keyof T>(...properties: readonly K[]): Unary<NonNullable<T>, Pick<T, K>> {
    return (value: NonNullable<T>): Pick<T, K> => pick<T, K>(value, ...properties);
}

/**
 * Creates a copy of a given `record` without given `properties`.
 *
 * @see Omit
 *
 * @since v0.3.0
 */
export function omit<T, K extends keyof T>(record: NonNullable<T>, ...properties: readonly K[]): Omit<T, K> {
    return Object.entries(record)
        .filter(([key]: Entry) => !properties.includes(key as K))
        .reduce(toRecordFromEntries, {}) as Omit<T, K>;
}

/**
 * Creates a function to `omit` given `properties` from its argument.
 *
 * @see omit()
 *
 * @since v0.3.0
 */
export function recordWithOmitted<T, K extends keyof T>(...property: readonly K[]): Unary<NonNullable<T>, Omit<T, K>> {
    return (value: NonNullable<T>): Omit<T, K> => omit<T, K>(value, ...property);
}

/**
 * Creates a copy of a given `record` only with properties that satisfy a given `condition`.
 *
 * @since v0.3.0
 */
export function filter<T, K extends keyof T>(record: NonNullable<T>, condition: Predicate<T[K]>): Partial<T> {
    return Object.entries(record)
        .filter(([, value]: Entry) => condition(value as T[K]))
        .reduce(toRecordFromEntries, {}) as Partial<T>;
}

/**
 * Creates a function to `filter` properties that satisfy a given `condition` from its argument.
 *
 * @see filter()
 *
 * @since v0.3.0
 */
export function recordFiltered<T, K extends keyof T = keyof T>(
    condition: Predicate<T[K]>,
): Unary<NonNullable<T>, Partial<T>> {
    return (record: NonNullable<T>): Partial<T> => filter(record, condition);
}

/**
 * Creates a {@linkcode Record} from a given `value` with properties overridden by the `overrides`.
 *
 * @see Object.assign()
 *
 * @since v0.3.0
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
 * Creates a function to assign given `overrides` to its argument.
 *
 * @see assigned
 *
 * @since v0.3.0
 */
export function recordWithAssigned<T, V = Partial<T>>(...overrides: (V | Partial<T>)[]): (value: T) => T & V {
    return (value: T): T & V => assigned(value, ...overrides);
}
