import { errorOutput, isError, stack } from '../error/error';

import { ExceptionContext } from './exception-context';
import { ExceptionMessage, exceptionMessage, exceptionMessageOutput } from './exception-message';
import { ExceptionTokens } from './exception-tokens';

/**
 * An {@linkcode Error} subclass that supports tokenized messages and previous errors chaining.
 *
 * Message tokens will be inlined into the {@linkcode Error.message},
 * but available in the {@linkcode Exception.template} and {@linkcode Exception.tokens}.
 *
 * @since v0.2.0
 */
// eslint-disable-next-line unicorn/custom-error-definition -- base class for user-defined errors
export class Exception
    extends Error {
    /**
     * Always `Exception`.
     */
    public override readonly name: string;

    /**
     * A template of the error message.
     * May contain tokens wrapped in double curly braces (i.e. {{ }}).
     * Token values should be provided in the {@linkcode Exception.tokens} property.
     *
     * @example 'Invalid user id {{uid}}'
     */
    public readonly template: string;

    /**
     * A map of tokens used in the {@linkcode Exception.template} and their (string) values.
     */
    public readonly tokens: ExceptionTokens;

    /**
     * Additional arbitrary data that may be useful for logging and debugging.
     */
    public readonly context: ExceptionContext;

    /**
     * A cause of an {@linkcode Exception}.
     * Can be any {@linkcode Error} or null, if there is no previous error.
     */
    public readonly previous: Error | null;

    public constructor(message: ExceptionMessage, context: ExceptionContext, previous: Error | null) {
        super(exceptionMessageOutput(message));
        // See https://www.typescriptlang.org/docs/handbook/2/classes.html#inheriting-built-in-types
        Object.setPrototypeOf(this, Exception.prototype);
        this.name = 'Exception';
        this.template = message.template;
        this.tokens = message.tokens;
        this.context = context;
        this.previous = previous;
    }

    /**
     * Unchains and concatenates all previous errors for user-readable output.
     */
    public override toString(): string {
        return unchained(this)
            .map(errorOutput)
            .join('\n\t- ');
    }
}

/**
 * Creates an {@linkcode Exception} with a given `message`, `tokens`, and `context`.
 * The {@linkcode Exception.previous} is null.
 *
 * @param message - An error message; may contain tokens wrapped in double curly braces.
 * @param tokens - A map of tokens listed in the `message` and their string values.
 * @param context - Additional arbitrary data that may be useful for logging and debugging.
 *
 * @since v0.2.0
 */
export function exception(message: string, tokens: ExceptionTokens = {}, context: ExceptionContext = {}): Exception {
    return new Exception(exceptionMessage(message, tokens), context, null);
}

/**
 * Creates a function to wrap a previous {@linkcode Error} into an {@linkcode Exception}.
 *
 * @param message - An error message; may contain tokens wrapped in double curly braces.
 * @param tokens - A map of tokens listed in the `message` and their string values.
 * @param context - Additional arbitrary data that may be useful for logging and debugging.
 *
 * @since v0.9.0
 */
export function chained(
    message: string,
    tokens: ExceptionTokens = {},
    context: ExceptionContext = {},
): (previous: Error) => Exception {
    return (previous: Error): Exception => causedBy(previous, message, tokens, context);
}

/**
 * Creates an {@linkcode Exception} with a given `previous` {@linkcode Error}.
 *
 * @param previous - A cause of the {@linkcode Exception}.
 * @param message - An error message; may contain tokens wrapped in double curly braces.
 * @param tokens - A map of tokens listed in the `message` and their string values.
 * @param context - Additional arbitrary data that may be useful for logging and debugging.
 *
 * @since v0.2.0
 */
export function causedBy(
    previous: Error,
    message: string,
    tokens: ExceptionTokens = {},
    context: ExceptionContext = {},
): Exception {
    return new Exception(exceptionMessage(message, tokens), context, previous);
}

/**
 * Wraps a non-{@linkcode Error} `value` into an {@linkcode Exception}.
 * The {@linkcode Exception.message} starts with `Caught`
 * and contains the caught `value` coerced to a string.
 *
 * Returns a given {@linkcode Error} `value` as is.
 *
 * Since v0.2.1 as `unknownError`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion
 *
 * @since v0.10.0
 */
export function caughtError(value: unknown): Error | Exception {
    if (isError(value)) {
        return value;
    }
    return exception('Caught {{error}}', {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string -- generic function
        error: String(value),
    }, { error: value });
}

/**
 * Returns true and narrows the type if a given `value` is an {@linkcode Exception}.
 *
 * @since v0.2.0
 */
export function isException(value: unknown): value is Exception {
    return value instanceof Exception;
}

/**
 * Returns true and narrows the type if a given `value` is not an {@linkcode Exception}.
 *
 * @since v0.2.0
 */
export function isNotException<T>(value: Exception | T): value is T {
    return !(value instanceof Exception);
}

/**
 * Creates an exception with the message about a type mismatch.
 *
 * @param name - Name of the value.
 * @param expected - Excepted value.
 * @param actual - Actual value.
 *
 * @since v0.11.0
 */
export function typeException(name: string, expected: string, actual: string): Exception {
    return exception(`{{name}} must be {{expected}}, but was {{actual}}`, {
        name,
        expected,
        actual,
    });
}

/**
 * Unwraps all chained errors and returns a user-readable stack of errors.
 *
 * @since v0.2.0
 */
export function chainStack(error: Error): string {
    return unchained(error)
        .map(stack)
        .join('\nCaused by: ');
}

/**
 * Returns the original cause {@linkcode Error} in the error chain.
 *
 * @since v0.2.0
 */
export function fault(error: Error): Error {
    const errors: Error[] = unchained(error);
    return errors[errors.length - 1];
}

/**
 * Unwraps a chain of previous errors and returns them as a list (sorted from most recent error to the original cause).
 *
 * @since v0.2.0
 */
export function unchained(error: Error): Error[] {
    if (isException(error) && error.previous !== null) {
        return [error as Error].concat(unchained(error.previous));
    }
    return [error];
}
