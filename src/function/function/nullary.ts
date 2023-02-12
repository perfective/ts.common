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

export function empty(): Void {
    return (): void => undefined;
}

export function valueOf<T>(value: Value<T>): T {
    return isFunction(value) ? value() : value;
}
