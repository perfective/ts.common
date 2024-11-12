/**
 * Creates a new {@linkcode EvalError} with a given `message`.
 *
 * @since v0.1.0
 */
export function evalError(message: string): EvalError {
    return new EvalError(message);
}

/**
 * Returns `true` and narrows the type if a given `value` is an {@linkcode EvalError}.
 *
 * @since v0.1.0
 */
export function isEvalError(value: unknown): value is EvalError {
    return value instanceof EvalError;
}

/**
 * Returns `true` and narrows the type if a given `value` is not an {@linkcode EvalError}.
 *
 * @since v0.1.0
 */
export function isNotEvalError<T>(value: EvalError | T): value is T {
    return !(value instanceof EvalError);
}
