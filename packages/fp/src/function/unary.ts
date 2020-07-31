export type Unary<X, V> = (x: X) => V;

export function same<T>(): Unary<T, T> {
    return (value: T): T => value;
}
