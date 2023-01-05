// eslint-disable-next-line max-classes-per-file -- Nullable, One, and Nil are co-dependent
import { Predicate } from '../../boolean/predicate/predicate';
import { isTrue, Proposition } from '../../boolean/proposition/proposition';
import { Value, valueOf } from '../../function/function/nullary';
import { TypeGuard } from '../../value/type-guard/type-guard';
import { isNotNull, isNull, NotNull } from '../../value/value';
import { Option } from '../option';

export abstract class Nullable<T> implements Option<T, null> {
    public abstract readonly value: T | null;

    public abstract onto<U>(
        flatMap: (value: T) => Nullable<NotNull<U>>,
    ): Nullable<NotNull<U>>;

    public abstract to<U>(
        map: (value: T) => U | null,
    ): Nullable<U>;

    /**
     * Folds (reduces) the value of Nullable using the given `fold` function.
     *
     * @since 0.9.0
     */
    public abstract into<U>(
        fold: (value: T | null) => U,
    ): U;

    // Using NotNull<T[K]> to exclude null from the type
    public abstract pick<K extends keyof T>(property: Value<K>): Nullable<NotNull<T[K]>>;

    public abstract that(filter: Predicate<T>): Nullable<T>;

    public abstract which<U extends T>(filter: TypeGuard<T, U>): Nullable<U>;

    public abstract when(condition: Proposition): Nullable<T>;

    public abstract otherwise(fallback: Value<T>): Only<T>;
    public abstract otherwise(fallback: Value<T | null>): Nullable<T>;

    public abstract or(fallback: Value<T>): T;
    public abstract or(fallback: Value<T | null>): T | null;

    public abstract run(procedure: (value: T) => void): Nullable<T>;

    public abstract lift<U>(
        map: (value: T | null) => U | null,
    ): Nullable<U>;
}

export class Only<T> implements Nullable<T> {
    public constructor(
        public readonly value: NotNull<T>,
    ) {
        // Catches an error when the given argument passes the type definition, but is null in runtime.
        if (isNull(this.value)) {
            throw new TypeError('The value of `Only` must be not `null`');
        }
    }

    public onto<U>(flatMap: (value: T) => Only<NotNull<U>>): Only<NotNull<U>>;
    public onto<U>(flatMap: (value: T) => Nil<NotNull<U>>): Nil<NotNull<U>>;
    public onto<U>(flatMap: (value: T) => Nullable<NotNull<U>>): Nullable<NotNull<U>>;
    public onto<U>(
        flatMap: (value: T) => Nullable<NotNull<U>>,
    ): Nullable<NotNull<U>> {
        return flatMap(this.value);
    }

    // Return type has to be NotNull<U> to exclude null from the type U
    public to<U>(map: (value: T) => NotNull<U>): Only<U>;
    public to<U>(map: (value: T) => null): Nil<U>;
    public to<U>(map: (value: T) => U | null): Nullable<U>;
    public to<U>(map: (value: T) => U | null): Nullable<U> | Only<U> | Nil<U> {
        return nullable<U>(map(this.value));
    }

    /**
     * Folds (reduces) the value of Only using the given `fold` function.
     *
     * @since 0.9.0
     */
    public into<U>(fold: (value: T) => U): U {
        return fold(this.value);
    }

    public pick<K extends keyof T>(
        property: Value<K>,
    ): T[K] extends NotNull<T[K]> ? Only<T[K]> : Nullable<NotNull<T[K]>>;

    public pick<K extends keyof T>(property: Value<K>): Only<T[K]> | Nullable<NotNull<T[K]>> {
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
            return this as unknown as Only<U>;
        }
        return nil<U>();
    }

    public when(condition: Proposition): Nullable<T> {
        if (isTrue(condition)) {
            return this;
        }
        return nil<T>();
    }

    public otherwise(fallback: Value<T | null>): Only<T>;
    public otherwise(): this {
        return this;
    }

    public or(fallback: Value<T | null>): T;
    public or(): T {
        return this.value;
    }

    public run(procedure: (value: T) => void): this {
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

    public onto<U>(flatMap: (value: T) => Nullable<NotNull<U>>): Nil<NotNull<U>>;
    public onto<U>(): Nil<NotNull<U>> {
        return this as unknown as Nil<NotNull<U>>;
    }

    public to<U>(map: (value: T) => (U | null)): Nil<U>;
    public to<U>(): Nil<U> {
        return this as unknown as Nil<U>;
    }

    /**
     * Folds (reduces) the value of Nil using the given `fold` function.
     *
     * @since 0.9.0
     */
    public into<U>(fold: (value: null) => U): U {
        return fold(this.value);
    }

    public pick<K extends keyof T>(property: Value<K>): Nil<NotNull<T[K]>>;
    public pick<K extends keyof T>(): Nil<NotNull<T[K]>> {
        return this as unknown as Nil<NotNull<T[K]>>;
    }

    public that(filter: Predicate<T>): Nil<T>;
    public that(): this {
        return this;
    }

    public which<U extends T>(filter: TypeGuard<T, U>): Nil<U>;
    public which<U extends T>(): Nil<U> {
        return this as unknown as Nil<U>;
    }

    public when(condition: Proposition): Nil<T>;
    public when(): this {
        return this;
    }

    public otherwise(fallback: Value<T>): Only<T>;
    public otherwise(fallback: Value<null>): Nil<T>;
    public otherwise(fallback: Value<T | null>): Nullable<T>;
    public otherwise(fallback: Value<T | null>): Only<T> | Nil<T> | Nullable<T> {
        return nullable(valueOf(fallback));
    }

    public or(fallback: Value<T>): T;
    public or(fallback: Value<null>): null;
    public or(fallback: Value<T | null>): T | null;
    public or(
        fallback: Value<T | null> | Value<T>,
    ): T | null {
        return valueOf(fallback);
    }

    public run(procedure: (value: T) => void): Nil<T>;
    public run(): this {
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

export function only<T>(value: NotNull<T>): Only<T> {
    return new Only<T>(value);
}

export function nullable<T>(value: NotNull<T>): Only<T>;
export function nullable<T>(value: null): Nil<T>;
export function nullable<T>(value: T | null): Nullable<T>;

export function nullable<T>(value: T | null): Only<T> | Nil<T> | Nullable<T> {
    if (isNotNull(value)) {
        return only(value);
    }
    return nil<T>();
}

/**
 * @see Only<T>
 * @deprecated Since v0.9.0. Use Only<T> instead.
 */
export type Solum<T> = Only<T>;

/**
 * @see only
 * @deprecated Since v0.9.0. Use only() instead.
 */
// eslint-disable-next-line deprecation/deprecation -- providing Solum until v0.10.0
export function solum<T>(value: NotNull<T>): Solum<T> {
    return only(value);
}
