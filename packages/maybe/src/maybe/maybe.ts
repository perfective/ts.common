// Maybe<T>, Just<T>, Null<T>, Nothing<T> are cross-dependent and create cyclic dependency.
/* eslint-disable max-classes-per-file */
import { Fallback, Predicate, TypeGuard, fallbackTo } from '@perfective/fp';
import { Present, isNull, isPresent, isUndefined } from '@perfective/value';

export type Condition = Fallback<boolean>;

export type ArrayElement<T> = T extends readonly (infer V)[] ? V : undefined;

export abstract class Maybe<T> {
    protected constructor(
        public readonly value: T | null | undefined,
        private readonly none: <U>() => Nothing<U> | Nil<U>,
    ) {
    }

    public onto<U>(bind: (value: T) => Maybe<U>): Maybe<U> {
        if (isPresent(this.value)) {
            return bind(this.value);
        }
        return this.none();
    }

    public to<U>(map: (value: T) => U | null | undefined): Maybe<U> {
        if (isPresent(this.value)) {
            return maybe(map(this.value));
        }
        return this.none();
    }

    public that(filter: Predicate<T>): Maybe<T> {
        if (isPresent(this.value)) {
            if (filter(this.value)) {
                return this;
            }
            return this.none();
        }
        return this;
    }

    public has<U extends T>(filter: TypeGuard<T, U>): Maybe<U> {
        if (isPresent(this.value)) {
            if (filter(this.value)) {
                return this as unknown as Just<U>;
            }
            return this.none();
        }
        return this as unknown as Nothing<U> | Nil<U>;
    }

    public when(condition: Condition): Maybe<T> {
        if (isPresent(this.value) && isTrue(condition)) {
            return this;
        }
        return this.none();
    }

    public pick<K extends keyof T>(property: K): Maybe<Present<T[K]>> {
        return this.to(v => v[property]) as unknown as Maybe<Present<T[K]>>;
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

    public run(procedure: (value: T) => void): Maybe<T> {
        if (isPresent(this.value)) {
            procedure(this.value);
        }
        return this;
    }

    public lift<U>(map: (value: T | null | undefined) => U | null | undefined): Maybe<U> {
        return maybe(map(this.value));
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
export function isTrue(condition: Condition): boolean {
    if (condition instanceof Function) {
        return condition();
    }
    return condition;
}
