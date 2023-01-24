// eslint-disable-next-line max-classes-per-file -- Optional, Some and None are co-dependent
import { Predicate } from '../../boolean/predicate/predicate';
import { isTrue, Proposition } from '../../boolean/proposition/proposition';
import { Value, valueOf } from '../../function/function/nullary';
import { TypeGuard } from '../../value/type-guard/type-guard';
import { Defined, isDefined, isUndefined } from '../../value/value';
import { Option } from '../option';

export abstract class Optional<T> implements Option<T, undefined> {
    public abstract readonly value: T | undefined;

    public abstract onto<U>(
        flatMap: (value: T) => Optional<Defined<U>>,
    ): Optional<Defined<U>>;

    public abstract to<U>(
        map: (value: T) => U | undefined,
    ): Optional<U>;

    /**
     * Folds (reduces) the value of Optional using the given `fold` function.
     *
     * @since 0.9.0
     */
    public abstract into<U>(
        fold: (value: T | undefined) => U
    ): U;

    // Using Defined<T[K]> to exclude undefined from the type
    public abstract pick<K extends keyof T>(property: Value<K>): Optional<Defined<T[K]>>;

    public abstract that(filter: Predicate<T>): Optional<T>;

    public abstract which<U extends T>(filter: TypeGuard<T, U>): Optional<U>;

    public abstract when(condition: Proposition): Optional<T>;

    public abstract otherwise(fallback: Value<T>): Some<T>;
    public abstract otherwise(fallback: Value<T | undefined>): Optional<T>;

    public abstract or(fallback: Value<T>): T;
    public abstract or(fallback: Value<T | undefined>): T | undefined;

    public abstract run(procedure: (value: T) => void): Optional<T>;

    /**
     * Lifts a function into the Optional monad.
     *
     * @deprecated Since v0.9.0. Use `Optional.into(optionalOf)` instead.
     */
    // eslint-disable-next-line deprecation/deprecation -- to be removed in v0.10.0
    public abstract lift<U>(
        map: (value: T | undefined) => U | undefined,
    ): Optional<U>;
}

export class Some<T> implements Optional<T> {
    public constructor(
        public readonly value: Defined<T>,
    ) {
        // Catches an error when the given argument passes the type definition, but is undefined in runtime.
        if (isUndefined(this.value)) {
            throw new TypeError('The value of `Some` must not be `undefined`');
        }
    }

    public onto<U>(flatMap: (value: T) => Some<Defined<U>>): Some<Defined<U>>;
    public onto<U>(flatMap: (value: T) => None<Defined<U>>): None<Defined<U>>;
    public onto<U>(flatMap: (value: T) => Optional<Defined<U>>): Optional<Defined<U>>;
    public onto<U>(
        flatMap: (value: T) => Optional<Defined<U>>,
    ): Optional<Defined<U>> {
        return flatMap(this.value);
    }

    // Return type has to be Defined<U> to exclude undefined from the type U
    public to<U>(map: (value: T) => Defined<U>): Some<U>;
    public to<U>(map: (value: T) => undefined): None<U>;
    public to<U>(map: (value: T) => U | undefined): Optional<U>;
    public to<U>(map: (value: T) => U | undefined): Optional<U> | Some<U> | None<U> {
        return optional<U>(map(this.value));
    }

    /**
     * Folds (reduces) the value of Some using the given `fold` function.
     *
     * @since 0.9.0
     */
    public into<U>(fold: (value: T) => U): U {
        return fold(this.value);
    }

    public pick<K extends keyof T>(
        property: Value<K>,
    ): T[K] extends Defined<T[K]> ? Some<T[K]> : Optional<Defined<T[K]>>;

    public pick<K extends keyof T>(property: Value<K>): Some<T[K]> | Optional<Defined<T[K]>> {
        return this.to(value => value[valueOf(property)]) as unknown as Optional<Defined<T[K]>>;
    }

    public that(filter: Predicate<T>): Optional<T> {
        if (filter(this.value)) {
            return this;
        }
        return none<T>();
    }

    public which<U extends T>(filter: TypeGuard<T, U>): Optional<U> {
        if (filter(this.value)) {
            // When condition is true, this.value is of type U extends T.
            // Return it as is instead of passing it through just(this.value).
            return this as unknown as Some<U>;
        }
        return none<U>();
    }

    public when(condition: Proposition): Optional<T> {
        if (isTrue(condition)) {
            return this;
        }
        return none<T>();
    }

    public otherwise(fallback: Value<T | undefined>): Some<T>;
    public otherwise(): this {
        return this;
    }

    public or(fallback: Value<T | undefined>): T;
    public or(): T {
        return this.value;
    }

    public run(procedure: (value: T) => void): this {
        procedure(this.value);
        return this;
    }

    /**
     * Lifts a function into the Optional monad.
     *
     * @deprecated Since v0.9.0. Use `Optional.into(optionalOf)` instead.
     */
    public lift<U>(map: (value: T) => U | undefined): Optional<U> {
        return optional(map(this.value));
    }
}

export class None<T> implements Optional<T> {
    public readonly value: undefined;

    public onto<U>(flatMap: (value: T) => Optional<Defined<U>>): None<Defined<U>>;
    public onto<U>(): None<Defined<U>> {
        return this as unknown as None<Defined<U>>;
    }

    public to<U>(map: (value: T) => (U | undefined)): None<U>;
    public to<U>(): None<U> {
        return this as unknown as None<U>;
    }

    public pick<K extends keyof T>(property: Value<K>): None<Defined<T[K]>>;
    public pick<K extends keyof T>(): None<Defined<T[K]>> {
        return this as unknown as None<Defined<T[K]>>;
    }

    /**
     * Folds (reduces) the value of None using the given `fold` function.
     *
     * @since 0.9.0
     */
    public into<U>(fold: (value: undefined) => U): U {
        return fold(this.value);
    }

    public that(filter: Predicate<T>): None<T>;
    public that(): this {
        return this;
    }

    public which<U extends T>(filter: TypeGuard<T, U>): None<U>;
    public which<U extends T>(): None<U> {
        return this as unknown as None<U>;
    }

    public when(condition: Proposition): None<T>;
    public when(): this {
        return this;
    }

    public otherwise(fallback: Value<T>): Some<T>;
    public otherwise(fallback: Value<undefined>): None<T>;
    public otherwise(fallback: Value<T | undefined>): Optional<T>;
    public otherwise(fallback: Value<T | undefined>): Some<T> | None<T> | Optional<T> {
        return optional(valueOf(fallback));
    }

    public or(fallback: Value<T>): T;
    public or(fallback: Value<undefined>): undefined;
    public or(fallback: Value<T | undefined>): T | undefined;
    public or(
        fallback: Value<T | undefined> | Value<T>,
    ): T | undefined {
        return valueOf(fallback);
    }

    public run(procedure: (value: T) => void): None<T>;
    public run(): this {
        return this;
    }

    /**
     * Lifts a function into the Optional monad.
     *
     * @deprecated Since v0.9.0. Use `Optional.into(optionalOf)` instead.
     */
    public lift<U>(map: (value: undefined) => U | undefined): Optional<U> {
        return optional(map(this.value));
    }
}

export function optional<T>(value: Defined<T>): Some<T>;
export function optional<T>(value: undefined): None<T>;
export function optional<T>(value: T | undefined): Optional<T>;

export function optional<T>(value: T | undefined): Some<T> | None<T> | Optional<T> {
    if (isDefined(value)) {
        return some(value);
    }
    return none<T>();
}

export function some<T>(value: Defined<T>): Some<T> {
    return new Some<T>(value);
}

const cached: None<unknown> = new None<unknown>();

export function none<T>(): None<T> {
    return cached as None<T>;
}
