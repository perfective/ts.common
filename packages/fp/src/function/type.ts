// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Type<T> = new(...args: any[]) => T;

export function isInstanceOf<T, V = unknown>(type: Type<T>): (value: T | V) => value is T {
    return (value: T | V): value is T => value instanceof type;
}

export function isNotInstanceOf<T, V = unknown>(type: Type<T>): (value: T | V) => value is T {
    return (value: T | V): value is T => !(value instanceof type);
}