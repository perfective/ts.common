/* eslint-disable @typescript-eslint/no-explicit-any -- using `any` to defined arguments of a constructor */

/**
 * Definition for class type reference.
 *
 * @since v0.6.0
 */
export type Instance<T, U extends any[] = any[]> = abstract new(...args: U) => T;

/**
 * Creates a type guard that returns true if a passed argument is an instance of a given `type`.
 *
 * @since v0.3.0
 */
export function isInstanceOf<T, U extends any[] = any[], V = unknown>(
    type: Instance<T, U>,
): (value: T | V) => value is T {
    return (value: T | V): value is T => value instanceof type;
}

/**
 * Creates a type guard that returns true if a passed argument is not an instance of a given `type`.
 *
 * @since v0.3.0
 */
export function isNotInstanceOf<T, U extends any[] = any[], V = unknown>(
    type: Instance<T, U>,
): (value: T | V) => value is V {
    return (value: T | V): value is V => !(value instanceof type);
}

/* eslint-enable @typescript-eslint/no-explicit-any */
