// eslint-disable-next-line max-classes-per-file -- Nullable, One, and Nil are co-dependent
import { Predicate } from '../../boolean/predicate/predicate';
import { isTrue, Proposition } from '../../boolean/proposition/proposition';
import { Value, valueOf } from '../../function/function/nullary';
import { TypeGuard } from '../../value/type-guard/type-guard';
import { isNotNull, isNull, NotNull } from '../../value/value';

/* eslint-disable deprecation/deprecation -- TODO: Remove in v0.10.0 */
/* eslint-disable jsdoc/require-description -- Skip description in JSDocs that mark code as deprecated */

/**
 * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
 */
export abstract class Nullable<T> {
    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract readonly value: T | null;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract onto<U>(
        flatMap: (value: T) => Nullable<NotNull<U>>,
    ): Nullable<NotNull<U>>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract to<U>(
        map: (value: T) => U | null,
    ): Nullable<U>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract pick<K extends keyof T>(property: Value<K>): Nullable<NotNull<T[K]>>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract that(filter: Predicate<T>): Nullable<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract which<U extends T>(filter: TypeGuard<T, U>): Nullable<U>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract when(condition: Proposition): Nullable<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract otherwise(fallback: Value<T>): Only<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract otherwise(fallback: Value<T | null>): Nullable<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract or(fallback: Value<T>): T;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract or(fallback: Value<T | null>): T | null;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract run(procedure: (value: T) => void): Nullable<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public abstract lift<U>(
        map: (value: T | null) => U | null,
    ): Nullable<U>;
}

/**
 * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
 */
export class Only<T> implements Nullable<T> {
    public constructor(

        /**
         * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
         */
        public readonly value: NotNull<T>,
    ) {
        // Catches an error when the given argument passes the type definition, but is null in runtime.
        if (isNull(this.value)) {
            throw new TypeError('The value of `Only` must be not `null`');
        }
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public onto<U>(flatMap: (value: T) => Only<NotNull<U>>): Only<NotNull<U>>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public onto<U>(flatMap: (value: T) => Nil<NotNull<U>>): Nil<NotNull<U>>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public onto<U>(flatMap: (value: T) => Nullable<NotNull<U>>): Nullable<NotNull<U>>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public onto<U>(
        flatMap: (value: T) => Nullable<NotNull<U>>,
    ): Nullable<NotNull<U>> {
        return flatMap(this.value);
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public to<U>(map: (value: T) => NotNull<U>): Only<U>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public to<U>(map: (value: T) => null): Nil<U>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public to<U>(map: (value: T) => U | null): Nullable<U>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public to<U>(map: (value: T) => U | null): Nullable<U> | Only<U> | Nil<U> {
        return nullable<U>(map(this.value));
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public pick<K extends keyof T>(
        property: Value<K>,
    ): T[K] extends NotNull<T[K]> ? Only<T[K]> : Nullable<NotNull<T[K]>>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public pick<K extends keyof T>(property: Value<K>): Only<T[K]> | Nullable<NotNull<T[K]>> {
        return this.to(value => value[valueOf(property)]) as unknown as Nullable<NotNull<T[K]>>;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public that(filter: Predicate<T>): Nullable<T> {
        if (filter(this.value)) {
            return this;
        }
        return nil<T>();
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public which<U extends T>(filter: TypeGuard<T, U>): Nullable<U> {
        if (filter(this.value)) {
            // When condition is true, this.value is of type U extends T.
            // Return it as is instead of passing it through just(this.value).
            return this as unknown as Only<U>;
        }
        return nil<U>();
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public when(condition: Proposition): Nullable<T> {
        if (isTrue(condition)) {
            return this;
        }
        return nil<T>();
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public otherwise(fallback: Value<T | null>): Only<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public otherwise(): this {
        return this;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public or(fallback: Value<T | null>): T;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public or(): T {
        return this.value;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public run(procedure: (value: T) => void): this {
        procedure(this.value);
        return this;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public lift<U>(map: (value: T) => U | null): Nullable<U> {
        return nullable(map(this.value));
    }
}

/**
 * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
 */
export class Nil<T>
implements Nullable<T> {
    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public readonly value: null = null;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public onto<U>(flatMap: (value: T) => Nullable<NotNull<U>>): Nil<NotNull<U>>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public onto<U>(): Nil<NotNull<U>> {
        return this as unknown as Nil<NotNull<U>>;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public to<U>(map: (value: T) => (U | null)): Nil<U>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public to<U>(): Nil<U> {
        return this as unknown as Nil<U>;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public pick<K extends keyof T>(property: Value<K>): Nil<NotNull<T[K]>>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public pick<K extends keyof T>(): Nil<NotNull<T[K]>> {
        return this as unknown as Nil<NotNull<T[K]>>;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public that(filter: Predicate<T>): Nil<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public that(): this {
        return this;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public which<U extends T>(filter: TypeGuard<T, U>): Nil<U>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public which<U extends T>(): Nil<U> {
        return this as unknown as Nil<U>;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public when(condition: Proposition): Nil<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public when(): this {
        return this;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public otherwise(fallback: Value<T>): Only<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public otherwise(fallback: Value<null>): Nil<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public otherwise(fallback: Value<T | null>): Nullable<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public otherwise(fallback: Value<T | null>): Only<T> | Nil<T> | Nullable<T> {
        return nullable(valueOf(fallback));
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public or(fallback: Value<T>): T;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public or(fallback: Value<null>): null;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public or(fallback: Value<T | null>): T | null;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public or(
        fallback: Value<T | null> | Value<T>,
    ): T | null {
        return valueOf(fallback);
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public run(procedure: (value: T) => void): Nil<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public run(): this {
        return this;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public lift<U>(map: (value: null) => U | null): Nullable<U> {
        return nullable(map(this.value));
    }
}

const naught: Nil<unknown> = new Nil<unknown>();

/**
 * @deprecated Since v0.9.0. Use {@linkcode naught} instead.
 */
export function nil<T>(): Nil<T> {
    return naught as Nil<T>;
}

/**
 * @deprecated Since v0.9.0. Use {@linkcode just} instead.
 */
export function only<T>(value: NotNull<T>): Only<T> {
    return new Only<T>(value);
}

/**
 * @deprecated Since v0.9.0. Use {@linkcode maybe} instead.
 */
export function nullable<T>(value: NotNull<T>): Only<T>;

/**
 * @deprecated Since v0.9.0. Use {@linkcode maybe} instead.
 */
export function nullable<T>(value: null): Nil<T>;

/**
 * @deprecated Since v0.9.0. Use {@linkcode maybe} instead.
 */
export function nullable<T>(value: T | null): Nullable<T>;

/**
 * @deprecated Since v0.9.0. Use {@linkcode maybe} instead.
 */
export function nullable<T>(value: T | null): Only<T> | Nil<T> | Nullable<T> {
    if (isNotNull(value)) {
        return only(value);
    }
    return nil<T>();
}

/**
 * @see Only<T>
 * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
 */
export type Solum<T> = Only<T>;

/**
 * @see only
 * @deprecated Since v0.9.0. Use {@linkcode just} instead.
 */
export function solum<T>(value: NotNull<T>): Solum<T> {
    return only(value);
}

/* eslint-enable jsdoc/require-description */
/* eslint-enable deprecation/deprecation */
