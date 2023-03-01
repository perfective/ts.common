import { Unary } from '../../function/function/unary';

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
