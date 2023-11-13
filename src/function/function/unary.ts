import { hasLength } from './length';

/**
 * A function with one argument.
 *
 * @since v0.1.0
 */
export type Unary<X, V> = (x: X) => V;

/**
 * A procedure with one argument.
 *
 * @since v0.9.0
 */
export type UnaryVoid<T> = (value: T) => void;

/**
 * Returns `true` if a given function `f` has length `1` (excluding a variadic argument).
 *
 * TODO(https://github.com/perfective/ts.common/issues/32).
 *
 * @since v0.6.0
 */
// eslint-disable-next-line @typescript-eslint/ban-types -- generic predicate
export function isUnary<F extends Function>(f: F): boolean {
    return hasLength(1)(f);
}

/**
 * The `identity` function. Returns a given value.
 *
 * @since v0.4.0
 */
export function same<T>(value: T): T {
    return value;
}
