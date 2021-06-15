// eslint-disable-next-line max-classes-per-file -- Maybe<T>, Just<T>, and Nothing<T> are co-dependent
import { Predicate } from '../../boolean/predicate/predicate';
import { isTrue, Proposition } from '../../boolean/proposition/proposition';
import { Value, valueOf } from '../../function/function/nullary';
import { TypeGuard } from '../../value/type-guard/type-guard';
import { isAbsent, isNull, isPresent, Present } from '../../value/value/value';
import { Option } from '../option';

/**
 * @sealed
 *
 * @see Just
 * @see Nothing
 * @see Nil
 */
export abstract class Maybe<T> implements Option<T, null | undefined> {
    public abstract readonly value: T | null | undefined;

    public abstract onto<U>(
        flatMap: (value: T) => Maybe<Present<U>>,
    ): Maybe<Present<U>>;

    public abstract to<U>(
        map: (value: T) => U | null | undefined,
    ): Maybe<U>;

    // Using Present<T[K]> to exclude null | undefined from the type
    public abstract pick<K extends keyof T>(property: Value<K>): Maybe<Present<T[K]>>;

    public abstract that(filter: Predicate<T>): Maybe<T>;

    public abstract which<U extends T>(filter: TypeGuard<T, U>): Maybe<U>;

    public abstract when(condition: Proposition): Maybe<T>;

    public abstract otherwise(fallback: Value<T>): Just<T>;
    public abstract otherwise(fallback: Value<T | null | undefined>): Maybe<T>;

    public abstract or(fallback: Value<T>): T;
    public abstract or(fallback: Value<T | null>): T | null;
    public abstract or(fallback: Value<T | undefined>): T | undefined;
    public abstract or(fallback: Value<T | null | undefined>): T | null | undefined;

    public abstract run(procedure: (value: T) => void): Maybe<T>;

    public abstract lift<U>(map: (value: T | null | undefined) => U | null | undefined): Maybe<U>;
}

/**
 * @final
 */
export class Just<T> implements Maybe<T> {
    public constructor(
        public readonly value: Present<T>,
    ) {
        if (isAbsent(this.value)) {
            throw new TypeError('Just value must be present');
        }
    }

    public onto<U>(flatMap: (value: T) => Just<Present<U>>): Just<Present<U>>
    public onto<U>(flatMap: (value: T) => Nothing<Present<U>>): Nothing<Present<U>>
    public onto<U>(flatMap: (value: T) => Maybe<Present<U>>): Maybe<Present<U>>
    public onto<U>(
        flatMap: (value: T) => Maybe<Present<U>>,
    ): Maybe<Present<U>> {
        return flatMap(this.value);
    }

    // Return type has to be Present<U> to exclude null or undefined from the type U
    public to<U>(map: (value: T) => Present<U>): Just<U>
    public to<U>(map: (value: T) => null | undefined): Nothing<U>
    public to<U>(map: (value: T) => U | null | undefined): Maybe<U>
    public to<U>(map: (value: T) => U | null | undefined): Maybe<U> | Just<U> | Nothing<U> {
        return maybe<U>(map(this.value));
    }

    public pick<K extends keyof T>(
        property: Value<K>,
    ): T[K] extends Present<T[K]> ? Just<T[K]> : Maybe<Present<T[K]>>;

    public pick<K extends keyof T>(property: Value<K>): Just<T[K]> | Maybe<Present<T[K]>> {
        return this.to(value => value[valueOf(property)]) as unknown as Maybe<Present<T[K]>>;
    }

    public that(filter: Predicate<T>): Maybe<T> {
        if (filter(this.value)) {
            return this;
        }
        return nothing<T>();
    }

    public which<U extends T>(filter: TypeGuard<T, U>): Maybe<U> {
        if (filter(this.value)) {
            // When condition is true, this.value is of type U extends T.
            // Return it as is instead of passing it through just(this.value).
            return this as unknown as Just<U>;
        }
        return nothing<U>();
    }

    public when(condition: Proposition): Maybe<T> {
        if (isTrue(condition)) {
            return this;
        }
        return nothing<T>();
    }

    public otherwise(fallback: Value<T | null | undefined>): Just<T>
    public otherwise(): Just<T> {
        return this;
    }

    public or(fallback: Value<T | null | undefined>): T
    public or(): T {
        return this.value;
    }

    public run(procedure: (value: T) => void): Just<T> {
        procedure(this.value);
        return this;
    }

    public lift<U>(map: (value: T) => U | null | undefined): Maybe<U> {
        return maybe(map(this.value));
    }
}

/**
 * @final
 */
export class Nothing<T> implements Maybe<T> {
    public constructor(
        public readonly value: null | undefined,
    ) {
        if (isPresent(this.value)) {
            throw new TypeError('Nothing value must be absent');
        }
    }

    public onto<U>(
        flatMap: (value: T) => Maybe<Present<U>>,
    ): Nothing<Present<U>>
    public onto<U>(): Nothing<U> {
        return this as unknown as Nothing<U>;
    }

    public to<U>(map: (value: T) => (U | null | undefined)): Nothing<U>
    public to<U>(): Nothing<U> {
        return this as unknown as Nothing<U>;
    }

    public pick<K extends keyof T>(property: Value<K>): Nothing<Present<T[K]>>
    public pick<K extends keyof T>(): Nothing<Present<T[K]>> {
        return this as unknown as Nothing<Present<T[K]>>;
    }

    public that(filter: Predicate<T>): Nothing<T>
    public that(): Nothing<T> {
        return this;
    }

    public which<U extends T>(filter: TypeGuard<T, U>): Nothing<U>
    public which<U extends T>(): Nothing<U> {
        return this as unknown as Nothing<U>;
    }

    public when(condition: Proposition): Nothing<T>
    public when(): Nothing<T> {
        return this;
    }

    public otherwise(fallback: Value<T>): Just<T>
    public otherwise(fallback: Value<null | undefined>): Nothing<T>;
    public otherwise(fallback: Value<T | null | undefined>): Maybe<T>
    public otherwise(fallback: Value<T | null | undefined>): Just<T> | Nothing<T> | Maybe<T> {
        return maybe(valueOf(fallback));
    }

    public or(fallback: Value<T>): T
    public or(fallback: Value<null>): null
    public or(fallback: Value<undefined>): undefined
    public or(fallback: Value<T | null>): T | null
    public or(fallback: Value<T | undefined>): T | undefined
    public or(fallback: Value<T | null | undefined>): T | null | undefined
    public or(
        fallback: Value<T | null | undefined> | Value<T | null> | Value<T | undefined> | Value<T>,
    ): T | null | undefined {
        return valueOf(fallback);
    }

    public run(procedure: (value: T) => void): Nothing<T>
    public run(): Nothing<T> {
        return this;
    }

    public lift<U>(map: (value: null | undefined) => U | null | undefined): Maybe<U> {
        return maybe(map(this.value));
    }
}

export function maybe<T>(value: T | null | undefined): Maybe<T> {
    if (isPresent(value)) {
        // TODO: Update `isPresent` signature to return `Present<T>`
        return just(value as Present<T>);
    }
    if (isNull(value)) {
        return naught();
    }
    return nothing();
}

export function just<T>(value: Present<T>): Just<T> {
    return new Just<T>(value);
}

interface Memo {
    nothing: Nothing<unknown>;
    naught: Nothing<unknown>;
}

const memo: Memo = {
    nothing: new Nothing(undefined),
    naught: new Nothing(null),
};

export function nothing<T>(): Nothing<T> {
    return memo.nothing as Nothing<T>;
}

export function naught<T>(): Nothing<T> {
    return memo.naught as Nothing<T>;
}
