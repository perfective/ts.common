// eslint-disable-next-line @typescript-eslint/no-explicit-any -- the only way to describe variadic arguments
export type Instance<T> = new(...args: any[]) => T;

export function isInstanceOf<T, V = unknown>(type: Instance<T>): (value: T | V) => value is T {
    return (value: T | V): value is T => value instanceof type;
}

export function isNotInstanceOf<T, V = unknown>(type: Instance<T>): (value: T | V) => value is V {
    return (value: T | V): value is V => !(value instanceof type);
}
