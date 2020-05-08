// Maybe<T>, Just<T>, Null<T>, Nothing<T> are cross-dependent and create cyclic dependency.
/* eslint-disable max-classes-per-file */
import {
    Predicate,
    Present,
    TypeGuard,
    Unary,
    isAbsent,
    isNull,
    isPresent,
    isUndefined,
} from '../value/value';

export type Nullary<T> = () => T;
export type Fallback<T> = T | Nullary<T>;
export type Condition = boolean | Nullary<boolean>;

export type Bind<T, R> = Unary<T, Maybe<R>> | Unary<T, R | null | undefined>;
export type ArrayElement<T> = T extends readonly (infer V)[] ? V : undefined;

export abstract class Maybe<T> {
    protected constructor(
        public readonly value: T | null | undefined,
        private readonly none: <U>() => Nothing<U> | Nil<U>,
    ) {
    }

    public that(is: Predicate<T>): Maybe<T> {
        if (isPresent(this.value)) {
            if (is(this.value)) {
                return this;
            }
            return this.none();
        }
        return this;
    }

    public with<V extends T>(is: TypeGuard<T, V>): Maybe<V> {
        if (isPresent(this.value)) {
            if (is(this.value)) {
                return this as unknown as Just<V>;
            }
            return this.none();
        }
        return this as unknown as Nothing<V> | Nil<V>;
    }

    public when(outside: Condition): Maybe<T> {
        if (isPresent(this.value) && holds(outside)) {
            return this;
        }
        return this.none();
    }

    // Overload can not be combined as TSC starts incorrectly infer type U
    public then<U>(next: (value: T) => Maybe<U>): Maybe<U>
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    public then<U>(next: (value: T) => U | null | undefined): Maybe<U>
    public then<U>(next: Bind<T, U>): Maybe<U> {
        if (isAbsent(this.value)) {
            return this.none();
        }
        return maybeOf<U>(next(this.value));
    }

    public pick<K extends keyof T>(property: K): Maybe<Present<T[K]>> {
        return this.then(v => v[property]) as unknown as Maybe<Present<T[K]>>;
    }

    public index(index: number): Maybe<Present<ArrayElement<T>>> {
        if (Array.isArray(this.value)) {
            return maybe<Present<ArrayElement<T>>>(this.value[index]);
        }
        return this.none();
    }

    public otherwise(fallback: Fallback<T>): Just<T> {
        if (isPresent(this.value)) {
            return just(this.value);
        }
        return just(fallbackTo(fallback));
    }

    public or(fallback: Fallback<T>): T
    public or(fallback: null): T | null
    public or(fallback: undefined): T | undefined
    public or(fallback: Fallback<T> | null | undefined): T | null | undefined {
        if (isPresent(this.value)) {
            return this.value;
        }
        if (isPresent(fallback)) {
            return fallbackTo(fallback);
        }
        return fallback;
    }

    public maybe<R>(next: Bind<T | null | undefined, R>): Maybe<R> {
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

/**
 * @sealed
 */
export class Just<T>
    extends Maybe<T> {
    public constructor(
        public readonly value: T,
    ) {
        super(value, nothing);
    }
}

export function just<T>(value: T): Just<T> {
    return new Just<T>(value);
}

/**
 * @sealed
 */
export class Nothing<T>
    extends Maybe<T> {
    public readonly value: undefined = undefined;

    public constructor() {
        super(undefined, nothing);
    }
}

const none: Nothing<unknown> = new Nothing<unknown>();

export function nothing<T>(): Nothing<T> {
    return none as Nothing<T>;
}

/**
 * @sealed
 */
export class Nil<T>
    extends Maybe<T> {
    public readonly value: null = null;

    public constructor() {
        super(null, nil);
    }
}

const naught: Nil<unknown> = new Nil<unknown>();

export function nil<T>(): Nil<T> {
    return naught as Nil<T>;
}

export function maybe<T>(value: T | null | undefined): Maybe<T> {
    if (isUndefined(value)) {
        return nothing();
    }
    if (isNull(value)) {
        return nil();
    }
    return just(value);
}

export function nullable<T>(value: T | null): Maybe<T> {
    if (isNull(value)) {
        return nil();
    }
    return just(value);
}

export function optional<T>(value: T | undefined): Maybe<T> {
    if (isUndefined(value)) {
        return nothing();
    }
    return just(value);
}

/**
 * @package
 */
export function maybeOf<T>(value: Maybe<T> | T | null | undefined): Maybe<T> {
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

/**
 * @package
 */
export function holds(condition: Condition): boolean {
    if (condition instanceof Function) {
        return condition();
    }
    return condition;
}
