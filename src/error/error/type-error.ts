/**
 * Creates a new {@linkcode TypeError} with a given `message`.
 *
 * @since v0.1.0
 */
export function typeError(message: string): TypeError {
    return new TypeError(message);
}

/**
 * Returns `true` and narrows the type if a given `value` is an {@linkcode TypeError}.
 *
 * @since v0.1.0
 */
export function isTypeError<T>(value: TypeError | T): value is TypeError {
    return value instanceof TypeError;
}

/**
 * Returns `true` and narrows the type if a given `value` is not an {@linkcode TypeError}.
 *
 * @since v0.1.0
 */
export function isNotTypeError<T>(value: TypeError | T): value is T {
    return !(value instanceof TypeError);
}
