import { Predicate } from '../../boolean/predicate/predicate';
import { Proposition } from '../../boolean/proposition/proposition';
import { Value } from '../../function/function/nullary';
import { Unary } from '../../function/function/unary';
import { TypeGuard } from '../../value/type-guard/type-guard';
import { Present } from '../../value/value';

import { Just, Maybe } from './maybe';

export function onto<T, U>(
    flatMap: (value: T) => Maybe<Present<U>>,
): Unary<Maybe<T>, Maybe<Present<U>>> {
    return (maybe: Maybe<T>): Maybe<Present<U>> => maybe.onto(flatMap);
}

export function to<T, U>(
    map: (value: T) => U | null | undefined,
): Unary<Maybe<T>, Maybe<U>> {
    return (maybe: Maybe<T>): Maybe<U> => maybe.to(map);
}

/**
 * Creates a function to apply the given fold function to the Maybe.into() method.
 *
 * @since 0.9.0
 */
export function into<T, U>(
    fold: (value: T | null | undefined) => U,
): Unary<Maybe<T>, U> {
    return (maybe: Maybe<T>): U => maybe.into(fold);
}

export function pick<T, K extends keyof T>(
    property: Value<K>,
): Unary<Maybe<T>, Maybe<Present<T[K]>>> {
    return (maybe: Maybe<T>): Maybe<Present<T[K]>> => maybe.pick(property);
}

export function that<T>(filter: Predicate<T>): Unary<Maybe<T>, Maybe<T>> {
    return (maybe: Maybe<T>): Maybe<T> => maybe.that(filter);
}

export function which<T, U extends T>(filter: TypeGuard<T, U>): Unary<Maybe<T>, Maybe<U>> {
    return (maybe: Maybe<T>): Maybe<U> => maybe.which(filter);
}

export function when<T>(condition: Proposition): Unary<Maybe<T>, Maybe<T>> {
    return (maybe: Maybe<T>): Maybe<T> => maybe.when(condition);
}

export function otherwise<T>(fallback: Value<T>): Unary<Maybe<T>, Just<T>>;
export function otherwise<T>(fallback: Value<T | null | undefined>): Unary<Maybe<T>, Maybe<T>>;
export function otherwise<T>(fallback: Value<T | null | undefined>): Unary<Maybe<T>, Just<T> | Maybe<T>> {
    return (maybe: Maybe<T>): Just<T> | Maybe<T> => maybe.otherwise(fallback);
}

export function or<T>(fallback: Value<T>): Unary<Maybe<T>, T>;
export function or<T>(fallback: Value<T | null | undefined>): Unary<Maybe<T>, T | null | undefined>;
export function or<T>(fallback: Value<T> | Value<T | null | undefined>): Unary<Maybe<T>, T | null | undefined> {
    return (maybe: Maybe<T>): T | null | undefined => maybe.or(fallback);
}

export function run<T>(procedure: (value: T) => void): Unary<Maybe<T>, Maybe<T>> {
    return (maybe: Maybe<T>): Maybe<T> => maybe.run(procedure);
}

export function lift<T, U>(
    map: (value: T | null | undefined) => U | null | undefined,
): Unary<Maybe<T>, Maybe<U>> {
    return (maybe: Maybe<T>): Maybe<U> => maybe.lift(map);
}
