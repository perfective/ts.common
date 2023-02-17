// eslint-disable-next-line max-classes-per-file -- Optional, Some and None are co-dependent
import { Predicate } from '../../boolean/predicate/predicate';
import { isTrue, Proposition } from '../../boolean/proposition/proposition';
import { Value, valueOf } from '../../function/function/nullary';
import { TypeGuard } from '../../value/type-guard/type-guard';
import { Defined, isDefined, isUndefined } from '../../value/value';

/* eslint-disable deprecation/deprecation -- TODO: Remove in v0.10.0 */

/**
 * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
 */
export abstract class Optional<T> {
    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract readonly value: T | undefined;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract onto<U>(
        flatMap: (value: T) => Optional<Defined<U>>,
    ): Optional<Defined<U>>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract to<U>(
        map: (value: T) => U | undefined,
    ): Optional<U>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract pick<K extends keyof T>(property: Value<K>): Optional<Defined<T[K]>>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract that(filter: Predicate<T>): Optional<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract which<U extends T>(filter: TypeGuard<T, U>): Optional<U>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract when(condition: Proposition): Optional<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract otherwise(fallback: Value<T>): Some<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract otherwise(fallback: Value<T | undefined>): Optional<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract or(fallback: Value<T>): T;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract or(fallback: Value<T | undefined>): T | undefined;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract run(procedure: (value: T) => void): Optional<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Maybe} instead.
     */
    public abstract lift<U>(
        map: (value: T | undefined) => U | undefined,
    ): Optional<U>;
}

/**
 * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
 */
export class Some<T> implements Optional<T> {
    public constructor(

        /**
         * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
         */
        public readonly value: Defined<T>,
    ) {
        // Catches an error when the given argument passes the type definition, but is undefined in runtime.
        if (isUndefined(this.value)) {
            throw new TypeError('The value of `Some` must not be `undefined`');
        }
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public onto<U>(flatMap: (value: T) => Some<Defined<U>>): Some<Defined<U>>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public onto<U>(flatMap: (value: T) => None<Defined<U>>): None<Defined<U>>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public onto<U>(flatMap: (value: T) => Optional<Defined<U>>): Optional<Defined<U>>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public onto<U>(
        flatMap: (value: T) => Optional<Defined<U>>,
    ): Optional<Defined<U>> {
        return flatMap(this.value);
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public to<U>(map: (value: T) => Defined<U>): Some<U>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public to<U>(map: (value: T) => undefined): None<U>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public to<U>(map: (value: T) => U | undefined): Optional<U>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public to<U>(map: (value: T) => U | undefined): Optional<U> | Some<U> | None<U> {
        return optional<U>(map(this.value));
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public pick<K extends keyof T>(
        property: Value<K>,
    ): T[K] extends Defined<T[K]> ? Some<T[K]> : Optional<Defined<T[K]>>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public pick<K extends keyof T>(property: Value<K>): Some<T[K]> | Optional<Defined<T[K]>> {
        return this.to(value => value[valueOf(property)]) as unknown as Optional<Defined<T[K]>>;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public that(filter: Predicate<T>): Optional<T> {
        if (filter(this.value)) {
            return this;
        }
        return none<T>();
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public which<U extends T>(filter: TypeGuard<T, U>): Optional<U> {
        if (filter(this.value)) {
            // When condition is true, this.value is of type U extends T.
            // Return it as is instead of passing it through just(this.value).
            return this as unknown as Some<U>;
        }
        return none<U>();
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public when(condition: Proposition): Optional<T> {
        if (isTrue(condition)) {
            return this;
        }
        return none<T>();
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public otherwise(fallback: Value<T | undefined>): Some<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public otherwise(): this {
        return this;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Just} instead.
     */
    public or(fallback: Value<T | undefined>): T;

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
    public lift<U>(map: (value: T) => U | undefined): Optional<U> {
        return optional(map(this.value));
    }
}

/**
 * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
 */
export class None<T> implements Optional<T> {
    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public readonly value: undefined;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public onto<U>(flatMap: (value: T) => Optional<Defined<U>>): None<Defined<U>>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public onto<U>(): None<Defined<U>> {
        return this as unknown as None<Defined<U>>;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public to<U>(map: (value: T) => (U | undefined)): None<U>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public to<U>(): None<U> {
        return this as unknown as None<U>;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public pick<K extends keyof T>(property: Value<K>): None<Defined<T[K]>>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public pick<K extends keyof T>(): None<Defined<T[K]>> {
        return this as unknown as None<Defined<T[K]>>;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public that(filter: Predicate<T>): None<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public that(): this {
        return this;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public which<U extends T>(filter: TypeGuard<T, U>): None<U>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public which<U extends T>(): None<U> {
        return this as unknown as None<U>;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public when(condition: Proposition): None<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public when(): this {
        return this;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public otherwise(fallback: Value<T>): Some<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public otherwise(fallback: Value<undefined>): None<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public otherwise(fallback: Value<T | undefined>): Optional<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public otherwise(fallback: Value<T | undefined>): Some<T> | None<T> | Optional<T> {
        return optional(valueOf(fallback));
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public or(fallback: Value<T>): T;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public or(fallback: Value<undefined>): undefined;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public or(fallback: Value<T | undefined>): T | undefined;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public or(
        fallback: Value<T | undefined> | Value<T>,
    ): T | undefined {
        return valueOf(fallback);
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public run(procedure: (value: T) => void): None<T>;

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public run(): this {
        return this;
    }

    /**
     * @deprecated Since v0.9.0. Use {@linkcode Nothing} instead.
     */
    public lift<U>(map: (value: undefined) => U | undefined): Optional<U> {
        return optional(map(this.value));
    }
}

/**
 * @deprecated Since v0.9.0. Use {@linkcode maybe} instead.
 */
export function optional<T>(value: Defined<T>): Some<T>;

/**
 * @deprecated Since v0.9.0. Use {@linkcode maybe} instead.
 */
export function optional<T>(value: undefined): None<T>;

/**
 * @deprecated Since v0.9.0. Use {@linkcode maybe} instead.
 */
export function optional<T>(value: T | undefined): Optional<T>;

/**
 * @deprecated Since v0.9.0. Use {@linkcode maybe} instead.
 */
export function optional<T>(value: T | undefined): Some<T> | None<T> | Optional<T> {
    if (isDefined(value)) {
        return some(value);
    }
    return none<T>();
}

/**
 * @deprecated Since v0.9.0. Use {@linkcode just} instead.
 */
export function some<T>(value: Defined<T>): Some<T> {
    return new Some<T>(value);
}

const cached: None<unknown> = new None<unknown>();

/**
 * @deprecated Since v0.9.0. Use {@linkcode nothing} instead.
 */
export function none<T>(): None<T> {
    return cached as None<T>;
}

/* eslint-enable deprecation/deprecation */
