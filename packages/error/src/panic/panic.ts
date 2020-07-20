import { isError } from '../error/error';
import { Exception, causedBy } from '../exception/exception';
import { ExceptionContext } from '../exception/exception-context';
import { exceptionMessage } from '../exception/exception-message';
import { ExceptionTokens } from '../exception/exception-tokens';

export function throws<E extends Error>(message: string, tokens?: ExceptionTokens, context?: ExceptionContext): never;
export function throws<E extends Error>(error: E | string): never;
export function throws<E extends Error>(
    error: E | string,
    tokens: ExceptionTokens = {},
    context: ExceptionContext = {},
): never {
    if (isError(error)) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal, rxjs/throw-error -- fails without an error type
        throw error;
    }
    throw new Exception(exceptionMessage(error, tokens), context, null);
}

export function panic<E extends Error>(
    message: string,
    tokens?: ExceptionTokens,
    context?: ExceptionContext,
): () => never;
export function panic<E extends Error>(error: E | string): () => never;
export function panic<E extends Error>(
    error: E | string,
    tokens: ExceptionTokens = {},
    context: ExceptionContext = {},
): () => never {
    // eslint-disable-next-line @typescript-eslint/no-extra-parens -- conflicts with no-confusing-arrow
    return (): never => (
        isError(error) ? throws(error) : throws(error, tokens, context)
    );
}

// eslint-disable-next-line max-params -- shorthand signature does not add complexity
export function rethrows(
    previous: Error,
    message: string,
    tokens: ExceptionTokens = {},
    context: ExceptionContext = {},
): never {
    throw new Exception(exceptionMessage(message, tokens), context, previous);
}

export function rethrow(
    message: string,
    tokens: ExceptionTokens = {},
    context: ExceptionContext = {},
): (previous: Error) => never {
    return (error: Error): never => throws(causedBy(error, message, tokens, context));
}
