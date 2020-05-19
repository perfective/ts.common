import { isFunction } from './function';

export type Nullary<T> = () => T;
export type Fallback<T> = T | Nullary<T>;

export function constant<T>(value: T): Nullary<T> {
    return (): T => value;
}

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export function empty(): Nullary<void> {
    return (): void => undefined;
}

export function fallbackTo<T>(value: Fallback<T>): T {
    if (isFunction(value)) {
        return value();
    }
    return value;
}
