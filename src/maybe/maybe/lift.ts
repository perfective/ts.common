import { Predicate } from '../../boolean/predicate/predicate';
import { Proposition } from '../../boolean/proposition/proposition';
import { Value } from '../../function/function/nullary';
import { Unary } from '../../function/function/unary';
import { TypeGuard } from '../../value/type-guard/type-guard';
import { Present } from '../../value/value';

import { Just, Maybe } from './maybe';

/**
 * Creates a function that calls the {@linkcode Maybe.onto} method with a given {@linkcode flatMap}.
 */
export function onto<T, U>(
    flatMap: (value: T) => Maybe<Present<U>>,
): Unary<Maybe<T>, Maybe<Present<U>>> {
    return (maybe: Maybe<T>): Maybe<Present<U>> => maybe.onto(flatMap);
}

/**
 * Creates a function that calls the {@linkcode Maybe.to} method with a given {@linkcode map}.
 */
export function to<T, U>(
    map: (value: T) => U | null | undefined,
): Unary<Maybe<T>, Maybe<U>> {
    return (maybe: Maybe<T>): Maybe<U> => maybe.to(map);
}

/**
 * Creates a function that applies a given {@linkcode reduce} callback to the {@linkcode Maybe.into} method.
 *
 * @since 0.9.0
 */
export function into<T, U>(
    reduce: (value: T | null | undefined) => U,
): Unary<Maybe<T>, U> {
    return (maybe: Maybe<T>): U => maybe.into(reduce);
}

/**
 * Creates a function that calls the {@linkcode Maybe.pick} method with a given {@linkcode property} value.
 */
export function pick<T, K extends keyof T>(
    property: Value<K>,
): Unary<Maybe<T>, Maybe<Present<T[K]>>> {
    return (maybe: Maybe<T>): Maybe<Present<T[K]>> => maybe.pick(property);
}

/**
 * Creates a function that calls the {@linkcode Maybe.filter} method with a given {@linkcode filter} callback.
 */
export function that<T>(filter: Predicate<T>): Unary<Maybe<T>, Maybe<T>> {
    return (maybe: Maybe<T>): Maybe<T> => maybe.that(filter);
}

/**
 * Creates a function that calls the {@linkcode Maybe.which} method with a given {@linkcode filter} callback.
 */
export function which<T, U extends T>(filter: TypeGuard<T, U>): Unary<Maybe<T>, Maybe<U>> {
    return (maybe: Maybe<T>): Maybe<U> => maybe.which(filter);
}

/**
 * Creates a function that calls the {@linkcode Maybe.when} method with a given {@linkcode condition} callback.
 */
export function when<T>(condition: Proposition): Unary<Maybe<T>, Maybe<T>> {
    return (maybe: Maybe<T>): Maybe<T> => maybe.when(condition);
}

/**
 * Creates a function that calls the {@linkcode Maybe.otherwise} method with a given {@linkcode fallback} value.
 */
export function otherwise<T>(fallback: Value<T>): Unary<Maybe<T>, Just<T>>;

/**
 * Creates a function that calls the {@linkcode Maybe.otherwise} method with a given {@linkcode fallback} value.
 */
export function otherwise<T>(fallback: Value<T | null | undefined>): Unary<Maybe<T>, Maybe<T>>;

export function otherwise<T>(fallback: Value<T | null | undefined>): Unary<Maybe<T>, Just<T> | Maybe<T>> {
    return (maybe: Maybe<T>): Just<T> | Maybe<T> => maybe.otherwise(fallback);
}

/**
 * Creates a function that calls the {@linkcode Maybe.or} method with a given {@linkcode fallback} value.
 */
export function or<T>(fallback: Value<T>): Unary<Maybe<T>, T>;

/**
 * Creates a function that calls the {@linkcode Maybe.or} method with a given {@linkcode fallback} value.
 */
export function or<T>(fallback: Value<T | null | undefined>): Unary<Maybe<T>, T | null | undefined>;

export function or<T>(fallback: Value<T> | Value<T | null | undefined>): Unary<Maybe<T>, T | null | undefined> {
    return (maybe: Maybe<T>): T | null | undefined => maybe.or(fallback);
}

/**
 * Creates a function that calls the {@linkcode Maybe.through} method with a given {@linkcode procedure} callback.
 *
 * @since v0.9.0
 */
export function through<T>(procedure: (value: T) => void): Unary<Maybe<T>, Maybe<T>> {
    return (maybe: Maybe<T>): Maybe<T> => maybe.through(procedure);
}
