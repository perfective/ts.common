import { hasMethod, hasNoMethod } from '../../object/object/object';

/* eslint-disable deprecation/deprecation -- TODO: Remove in v0.10.0 */

/**
 * @deprecated Since v0.9.0. Use {@linkcode unknown} instead with {@linkcode String}.
 */
export interface Output {
    toString: () => string;
}

/**
 * @deprecated Since v0.9.0. Use {@linkcode String} function instead.
 */
// eslint-disable-next-line unicorn/prefer-native-coercion-functions -- rename for readability. Deprecated.
export function output(value: unknown): string {
    return String(value);
}

/**
 * @deprecated Since v0.9.0.
 */
export function isOutput<T>(value: Output | T): value is Output {
    return hasMethod(value, 'toString');
}

/**
 * @deprecated Since v0.9.0.
 */
export function isNotOutput<T>(value: Output | T): value is T {
    return hasNoMethod(value, 'toString');
}

/* eslint-enable deprecation/deprecation */
