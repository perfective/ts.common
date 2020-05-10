export type Unary<X, T> = (x: X) => T;

export function value<T>(): Unary<T, T> {
    return (value: T): T => value;
}
