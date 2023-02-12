import { hasLength } from './length';

export type Unary<X, V> = (x: X) => V;

/**
 * A procedure with one argument.
 *
 * @since v0.9.0
 */
export type UnaryVoid<T> = (value: T) => void;

// eslint-disable-next-line @typescript-eslint/ban-types -- generic predicate
export function isUnary<F extends Function>(f: F): boolean {
    return hasLength(1)(f);
}

/**
 * Returns a given value.
 *
 * Same is the "identity" function.
 */
export function same<T>(value: T): T {
    return value;
}
