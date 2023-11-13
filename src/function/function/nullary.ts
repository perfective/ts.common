import { isFunction } from './function';
import { hasLength } from './length';

/**
 * A function without arguments.
 *
 * @since v0.1.0
 */
export type Nullary<T> = () => T;

/**
 * A procedure without arguments.
 *
 * @since v0.9.0
 */
export type Void = () => void;

/**
 * A value or a nullary function that returns a value.
 *
 * @since v0.3.0
 */
export type Value<T> = T | Nullary<T>;

/**
 * Returns `true` if a given function `f` has length `0` (excluding a variadic argument).
 * Otherwise, returns `false`.
 *
 * TODO(https://github.com/perfective/ts.common/issues/32).
 *
 * @since v0.6.0
 */
// eslint-disable-next-line @typescript-eslint/ban-types -- generic predicate
export function isNullary<F extends Function>(f: F): boolean {
    return hasLength(0)(f);
}

/**
 * Creates a nullary function that returns a given `value`.
 *
 * @since v0.1.0
 */
export function constant<T>(value: T): Nullary<T> {
    return (): T => value;
}

/**
 * @deprecated Since v0.10.0. Use `naught` instead.
 * TODO(https://github.com/perfective/ts.common/issues/31).
 */
export function empty(): Void {
    return (): void => undefined;
}

/**
 * An empty function to be passed as a callback when a no-op behavior is required.
 *
 * @since v0.10.0
 */
export function naught(): void {
    // eslint-disable-next-line no-useless-return -- empty no-op function
    return;
}

/**
 * When given a nullary function, evaluates the function and returns the result.
 * Otherwise, returns the given `value`.
 *
 * @since v0.3.0
 */
export function valueOf<T>(value: Value<T>): T {
    return isFunction(value) ? value() : value;
}
