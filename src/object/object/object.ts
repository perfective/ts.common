import { isAbsent, isPresent } from '../../value/value';

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
    if (value instanceof Set) {
        return new Set(value) as unknown as T;
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

/* eslint-disable @typescript-eslint/no-explicit-any -- check if method is defined */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- check if method is defined */

/**
 * Returns true if a given {@linkcode value} implements a given {@linkcode method}.
 * Otherwise returns false.
 *
 * @since v0.9.0
 */
export function hasMethod(value: unknown, method: string): boolean {
    return isPresent(value) && typeof (value as any)[method] === 'function';
}

/**
 * Returns true if a given {@linkcode value} does not implement a given {@linkcode method}.
 * Otherwise returns false.
 *
 * @since v0.9.0
 */
export function hasNoMethod(value: unknown, method: string): boolean {
    return isAbsent(value) || typeof (value as any)[method] !== 'function';
}

/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
