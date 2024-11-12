import { hasLength } from './length';

/**
 * A function with two arguments.
 *
 * @since v0.1.0
 */
export type Binary<X, Y, V> = (x: X, y: Y) => V;

/**
 * Returns `true` if a given function `f` has length 2 (excluding a variadic argument).
 * Otherwise, returns `false`.
 *
 * TODO(https://github.com/perfective/ts.common/issues/32):
 *  The purpose of this function is to ensure that two arguments can be passed into the function,
 *  but in JavaScript it is allowed to pass two arguments into an unary or nullary function.
 *  So there should be a function to confirm that as well.
 *
 * @since v0.6.0
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type -- generic predicate
export function isBinary(f: Function): boolean {
    return hasLength(2)(f);
}
