/**
 * Creates a new {@linkcode ReferenceError} with a given `message`.
 *
 * @since v0.1.0
 */
export function referenceError(message: string): ReferenceError {
    return new ReferenceError(message);
}

/**
 * Returns `true` and narrows the type if a given `value` is an {@linkcode ReferenceError}.
 *
 * @since v0.1.0
 */
export function isReferenceError(value: unknown): value is ReferenceError {
    return value instanceof ReferenceError;
}

/**
 * Returns `true` and narrows the type if a given `value` is not an {@linkcode ReferenceError}.
 *
 * @since v0.1.0
 */
export function isNotReferenceError<T>(value: ReferenceError | T): value is T {
    return !(value instanceof ReferenceError);
}
