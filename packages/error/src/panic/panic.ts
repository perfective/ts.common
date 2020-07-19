import { isError } from '../error/error';
import { Exception, causedBy } from '../exception/exception';
import { ExceptionContext } from '../exception/exception-context';

export function throws<E extends Error>(message: string, context?: ExceptionContext): never;
export function throws<E extends Error>(error: E | string): never;
export function throws<E extends Error>(error: E | string, context: ExceptionContext = {}): never {
    if (isError(error)) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal -- fails without an error type
        throw error;
    }
    throw new Exception(error, context, null);
}

export function panic<E extends Error>(message: string, context?: ExceptionContext): () => never;
export function panic<E extends Error>(error: E | string): () => never;
export function panic<E extends Error>(
    error: E | string,
    context: ExceptionContext = {},
): () => never {
    // eslint-disable-next-line @typescript-eslint/no-extra-parens -- conflicts with no-confusing-arrow
    return (): never => (isError(error) ? throws(error) : throws(error, context));
}

export function rethrows(previous: Error, message: string, context: ExceptionContext = {}): never {
    throw new Exception(message, context, previous);
}

export function rethrow(
    message: string,
    context: ExceptionContext = {},
): (previous: Error) => never {
    return (error: Error): never => throws(causedBy(error, message, context));
}
