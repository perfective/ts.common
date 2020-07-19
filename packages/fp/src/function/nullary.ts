import { isFunction } from './function';

export type Nullary<T> = () => T;
export type Value<T> = T | Nullary<T>;

export function constant<T>(value: T): Nullary<T> {
    return (): T => value;
}

export function empty(): Nullary<void> {
    return (): void => undefined;
}

export function valueOf<T>(value: Value<T>): T {
    return isFunction(value) ? value() : value;
}
