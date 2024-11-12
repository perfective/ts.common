/**
 * Returns `true` if a given `value` is a {@link Function}.
 * Otherwise, returns `false`.
 *
 * @since v0.1.0
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type -- generic type guard
export function isFunction(value: unknown): value is Function {
    return value instanceof Function;
}

/**
 * Returns `true` if a given `value` is not a {@link Function}.
 * Otherwise, returns `true`.
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type -- generic type guard
export function isNotFunction<T>(value: Function | T): value is T {
    return !isFunction(value);
}
