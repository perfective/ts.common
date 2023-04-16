import { Unary } from '../../function/function/unary';
import { isFalse, isTrue } from '../proposition/proposition';

/**
 * A unary function that returns true or false for a given {@linkcode value}.
 *
 * @since v0.1.2
 */
export type Predicate<T> = (value: T) => boolean;

/**
 * Returns true when the value is neither undefined, null, false, NaN, 0, -0, 0n (a `BigInt` zero),
 * "" (an empty string), or the `document.all` builtin.
 *
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 *
 * @since v0.3.0
 */
// eslint-disable-next-line unicorn/prefer-native-coercion-functions -- function name increases readability
export function isTruthy<T>(value: T): boolean {
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
export function isFalsy<T>(value: T): boolean {
    return !isTruthy(value);
}

/**
 * Creates a {@linkcode Predicate} that is true if its argument strictly equals a given {@linkcode input}.
 *
 * @since v0.2.0
 */
export function is<T>(input: T): Predicate<T> {
    return (value: T): boolean => value === input;
}

/**
 * Creates a {@linkcode Predicate} that is true if its argument does not equal a given {@linkcode input}.
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
 * Creates a {@linkcode Predicate} that is true when all given {@linkcode predicates} are true.
 *
 * This is a logical `AND` operation.
 *
 * @since v0.2.0
 */
export function all<T>(...predicates: Predicate<T>[]): Predicate<T> {
    return (value: T): boolean => predicates.map(bool(value)).filter(isFalse).length === 0;
}

/**
 * Creates a {@linkcode Predicate} that is true when at least one of given {@linkcode predicates} is true.
 *
 * This is a logical `OR` operation.
 *
 * @since v0.2.0
 */
export function either<T>(...predicates: Predicate<T>[]): Predicate<T> {
    return (value: T): boolean => predicates.map(bool(value)).some(isTrue);
}

/**
 * Creates a {@linkcode Predicate} that is true when none of given {@linkcode predicates} is true.
 *
 * @since v0.2.0
 */
export function neither<T>(...predicates: Predicate<T>[]): Predicate<T> {
    return (value: T): boolean => predicates.map(bool(value)).filter(isTrue).length === 0;
}

/**
 * Creates a {@linkcode Predicate} that is true
 * when at least a given {@linkcode minimum} number of given {@linkcode predicates} is true.
 *
 * @since v0.2.0
 */
export function atLeast<T>(minimum: number, ...predicates: Predicate<T>[]): Predicate<T> {
    return (value: T): boolean => predicates.map(bool(value)).filter(isTrue).length >= minimum;
}

/**
 * Creates a {@linkcode Predicate} that is true
 * when no more than a given {@linkcode maximum} number of given {@linkcode predicates} is true.
 *
 * @since v0.2.0
 */
export function atMost<T>(maximum: number, ...predicates: Predicate<T>[]): Predicate<T> {
    return (value: T): boolean => predicates.map(bool(value)).filter(isTrue).length <= maximum;
}

/**
 * Creates a {@linkcode Predicate} that is true
 * when exactly a given {@linkcode count} of given {@linkcode predicates} is true.
 *
 * @since v0.2.0
 */
export function exactly<T>(count: number, ...predicates: Predicate<T>[]): Predicate<T> {
    return (value: T): boolean => predicates.map(bool(value)).filter(isTrue).length === count;
}

/**
 * Returns a function that applies a given {@linkcode value} to a {@linkcode Predicate}.
 */
function bool<T>(value: T): Unary<Predicate<T>, boolean> {
    return (predicate: Predicate<T>): boolean => predicate(value);
}
