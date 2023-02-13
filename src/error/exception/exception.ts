import { errorOutput, isError, stack } from '../error/error';

import { ExceptionContext } from './exception-context';
import { ExceptionMessage, exceptionMessage, exceptionMessageOutput } from './exception-message';
import { ExceptionTokens } from './exception-tokens';

// eslint-disable-next-line unicorn/custom-error-definition -- base class for user-defined errors
export class Exception
    extends Error {
    public override readonly name: string;
    public readonly template: string;
    public readonly tokens: ExceptionTokens;

    public constructor(
        message: ExceptionMessage,
        public readonly context: ExceptionContext,
        public readonly previous: Error | null,
    ) {
        super(exceptionMessageOutput(message));
        this.name = 'Exception';
        this.template = message.template;
        this.tokens = message.tokens;
    }

    public override toString(): string {
        return unchained(this)
            .map(errorOutput)
            .join('\n\t- ');
    }
}

export function exception(message: string, tokens: ExceptionTokens = {}, context: ExceptionContext = {}): Exception {
    return new Exception(exceptionMessage(message, tokens), context, null);
}

/**
 * Creates a function to wrap a previous {@linkcode Error}
 * into an {@linkcode Exception} with a given {@linkcode message}.
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

export function causedBy(
    previous: Error,
    message: string,
    tokens: ExceptionTokens = {},
    context: ExceptionContext = {},
): Exception {
    return new Exception(exceptionMessage(message, tokens), context, previous);
}

/**
 * Wraps a non-{@linkcode Error} {@linkcode value} into an {@linkcode Exception}.
 * The {@linkcode Exception.message} starts with `Unknown error`
 * and contains the given {@linkcode value} coerced to a string.
 *
 * Returns an original {@linkcode value} when given an {@linkcode Error}.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion
 */
export function unknownError(value: unknown): Error | Exception {
    if (isError(value)) {
        return value;
    }
    return exception('Unknown error: {{error}}', {
        error: String(value),
    }, { error: value });
}

export function isException<T>(value: Exception | T): value is Exception {
    return value instanceof Exception;
}

export function isNotException<T>(value: Exception | T): value is T {
    return !(
        value instanceof Exception
    );
}

export function chainStack(error: Error): string {
    return unchained(error)
        .map(stack)
        .join('\nCaused by: ');
}

export function fault(error: Error): Error {
    const errors: Error[] = unchained(error);
    return errors[errors.length - 1];
}

export function unchained(error: Error): Error[] {
    if (isException(error) && error.previous !== null) {
        return [error as Error].concat(unchained(error.previous));
    }
    return [error];
}
