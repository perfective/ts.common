import { isFalsy } from '../../boolean/predicate/predicate';
import { isPresent } from '../../value/value';

/**
 * Returns true when the value is not null and is not a primitive.
 *
 * @since v0.3.0
 */
// eslint-disable-next-line @typescript-eslint/no-restricted-types -- type guard
export function isObject<T>(value: T | null): value is T & object {
    return value !== null
        && typeof value === 'object';
}

/**
 * Returns true when the value is an object created from the Object class (not an Array, Date, etc.).
 *
 * At the moment, the type guard does not narrow down the object types.
 *  - when isRecord() returns true, it is possible to assign the checked value to non-Object value (e.g. Date);
 *  - when isRecord() returns false, it is possible to assign the value to a Record value.
 *
 *  @since v0.3.0
 */
export function isRecord<T>(value: T): value is (T & Record<string, unknown>) {
    return isObject(value)
        && hasConstructor(Object.name)(value);
}

/**
 * Returns true when the value is falsy, an empty array or a {@linkcode Record} without properties.
 *
 * @see isFalsy
 *
 * @since v0.3.0
 */
export function isEmpty(value: unknown): boolean {
    return isFalsy(value)
        || isEmptyArray(value)
        || isEmptyRecord(value);
}

function isEmptyArray(value: unknown): boolean {
    return Array.isArray(value)
        && value.length === 0;
}

function isEmptyRecord(value: unknown): boolean {
    return isRecord(value)
        && Object.keys(value).length === 0;
}

/* eslint-disable @typescript-eslint/no-explicit-any -- low-level function to work with JS */
function hasConstructor(name: string): (value: unknown) => boolean {
    return (value: unknown): boolean => {
        /* eslint-disable @typescript-eslint/no-unsafe-member-access -- check property presence */
        if (isPresent((value as any).constructor)) {
            return (value as any).constructor.name === name;
        }
        /* eslint-enable @typescript-eslint/no-unsafe-member-access */
        return false;
    };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
