export type Unary<X, T> = (x: X) => T;
export type Predicate<T> = (value: T) => boolean;

export function value<T>(): Unary<T, T> {
    return (value: T): T => value;
}
