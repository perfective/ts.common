// eslint-disable-next-line max-classes-per-file -- Maybe<T>, Just<T>, Null<T>, Nothing<T> create cyclic dependency
import { Predicate, Proposition, TypeGuard, Value, isTrue, valueOf } from '@perfective/fp';
import { Present, isNull, isPresent, isUndefined } from '@perfective/value';

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

    public which<U extends T>(filter: TypeGuard<T, U>): Maybe<U> {
        if (isPresent(this.value)) {
            if (filter(this.value)) {
                return this as unknown as Just<U>;
            }
            return this.none();
        }
        return this as unknown as Nothing<U> | Nil<U>;
    }

    public when(condition: Proposition): Maybe<T> {
        if (isPresent(this.value) && isTrue(condition)) {
            return this;
        }
        return this.none();
    }

    public pick<K extends keyof T>(property: Value<K>): Maybe<Present<T[K]>> {
        return this.to(v => v[valueOf(property)]) as unknown as Maybe<Present<T[K]>>;
    }

    public otherwise(fallback: Value<T>): Just<T>
    public otherwise(fallback: Value<T | null | undefined>): Maybe<T>
    public otherwise(fallback: Value<T | null | undefined>): Just<T> | Maybe<T> {
        if (isPresent(this.value)) {
            return just(this.value);
        }
        return maybe(valueOf(fallback));
    }

    public or(fallback: Value<T>): T
    public or(fallback: Value<T | null> | null): T | null
    public or(fallback: Value<T | undefined> | undefined): T | undefined
    public or(fallback: Value<T | null | undefined>): T | null | undefined
    public or(fallback: Value<T | null | undefined> | null | undefined): T | null | undefined {
        if (isPresent(this.value)) {
            return this.value;
        }
        if (isPresent(fallback)) {
            return valueOf(fallback);
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

    public onto<U>(bind: (value: T) => Just<Present<U>>): Just<U>
    public onto<U>(bind: (value: T) => Maybe<U>): Maybe<U>
    public onto<U>(bind: (value: T) => Maybe<U> | Just<U>): Maybe<U> | Just<U> {
        return super.onto(bind);
    }

    public to<U>(map: (value: T) => Present<U>): Just<U>
    public to<U>(map: (value: T) => U | null | undefined): Maybe<U>
    public to<U>(map: (value: T) => U | null | undefined): Maybe<U> | Just<U> {
        return super.to(map);
    }

    public otherwise(fallback: Value<T>): Just<T>
    // eslint-disable-next-line @typescript-eslint/unified-signatures -- unified signature causes compiler errors
    public otherwise(fallback: Value<T | null | undefined>): Just<T>
    public otherwise(fallback: Value<T | null | undefined>): Just<T> {
        return super.otherwise(fallback) as Just<T>;
    }

    public run(procedure: (value: T) => void): Just<T> {
        return super.run(procedure) as Just<T>;
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
