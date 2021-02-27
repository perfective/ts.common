// eslint-disable-next-line max-classes-per-file -- Nullable, One, and Nil are co-dependent
import { isTrue, Predicate, Proposition, TypeGuard, Value, valueOf } from '@perfective/fp';
import { isNull, NotNull } from '@perfective/value';

import { Option } from '../option';

export abstract class Nullable<T> implements Option<T, null> {
    public abstract readonly value: T | null;

    public abstract onto<U>(
        flatMap: (value: T) => Nullable<U> | Solum<U> | Nil<U>,
    ): Nullable<U>;

    public abstract to<U>(
        map: (value: T) => U | null,
    ): Nullable<U>;

    // Using NotNull<T[K]> to exclude null from the type
    public abstract pick<K extends keyof T>(property: Value<K>): Nullable<NotNull<T[K]>>;

    public abstract that(filter: Predicate<T>): Nullable<T>;

    public abstract which<U extends T>(filter: TypeGuard<T, U>): Nullable<U>;

    public abstract when(condition: Proposition): Nullable<T>;

    public abstract otherwise(fallback: Value<T>): Solum<T>;
    public abstract otherwise(fallback: Value<T | null>): Nullable<T>;

    public abstract or(fallback: Value<T>): T;
    public abstract or(fallback: Value<T | null>): T | null;

    public abstract run(procedure: (value: T) => void): Nullable<T>;

    public abstract lift<U>(
        map: (value: T | null) => U | null,
    ): Nullable<U>;
}

export class Solum<T> implements Nullable<T> {
    public constructor(
        public readonly value: T,

    ) {}

    public onto<U>(flatMap: (value: T) => Solum<U>): Solum<U>
    public onto<U>(flatMap: (value: T) => Nil<U>): Nil<U>
    public onto<U>(flatMap: (value: T) => Nullable<U>): Nullable<U>
    public onto<U>(flatMap: (value: T) => Nullable<U> | Solum<U> | Nil<U>): Nullable<U> | Solum<U> | Nil<U> {
        return flatMap(this.value);
    }

    // Return type has to be NotNull<U> to exclude null from the type U
    public to<U>(map: (value: T) => NotNull<U>): Solum<U>
    public to<U>(map: (value: T) => null): Nil<U>
    public to<U>(map: (value: T) => U | null): Nullable<U>
    public to<U>(map: (value: T) => U | null): Nullable<U> | Solum<U> | Nil<U> {
        return nullable<U>(map(this.value));
    }

    public pick<K extends keyof T>(
        property: Value<K>,
    ): T[K] extends NotNull<T[K]> ? Solum<T[K]> : Nullable<NotNull<T[K]>>;

    public pick<K extends keyof T>(property: Value<K>): Solum<T[K]> | Nullable<NotNull<T[K]>> {
        return this.to(value => value[valueOf(property)]) as unknown as Nullable<NotNull<T[K]>>;
    }

    public that(filter: Predicate<T>): Nullable<T> {
        if (filter(this.value)) {
            return this;
        }
        return nil<T>();
    }

    public which<U extends T>(filter: TypeGuard<T, U>): Nullable<U> {
        if (filter(this.value)) {
            // When condition is true, this.value is of type U extends T.
            // Return it as is instead of passing it through just(this.value).
            return this as unknown as Solum<U>;
        }
        return nil<U>();
    }

    public when(condition: Proposition): Nullable<T> {
        if (isTrue(condition)) {
            return this;
        }
        return nil<T>();
    }

    public otherwise(fallback: Value<T | null>): Solum<T>
    public otherwise(): Solum<T> {
        return this;
    }

    public or(fallback: Value<T | null>): T
    public or(): T {
        return this.value;
    }

    public run(procedure: (value: T) => void): Solum<T> {
        procedure(this.value);
        return this;
    }

    public lift<U>(map: (value: T) => U | null): Nullable<U> {
        return nullable(map(this.value));
    }
}

/**
 * @final
 */
export class Nil<T>
implements Nullable<T> {
    public readonly value: null = null;

    public onto<U>(flatMap: (value: T) => Nullable<U> | Solum<U> | Nil<U>): Nil<U>
    public onto<U>(): Nil<U> {
        return this as unknown as Nil<U>;
    }

    public to<U>(map: (value: T) => (U | null)): Nil<U>
    public to<U>(): Nil<U> {
        return this as unknown as Nil<U>;
    }

    public pick<K extends keyof T>(property: Value<K>): Nil<NotNull<T[K]>>
    public pick<K extends keyof T>(): Nil<NotNull<T[K]>> {
        return this as unknown as Nil<NotNull<T[K]>>;
    }

    public that(filter: Predicate<T>): Nil<T>
    public that(): Nil<T> {
        return this;
    }

    public which<U extends T>(filter: TypeGuard<T, U>): Nil<U>
    public which<U extends T>(): Nil<U> {
        return this as unknown as Nil<U>;
    }

    public when(condition: Proposition): Nil<T>
    public when(): Nil<T> {
        return this;
    }

    public otherwise(fallback: Value<T>): Solum<T>
    public otherwise(fallback: Value<null>): Nil<T>;
    public otherwise(fallback: Value<T | null>): Nullable<T>
    public otherwise(fallback: Value<T | null>): Solum<T> | Nil<T> | Nullable<T> {
        return nullable(valueOf(fallback));
    }

    public or(fallback: Value<T>): T
    public or(fallback: Value<null>): null
    public or(fallback: Value<T | null>): T | null
    public or(
        fallback: Value<T | null> | Value<T>,
    ): T | null {
        return valueOf(fallback);
    }

    public run(procedure: (value: T) => void): Nil<T>
    public run(): Nil<T> {
        return this;
    }

    public lift<U>(map: (value: null) => U | null): Nullable<U> {
        return nullable(map(this.value));
    }
}

const naught: Nil<unknown> = new Nil<unknown>();

export function nil<T>(): Nil<T> {
    return naught as Nil<T>;
}

export function solum<T>(value: T): Solum<T> {
    return new Solum<T>(value);
}

export function nullable<T>(value: T | null): Nullable<T> {
    if (isNull(value)) {
        return nil() as unknown as Nullable<T>;
    }
    return solum(value);
}
