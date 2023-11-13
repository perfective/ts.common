import { hasLength } from './length';

/**
 * A function with three arguments.
 *
 * @since v0.1.0
 */
export type Ternary<X, Y, Z, V> = (x: X, y: Y, z: Z) => V;

/**
 * Returns `true` if a given function `f` has length `3` (excluding a variadic argument).
 * Otherwise, returns `false`.
 *
 * TODO(https://github.com/perfective/ts.common/issues/32).
 *
 * @since v0.6.0
 */
// eslint-disable-next-line @typescript-eslint/ban-types -- generic predicate
export function isTernary<F extends Function>(f: F): boolean {
    return hasLength(3)(f);
}
