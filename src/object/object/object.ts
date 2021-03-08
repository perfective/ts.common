import { isRecord } from './predicate';
import { Entry, toRecordFromEntries } from './record';

/**
 * Creates a shallow copy of the given value. (Experimental).
 */
// eslint-disable-next-line complexity -- exhaustive check
export function copy<T>(value: T): T {
    if (Array.isArray(value)) {
        return Array.from(value) as unknown as T;
    }
    if (value instanceof Date) {
        return new Date(value) as unknown as T;
    }
    if (value instanceof Map) {
        return new Map(value) as unknown as T;
    }
    if (isRecord(value)) {
        return { ...value };
    }
    return value;
}

/**
 * Creates a clone (deep copy) of the given value. (Experimental).
 */
export function clone<T>(value: T): T {
    if (Array.isArray(value)) {
        return value.map(clone) as unknown as T;
    }
    if (isRecord(value)) {
        return Object.entries(value)
            .map(([key, value]: Entry): Entry => [key, clone(value)])
            .reduce(toRecordFromEntries, {}) as unknown as T;
    }
    return copy(value);
}
