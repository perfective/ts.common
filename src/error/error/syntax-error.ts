/**
 * Creates a new {@linkcode SyntaxError} with a given `message`.
 *
 * @since v0.1.0
 */
export function syntaxError(message: string): SyntaxError {
    return new SyntaxError(message);
}

/**
 * Returns `true` and narrows the type if a given `value` is an {@linkcode SyntaxError}.
 *
 * @since v0.1.0
 */
export function isSyntaxError<T>(value: SyntaxError | T): value is SyntaxError {
    return value instanceof SyntaxError;
}

/**
 * Returns `true` and narrows the type if a given `value` is not an {@linkcode SyntaxError}.
 *
 * @since v0.1.0
 */
export function isNotSyntaxError<T>(value: SyntaxError | T): value is T {
    return !(value instanceof SyntaxError);
}
