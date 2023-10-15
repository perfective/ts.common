import { Predicate } from '../../boolean/predicate/predicate';
import { Proposition } from '../../boolean/proposition/proposition';
import { Value } from '../../function/function/nullary';
import { Unary, UnaryVoid } from '../../function/function/unary';
import { TypeGuard } from '../../value/type-guard/type-guard';
import { Present } from '../../value/value';

import { Just, Maybe } from './maybe';

/**
 * Creates a function that calls the {@linkcode Maybe.onto} method of the input `value` with a given `flatMap` callback.
 *
 * @since v0.4.0
 */
export function onto<T, U>(
    flatMap: (value: T) => Maybe<Present<U>>,
): Unary<Maybe<T>, Maybe<Present<U>>> {
    return (value: Maybe<T>): Maybe<Present<U>> => value.onto(flatMap);
}

/**
 * Creates a function that calls the {@linkcode Maybe.to} method of the input `value` with a given `map` callback.
 *
 * @since v0.4.0
 */
export function to<T, U>(
    map: (value: T) => U | null | undefined,
): Unary<Maybe<T>, Maybe<U>> {
    return (value: Maybe<T>): Maybe<U> => value.to(map);
}

/**
 * Creates a function that calls the {@linkcode Maybe.into} method of the input `value`
 * with a given `reduce` callback.
 *
 * @since 0.9.0
 */
export function into<T, U>(
    reduce: (value: T | null | undefined) => U,
): Unary<Maybe<T>, U> {
    return (value: Maybe<T>): U => value.into(reduce);
}

/**
 * Creates a function that calls the {@linkcode Maybe.pick} method of the input `value` with a given `property`.
 *
 * @since v0.4.0
 */
export function pick<T, K extends keyof T>(
    property: Value<K>,
): Unary<Maybe<T>, Maybe<Present<T[K]>>> {
    return (value: Maybe<T>): Maybe<Present<T[K]>> => value.pick(property);
}

/**
 * Creates a function that calls the {@linkcode Maybe.that} method of the input `value` with a given `filter` callback.
 *
 * @since v0.4.0
 */
export function that<T>(filter: Predicate<T>): Unary<Maybe<T>, Maybe<T>> {
    return (value: Maybe<T>): Maybe<T> => value.that(filter);
}

/**
 * Creates a function that calls the {@linkcode Maybe.which} method of the input `value`
 * with a given `filter` type guard.
 *
 * @since v0.5.0
 */
export function which<T, U extends T>(filter: TypeGuard<T, U>): Unary<Maybe<T>, Maybe<U>> {
    return (value: Maybe<T>): Maybe<U> => value.which(filter);
}

/**
 * Creates a function that calls the {@linkcode Maybe.when} method of the input `value`
 * with a given `condition` callback.
 *
 * @since v0.4.0
 */
export function when<T>(condition: Proposition): Unary<Maybe<T>, Maybe<T>> {
    return (value: Maybe<T>): Maybe<T> => value.when(condition);
}

/**
 * Creates a function that calls the {@linkcode Maybe.otherwise} method of the input `value`
 * with a given `fallback` value.
 *
 * @since v0.4.0
 */
export function otherwise<T>(fallback: Value<T>): Unary<Maybe<T>, Just<T>>;

/**
 * Creates a function that calls the {@linkcode Maybe.otherwise} method of the input `value`
 * with a given `fallback` value.
 *
 * @since v0.4.0
 */
export function otherwise<T>(fallback: Value<T | null | undefined>): Unary<Maybe<T>, Maybe<T>>;

export function otherwise<T>(fallback: Value<T | null | undefined>): Unary<Maybe<T>, Just<T> | Maybe<T>> {
    return (value: Maybe<T>): Just<T> | Maybe<T> => value.otherwise(fallback);
}

/**
 * Creates a function that calls the {@linkcode Maybe.or} method of the input `value` with a given `fallback` value.
 *
 * @since v0.4.0
 */
export function or<T>(fallback: Value<T>): Unary<Maybe<T>, T>;

/**
 * Creates a function that calls the {@linkcode Maybe.or} method of the input `value` with a given `fallback` value.
 *
 * @since v0.4.0
 */
export function or<T>(fallback: Value<T | null | undefined>): Unary<Maybe<T>, T | null | undefined>;

export function or<T>(fallback: Value<T> | Value<T | null | undefined>): Unary<Maybe<T>, T | null | undefined> {
    return (value: Maybe<T>): T | null | undefined => value.or(fallback);
}

/**
 * Creates a function that calls the {@linkcode Maybe.through} method of the input `value`
 * with a given `procedure` callback.
 *
 * @since v0.9.0
 */
export function through<T>(procedure: UnaryVoid<T>): Unary<Maybe<T>, Maybe<T>> {
    return (value: Maybe<T>): Maybe<T> => value.through(procedure);
}
