import { isAbsent, isNull, isPresent, isUndefined } from './value';

export type Nullary<T> = () => T;
export type Fallback<T> = T | Nullary<T>;

export type Unary<T, U> = (value: T) => U;
export type Predicate<T> = (value: T) => boolean;

export type Bind<T, R = T> = Unary<T, Maybe<R>> | Unary<T, R>;

export class Maybe<T> {
    public constructor(
        public readonly value?: T | null,
    ) {
    }

    public that(is: Predicate<T>): Maybe<T> {
        if (isPresent(this.value) && is(this.value)) {
            return this;
        }
        return nothing();
    }

    public then<R = T>(next: Bind<T, R>): Maybe<R> {
        if (isAbsent(this.value)) {
            return nothing();
        }
        return maybeOf(next(this.value));
    }

    public pick<K extends keyof T>(property: K): Maybe<T[K]> {
        if (isPresent(this.value)) {
            return maybe(this.value[property]);
        }
        return nothing();
    }

    public otherwise(fallback: Fallback<T>): T {
        if (isPresent(this.value)) {
            return this.value;
        }
        return fallbackTo(fallback);
    }

    public maybe<R = T>(next: Bind<T | undefined | null, R>): Maybe<R> {
        return maybeOf(next(this.value));
    }

    public optional<R = T>(next: Bind<T | undefined, R>): Maybe<R> {
        if (isNull(this.value)) {
            return nothing();
        }
        return maybeOf(next(this.value));
    }

    public nullable<R = T>(next: Bind<T | null, R>): Maybe<R> {
        if (isUndefined(this.value)) {
            return nothing();
        }
        return maybeOf(next(this.value));
    }
}

export function just<T>(value: T): Maybe<T> {
    return new Maybe<T>(value);
}

const none: Maybe<unknown> = new Maybe<unknown>();

export function nothing<T>(): Maybe<T> {
    return none as Maybe<T>;
}

const naught: Maybe<unknown> = new Maybe<unknown>(null);

export function nil<T>(): Maybe<T> {
    return naught as Maybe<T>;
}

export function maybe<T>(value?: T | null): Maybe<T> {
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
export function maybeOf<T>(value: T | Maybe<T>): Maybe<T> {
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
