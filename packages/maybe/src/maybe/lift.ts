import { Predicate, Proposition, TypeGuard, Unary, Value } from '@perfective/fp';
import { Present } from '@perfective/value';

import { Just, Maybe } from './maybe';

export function onto<T, U>(bind: (value: T) => Maybe<U>): Unary<Maybe<T>, Maybe<U>> {
    return (maybe: Maybe<T>): Maybe<U> => maybe.onto(bind);
}

export function to<T, U>(map: (value: T) => U): Unary<Maybe<T>, Maybe<U>> {
    return (maybe: Maybe<T>): Maybe<U> => maybe.to(map);
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

export function pick<T, K extends keyof T>(
    property: Value<K>,
): Unary<Maybe<T>, Maybe<Present<T[K]>>> {
    return (maybe: Maybe<T>): Maybe<Present<T[K]>> => maybe.pick(property);
}

export function otherwise<T>(fallback: Value<T>): Unary<Maybe<T>, Just<T>> {
    return (maybe: Maybe<T>): Just<T> => maybe.otherwise(fallback);
}

export function or<T>(fallback: Value<T>): Unary<Maybe<T>, T>;
export function or<T>(fallback: Value<T | null> | null): Unary<Maybe<T>, T | null>;
export function or<T>(fallback: Value<T | undefined> | undefined): Unary<Maybe<T>, T | undefined>;
export function or<T>(fallback: Value<T | null | undefined>): Unary<Maybe<T>, T | null | undefined>;
export function or<T>(
    fallback: Value<T | null | undefined> | null | undefined,
): Unary<Maybe<T>, T | null | undefined> {
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
