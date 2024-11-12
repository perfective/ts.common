import { Unary } from '../../function/function/unary';
import { isFalse, isTrue } from '../proposition/proposition';

/**
 * A unary function that returns true or false for a given `value`.
 *
 * @since v0.1.2
 */
export type Predicate<T> = (value: T) => boolean;

/**
 * A type predicate. Returns `true` if a given `value` is `boolean`.
 *
 * @since v0.10.0
 */
export function isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
}

/**
 * A type predicate. Returns `true` if a given `value` is not `boolean`.
 *
 * @since v0.10.0
 */
export function isNotBoolean<T>(value: T | boolean): value is T {
    return typeof value !== 'boolean';
}

/**
 * Returns true when the value is neither undefined, null, false, NaN, 0, -0, 0n (a `BigInt` zero),
 * "" (an empty string), or the `document.all` builtin.
 *
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 *
 * @since v0.3.0
 */
// eslint-disable-next-line unicorn/prefer-native-coercion-functions -- function name increases readability
export function isTruthy(value: unknown): boolean {
    return Boolean(value);
}

/**
 * Returns true when the value is undefined, null, false, NaN, 0, -0, 0n (a `BigInt` zero), "" (an empty string),
 * or the `document.all` builtin.
 *
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Falsy
 *
 * @since v0.3.0
 */
export function isFalsy(value: unknown): boolean {
    return !isTruthy(value);
}

/**
 * Creates a {@linkcode Predicate} that is true if its argument strictly equals a given `input`.
 *
 * @since v0.2.0
 */
export function is<T>(input: T): Predicate<T> {
    return (value: T): boolean => value === input;
}

/**
 * Creates a {@linkcode Predicate} that is true if its argument does not equal a given `input`.
 *
 * @since v0.2.0
 */
export function isNot<T>(input: T): Predicate<T> {
    return (value: T): boolean => value !== input;
}

/**
 * Creates a {@linkcode Predicate} that inverses the result of a given {@linkcode Predicate}.
 *
 * @since v0.2.0
 */
export function not<T>(predicate: Predicate<T>): Predicate<T> {
    return (value: T): boolean => !predicate(value);
}

/**
 * Creates a {@linkcode Predicate} that is true when all given `predicates` are true.
 *
 * This is a logical `AND` operation.
 *
 * @since v0.2.0
 */
export function all<T>(...predicates: Predicate<T>[]): Predicate<T> {
    return (value: T): boolean => predicates.map(bool(value)).filter(isFalse).length === 0;
}

/**
 * Creates a {@linkcode Predicate} that is true when at least one of given `predicates` is true.
 *
 * This is a logical `OR` operation.
 *
 * @since v0.2.0
 */
export function either<T>(...predicates: Predicate<T>[]): Predicate<T> {
    return (value: T): boolean => predicates.map(bool(value)).some(isTrue);
}

/**
 * Creates a {@linkcode Predicate} that is true when none of given `predicates` is true.
 *
 * @since v0.2.0
 */
export function neither<T>(...predicates: Predicate<T>[]): Predicate<T> {
    return (value: T): boolean => predicates.map(bool(value)).filter(isTrue).length === 0;
}

/**
 * Creates a {@linkcode Predicate} that is true
 * when at least a given `minimum` number of given `predicates` is true.
 *
 * @since v0.2.0
 */
export function atLeast<T>(minimum: number, ...predicates: Predicate<T>[]): Predicate<T> {
    return (value: T): boolean => predicates.map(bool(value)).filter(isTrue).length >= minimum;
}

/**
 * Creates a {@linkcode Predicate} that is true
 * when no more than a given `maximum` number of given `predicates` is true.
 *
 * @since v0.2.0
 */
export function atMost<T>(maximum: number, ...predicates: Predicate<T>[]): Predicate<T> {
    return (value: T): boolean => predicates.map(bool(value)).filter(isTrue).length <= maximum;
}

/**
 * Creates a {@linkcode Predicate} that is true
 * when exactly a given `count` of given `predicates` is true.
 *
 * @since v0.2.0
 */
export function exactly<T>(count: number, ...predicates: Predicate<T>[]): Predicate<T> {
    return (value: T): boolean => predicates.map(bool(value)).filter(isTrue).length === count;
}

/**
 * Returns a function that applies a given `value` to a {@linkcode Predicate}.
 */
function bool<T>(value: T): Unary<Predicate<T>, boolean> {
    return (predicate: Predicate<T>): boolean => predicate(value);
}
