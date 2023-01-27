import { isAbsent, isPresent } from '../../value/value';

/* eslint-disable deprecation/deprecation -- TODO: Remove in v0.10.0 */
/* eslint-disable jsdoc/require-description -- deprecation tags only */

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

/* eslint-disable @typescript-eslint/no-explicit-any -- check if method is defined */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- check if method is defined */
/**
 * @deprecated Since v0.9.0.
 */
export function isOutput<T>(value: Output | T): value is Output {
    return isPresent(value) && typeof (value as any).toString === 'function';
}

/**
 * @deprecated Since v0.9.0.
 */
export function isNotOutput<T>(value: Output | T): value is T {
    return isAbsent(value) || typeof (value as any).toString !== 'function';
}
/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */

/* eslint-enable jsdoc/require-description */
/* eslint-enable deprecation/deprecation */
