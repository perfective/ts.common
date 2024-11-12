import { isDefined } from '../../value/value';

/**
 * Creates a new {@linkcode Error} with a given `message`.
 *
 * @since v0.1.0
 */
export function error(message: string): Error {
    return new Error(message);
}

/**
 * Returns `true` and narrows the type if a given `value` is an {@linkcode Error}.
 *
 * @since v0.1.0
 */
export function isError(value: unknown): value is Error {
    return value instanceof Error;
}

/**
 * Returns `true` and narrows the type if a given `value` is not an {@linkcode Error}.
 *
 * @since v0.1.0
 */
export function isNotError<T>(value: Error | T): value is T {
    return !(value instanceof Error);
}

/**
 * A generic output for an {@linkcode Error}.
 *
 * @returns The same string as {@linkcode Error.toString} in Node.js.
 *
 * @since v0.2.0
 */
export function errorOutput(error: Error): string {
    return `${error.name}: ${error.message}`.replace(/: $/u, '');
}

/**
 * Returns the {@linkcode Error.stack} value if its defined.
 * Otherwise, creates a similar stack line from a {@linkcode Error.message} and the "at <unknown>" prefix.
 *
 * @since v0.2.0
 */
export function stack(error: Error): string {
    if (isDefined(error.stack)) {
        return error.stack;
    }
    return [error.message, 'at <unknown>'].join('\n    ');
}
