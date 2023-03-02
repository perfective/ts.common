import { Unary } from '../../function/function/unary';
import { isDefined } from '../../value/value';

import { BiMapResult } from './arguments';
import { Failure, Result } from './result';

/**
 * Creates a function to apply a given {@linkcode flatMap} callback to the {@linkcode Result.onto} method
 * and return the result of the {@linkcode flatMap} (a {@linkcode Failure}).
 *
 * @since v0.9.0
 */
export function onto<T, U>(flatMap: (value: T) => Failure<U>): Unary<Result<T>, Failure<U>>;

/**
 * Creates a function to apply a given {@linkcode flatMap} callback to the {@linkcode Result.onto} method
 * and return the result of the {@linkcode flatMap} call.
 *
 * @since v0.9.0
 */
export function onto<T, U>(flatMap: (value: T) => Result<U>): Unary<Result<T>, Result<U>>;

export function onto<T, U>(flatMap: (value: T) => Result<U>): Unary<Result<T>, Result<U>> {
    return (input: Result<T>): Result<U> => input.onto(flatMap);
}

/**
 * Creates a function to apply given {@linkcode mapValue} and {@linkcode mapError} callbacks
 * to the {@linkcode Result.to} method and return the result.
 *
 * @since v0.9.0
 */
export function to<T, U>(mapValue: Unary<T, U>, mapError?: Unary<Error, Error>): Unary<Result<T>, Result<U>>;

/**
 * Creates a function to apply a given {@linkcode maps} callbacks pair to the {@linkcode Result.to} method
 * and return the result.
 *
 * @since v0.9.0
 */
export function to<T, U>(maps: BiMapResult<T, U>): Unary<Result<T>, Result<U>>;

export function to<T, U>(
    first: Unary<T, U> | BiMapResult<T, U>,
    second?: Unary<Error, Error>,
): Unary<Result<T>, Result<U>> {
    const [mapValue, mapError] = Array.isArray(first) ? [first[0], first[1]] : [first, second];
    if (isDefined(mapError)) {
        return (result: Result<T>): Result<U> => result.to(mapValue, mapError);
    }
    return (result: Result<T>): Result<U> => result.to(mapValue);
}
