import { isAbsent, isNull, isPresent, isUndefined } from './value';

export type Nullary<T> = () => T;
export type Fallback<T> = T | Nullary<T>;

export type Unary<T, U> = (value: T) => U;
export type Predicate<T> = (value: T) => boolean;

export type Bind<T, R> = Unary<T, Maybe<R>> | Unary<T, R | undefined | null>;
export type ArrayElement<T> = T extends Array<infer V> ? V : undefined;

export class Maybe<T> {
    public constructor(
        public readonly value: T | undefined | null,
    ) {
    }

    public that(is: Predicate<T>): Maybe<T> {
        if (isAbsent(this.value) || is(this.value)) {
            return this;
        }
        return nothing();
    }

    public then<R>(next: Bind<T, R>): Maybe<R> {
        if (isAbsent(this.value)) {
            return nothing();
        }
        return maybeOf<R>(next(this.value));
    }

    public pick<K extends keyof T>(property: K): Maybe<T[K]> {
        return this.then(v => v[property]);
    }

    public index(index: number): Maybe<ArrayElement<T>> {
        if (Array.isArray(this.value)) {
            return maybe<ArrayElement<T>>(this.value[index]);
        }
        return nothing();
    }

    public otherwise(fallback: Fallback<T>): T {
        if (isPresent(this.value)) {
            return this.value;
        }
        return fallbackTo(fallback);
    }

    public or(nothing: null): T | null
    public or(nothing: undefined): T | undefined
    public or(nothing: null | undefined): T | null | undefined {
        if (isPresent(this.value)) {
            return this.value;
        }
        return nothing;
    }

    public maybe<R>(next: Bind<T | undefined | null, R>): Maybe<R> {
        return maybeOf(next(this.value));
    }

    public optional<R>(next: Bind<T | undefined, R>): Maybe<R> {
        if (isNull(this.value)) {
            return nothing();
        }
        return maybeOf(next(this.value));
    }

    public nullable<R>(next: Bind<T | null, R>): Maybe<R> {
        if (isUndefined(this.value)) {
            return nothing();
        }
        return maybeOf(next(this.value));
    }
}

export function just<T>(value: T): Maybe<T> {
    return new Maybe<T>(value);
}

const none: Maybe<unknown> = new Maybe<unknown>(undefined);

export function nothing<T>(): Maybe<T> {
    return none as Maybe<T>;
}

const naught: Maybe<unknown> = new Maybe<unknown>(null);

export function nil<T>(): Maybe<T> {
    return naught as Maybe<T>;
}

export function maybe<T>(value: T | undefined | null): Maybe<T> {
    return new Maybe<T>(value);
}

export function nullable<T>(value: T | null): Maybe<T> {
    return new Maybe<T>(value);
}

export function optional<T>(value?: T): Maybe<T> {
    return new Maybe<T>(value);
}

/**
 * @package
 */
export function maybeOf<T>(value: Maybe<T> | T | undefined | null): Maybe<T> {
    if (value instanceof Maybe) {
        return value;
    }
    return maybe(value);
}

/**
 * @package
 */
export function fallbackTo<T>(fallback: Fallback<T>): T {
    if (fallback instanceof Function) {
        return fallback();
    }
    return fallback;
}
