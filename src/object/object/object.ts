import { isAbsent, isPresent } from '../../value/value';

import { isRecord } from './predicate';
import { Entry, toRecordFromEntries } from './record';

/**
 * Creates a shallow copy of the given value.
 *
 * Do not use: this function may not work as intended and needs to be re-written thoroughly.
 * TODO(https://github.com/perfective/ts.common/issues/38): Reimplement the function.
 *
 * @since v0.3.0
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
 * Creates a clone (deep copy) of the given value.
 *
 * Do not use: this function may not work as intended and needs to be re-written thoroughly.
 * TODO(https://github.com/perfective/ts.common/issues/39): Reimplement the function.
 *
 * @since v0.3.0
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
 * Returns true if a given `value` implements a given `method`.
 * Otherwise returns false.
 *
 * @since v0.9.0
 */
export function hasMethod(value: unknown, method: string): boolean {
    /* eslint-disable @typescript-eslint/no-unnecessary-condition -- value is unknown and may be null or undefined */
    // eslint-disable-next-line security/detect-object-injection -- only reading the property
    return isPresent(value) && typeof (value as any)[method] === 'function';
    /* eslint-enable @typescript-eslint/no-unnecessary-condition */
}

/**
 * Returns true if a given `value` does not implement a given `method`.
 * Otherwise returns false.
 *
 * @since v0.9.0
 */
export function hasNoMethod(value: unknown, method: string): boolean {
    // eslint-disable-next-line security/detect-object-injection -- only reading the property
    return isAbsent(value) || typeof (value as any)[method] !== 'function';
}

/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
