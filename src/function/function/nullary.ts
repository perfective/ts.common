import { isFunction } from './function';
import { hasLength } from './length';

export type Nullary<T> = () => T;

/**
 * A nullary procedure.
 *
 * @since v0.9.0
 */
export type Void = () => void;

export type Value<T> = T | Nullary<T>;

// eslint-disable-next-line @typescript-eslint/ban-types -- generic predicate
export function isNullary<F extends Function>(f: F): boolean {
    return hasLength(0)(f);
}

export function constant<T>(value: T): Nullary<T> {
    return (): T => value;
}

/**
 * @deprecated Since v0.10.0. Use {@linkcode naught} instead.
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

export function valueOf<T>(value: Value<T>): T {
    return isFunction(value) ? value() : value;
}
