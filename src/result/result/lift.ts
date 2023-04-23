import { Predicate } from '../../boolean/predicate/predicate';
import { Value } from '../../function/function/nullary';
import { Unary, UnaryVoid } from '../../function/function/unary';
import { defined } from '../../value/value';

import { BiFoldResult, BiMapResult, BiVoidResult } from './arguments';
import { Failure, Result } from './result';

/**
 * Creates a function to apply a given {@linkcode value} callback to the {@linkcode Result.onto} method
 * and return the result of the {@linkcode value} (a {@linkcode Failure}).
 *
 * @since v0.9.0
 */
export function onto<T, U>(value: Unary<T, Failure<U>>): Unary<Result<T>, Failure<U>>;

/**
 * Creates a function to apply a given {@linkcode value} callback to the {@linkcode Result.onto} method
 * and return the result of the {@linkcode value}.
 *
 * @since v0.9.0
 */
export function onto<T, U>(value: Unary<T, Result<U>>): Unary<Result<T>, Result<U>>;

export function onto<T, U>(first: Unary<T, Result<U>>): Unary<Result<T>, Result<U>> {
    return (result: Result<T>): Result<U> => result.onto(first);
}

/**
 * Creates a function to apply given {@linkcode value} and {@linkcode error} callbacks
 * to the {@linkcode Result.to} method and return the result.
 *
 * @since v0.9.0
 */
export function to<T, U>(value: Unary<T, U>, error?: Unary<Error, Error>): Unary<Result<T>, Result<U>>;

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
    if (Array.isArray(first)) {
        return (result: Result<T>): Result<U> => result.to(first[0], first[1]);
    }
    return (result: Result<T>): Result<U> => result.to(first, second);
}

/**
 * Creates a function to apply given {@linkcode value} and {@linkcode error} callbacks
 * to the {@linkcode Result.into} method and return the result.
 *
 * @since v0.9.0
 */
export function into<T, U>(value: Unary<T, U>, error: Unary<Error, U>): Unary<Result<T>, U>;

/**
 * Creates a function to apply a given {@linkcode fold} callbacks pair
 * to the {@linkcode Result.into} method and return the result.
 *
 * @since v0.9.0
 */
export function into<T, U>(fold: BiFoldResult<T, U>): Unary<Result<T>, U>;

export function into<T, U>(
    first: Unary<T, U> | BiFoldResult<T, U>,
    second?: Unary<Error, U>,
): Unary<Result<T>, U> {
    if (Array.isArray(first)) {
        return (result: Result<T>): U => result.into(first[0], first[1]);
    }
    return (result: Result<T>): U => result.into(first, defined(second));
}

/**
 * Creates a function to apply given {@linkcode filter} predicate and {@linkcode error}
 * to the {@linkcode Result.that} method and return the result.
 *
 * @since v0.9.0
 */
export function that<T>(filter: Predicate<T>, error: Value<Error>): Unary<Result<T>, Result<T>>;

/**
 * Creates a function to apply a {@linkcode filter} predicate and {@linkcode message}
 * to the {@linkcode Result.that} method and return the result.
 *
 * @since v0.9.0
 */
export function that<T>(filter: Predicate<T>, message: Value<string>): Unary<Result<T>, Result<T>>;

export function that<T>(first: Predicate<T>, second: Value<Error> | Value<string>): Unary<Result<T>, Result<T>> {
    // Second argument always matches signature of the `Result.that()`, but TSC does not recognize it.
    return (result: Result<T>): Result<T> => result.that(first, second as Value<Error>);
}

/**
 * Creates a function to apply given {@linkcode value} and {@linkcode error} callbacks
 * to the {@linkcode Result.through} method and return the given {@linkcode Result}.
 *
 * @since v0.9.0
 */
export function through<T>(value: UnaryVoid<T>, error: UnaryVoid<Error>): Unary<Result<T>, Result<T>>;

/**
 * Creates a function to apply a given {@linkcode procedures} callbacks pair to the {@linkcode Result.through} method
 * and return the given {@linkcode Result}.
 *
 * @since v0.9.0
 */
export function through<T>(procedures: BiVoidResult<T>): Unary<Result<T>, Result<T>>;

export function through<T>(
    first: UnaryVoid<T> | BiVoidResult<T>,
    second?: UnaryVoid<Error>,
): Unary<Result<T>, Result<T>> {
    if (Array.isArray(first)) {
        return (result: Result<T>): Result<T> => result.through(first[0], first[1]);
    }
    return (result: Result<T>): Result<T> => result.through(first, second);
}
