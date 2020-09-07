import { isError } from '../error/error';
import { Exception, causedBy } from '../exception/exception';
import { ExceptionContext } from '../exception/exception-context';
import { exceptionMessage } from '../exception/exception-message';
import { ExceptionTokens } from '../exception/exception-tokens';

export type Panic = () => never;

export function throws(message: string, tokens?: ExceptionTokens, context?: ExceptionContext): never;
export function throws<E extends Error>(error: E | string): never;
export function throws<E extends Error>(
    error: E | string,
    tokens: ExceptionTokens = {},
    context: ExceptionContext = {},
): never {
    if (isError(error)) {
        throw error as Error;
    }
    throw new Exception(exceptionMessage(error, tokens), context, null);
}

export function panic(message: string, tokens?: ExceptionTokens, context?: ExceptionContext): Panic;
export function panic<E extends Error>(error: E | string): Panic;
export function panic<E extends Error>(
    error: E | string,
    tokens: ExceptionTokens = {},
    context: ExceptionContext = {},
): Panic {
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
