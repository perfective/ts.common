import { isRecord } from './predicate';

/**
 * Creates a shallow copy of the given value. (Experimental).
 */
export function copy<T>(value: T): T {
    if (Array.isArray(value)) {
        return Array.from(value) as unknown as T;
    }
    if (isRecord(value)) {
        return { ...value };
    }
    return value;
}
