export function isObject<T>(value: T | null): boolean {
    return value !== null
        && typeof value === 'object';
}

/**
 * Returns true when the given value is considered true in boolean context.
 *
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 */
export function isTruthy<T>(value: T): boolean {
    return Boolean(value);
}

/**
 * Returns false when the given value is consdered false in the boolean context.
 *
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Falsy
 */
export function isFalsy<T>(value: T): boolean {
    return !isTruthy(value);
}
