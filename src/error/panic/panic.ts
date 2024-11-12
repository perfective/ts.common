import { Value, valueOf } from '../../function/function/nullary';
import { isDefined } from '../../value/value';
import { isError } from '../error/error';
import { caughtError, Exception, exception } from '../exception/exception';
import { ExceptionContext } from '../exception/exception-context';
import { exceptionMessage } from '../exception/exception-message';
import { ExceptionTokens } from '../exception/exception-tokens';

/**
 * A function that throws an {@linkcode Error}.
 *
 * @since v0.2.2
 */
export type Panic = (cause?: unknown) => never;

/**
 * Throws an {@linkcode Exception} with a given `message` template with `tokens`
 * and additional `context` data.
 *
 * @since v0.2.0
 */
export function throws(message: string, tokens?: ExceptionTokens, context?: ExceptionContext): never;

/**
 * Throws a given {@linkcode Error}.
 * If given a callback, throws an {@linkcode Error} returned by the callback.
 *
 * @since v0.1.0
 */
export function throws<E extends Error>(error: Value<E>): never;

export function throws<E extends Error>(
    first: Value<E> | string,
    second: ExceptionTokens = {},
    third: ExceptionContext = {},
): never {
    const error: Error | string = valueOf(first);
    if (isError(error)) {
        throw error;
    }
    throw exception(error, second, third);
}

/**
 * Creates a function that throws an {@linkcode Exception} with a given `message` template
 * with `tokens` and additional `context` data.
 * If the `cause` is defined, sets the `cause` as a `previous` error.
 *
 * @since v0.2.0
 */
export function panic(message: string, tokens?: ExceptionTokens, context?: ExceptionContext): Panic;

/**
 * Creates a function that throws a given {@linkcode Error}.
 * Ignores the `cause`, even when if is defined.
 *
 * @since v0.1.0
 */
export function panic<E extends Error>(error: Value<E>): Panic;

export function panic<E extends Error>(
    first: Value<E> | string,
    second: ExceptionTokens = {},
    third: ExceptionContext = {},
): Panic {
    return (cause?: unknown): never => {
        const error: Error | string = valueOf(first);
        if (isError(error)) {
            throw error;
        }
        throw new Exception(
            exceptionMessage(error, second),
            third,
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- cause is unknown and optional
            isDefined(cause) ? caughtError(cause) : null,
        );
    };
}

/**
 * Throws an {@linkcode Exception} with a given `message` caused by a `previous` {@linkcode Error}.
 * Exception message may contain given `tokens` and additional `context` data.
 *
 * @throws Exception - created with given parameters.
 *
 * @since v0.2.0
 */
export function rethrows(
    previous: Error,
    message: string,
    tokens: ExceptionTokens = {},
    context: ExceptionContext = {},
): never {
    throw new Exception(exceptionMessage(message, tokens), context, previous);
}
