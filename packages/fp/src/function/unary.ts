export type Unary<X, T> = (x: X) => T;
export type TypeGuard<T, V extends T> = (value: T) => value is V;

export function value<T>(): Unary<T, T> {
    return (value: T): T => value;
}
