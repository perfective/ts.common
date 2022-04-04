import { isPresent } from '../../value/value';

// eslint-disable-next-line @typescript-eslint/ban-types -- type guard
export function isObject<T>(value: T | null): value is T & object {
    return value !== null
        && typeof value === 'object';
}

/**
 * Returns true when the value is an object created from the Object class (not an Array, Date, etc.).
 */
export function isRecord<T>(value: T): boolean {
    return isObject(value)
        && hasConstructor(Object.name)(value);
}

/**
 * Returns true when the given value is considered true in boolean context.
 *
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 */
// eslint-disable-next-line unicorn/prefer-native-coercion-functions -- function name increases readability
export function isTruthy<T>(value: T): boolean {
    return Boolean(value);
}

/**
 * Returns false when the given value is considered false in the boolean context.
 *
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Falsy
 */
export function isFalsy<T>(value: T): boolean {
    return !isTruthy(value);
}

/**
 * Returns true when the value is truthy or is not an empty array or object.
 */
export function isEmpty<T>(value: T): boolean {
    return isFalsy(value)
        || isEmptyArray(value)
        || isEmptyRecord(value);
}

function isEmptyArray<T>(value: T): boolean {
    return Array.isArray(value)
        && value.length === 0;
}

function isEmptyRecord<T>(value: T): boolean {
    return isRecord(value)
        && Object.keys(value).length === 0;
}

/* eslint-disable @typescript-eslint/no-explicit-any -- low-level function to work with JS */
function hasConstructor<T>(name: string): (value: T) => boolean {
    return (value: T): boolean => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- checked property presence
        if (isPresent((value as any).constructor)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- property presence is checked
            return (value as any).constructor.name === name;
        }
        return false;
    };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
