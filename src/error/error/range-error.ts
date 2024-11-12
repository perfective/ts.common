/**
 * Creates a new {@linkcode RangeError} with a given `message`.
 *
 * @since v0.1.0
 */
export function rangeError(message: string): RangeError {
    return new RangeError(message);
}

/**
 * Returns `true` and narrows the type if a given `value` is an {@linkcode RangeError}.
 *
 * @since v0.1.0
 */
export function isRangeError(value: unknown): value is RangeError {
    return value instanceof RangeError;
}

/**
 * Returns `true` and narrows the type if a given `value` is not an {@linkcode RangeError}.
 *
 * @since v0.1.0
 */
export function isNotRangeError<T>(value: RangeError | T): value is T {
    return !(value instanceof RangeError);
}
