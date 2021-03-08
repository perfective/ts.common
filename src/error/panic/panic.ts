import { isError } from '../error/error';
import { causedBy, Exception } from '../exception/exception';
import { ExceptionContext } from '../exception/exception-context';
import { exceptionMessage } from '../exception/exception-message';
import { ExceptionTokens } from '../exception/exception-tokens';

export type Panic = () => never;
export type Rethrow<E extends Error = Error> = (previous: E) => never;

export function throws(message: string, tokens?: ExceptionTokens, context?: ExceptionContext): never;
export function throws<E extends Error>(error: E | (() => E) | string): never;
export function throws<E extends Error>(
    error: E | (() => E) | string,
    tokens: ExceptionTokens = {},
    context: ExceptionContext = {},
): never {
    if (isError(error)) {
        throw error as Error;
    }
    if (typeof error === 'function') {
        throw error() as Error;
    }
    throw new Exception(exceptionMessage(error, tokens), context, null);
}

export function panic(message: string, tokens?: ExceptionTokens, context?: ExceptionContext): Panic;
export function panic<E extends Error>(error: E | (() => E) | string): Panic;
export function panic<E extends Error>(
    error: E | (() => E) | string,
    tokens: ExceptionTokens = {},
    context: ExceptionContext = {},
): Panic {
    return (): never => {
        if (isError(error) || typeof error === 'function') {
            return throws(error);
        }
        return throws(error, tokens, context);
    };
}

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
): Rethrow {
    return (previous: Error): never => throws(causedBy(previous, message, tokens, context));
}
