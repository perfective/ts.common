/* eslint-disable @typescript-eslint/no-explicit-any -- using `any` to defined arguments of a constructor */
export type Instance<T, U extends any[] = any[]> = abstract new(...args: U) => T;

export function isInstanceOf<T, U extends any[] = any[], V = unknown>(
    type: Instance<T, U>,
): (value: T | V) => value is T {
    return (value: T | V): value is T => value instanceof type;
}

export function isNotInstanceOf<T, U extends any[] = any[], V = unknown>(
    type: Instance<T, U>,
): (value: T | V) => value is V {
    return (value: T | V): value is V => !(value instanceof type);
}
/* eslint-enable @typescript-eslint/no-explicit-any */
