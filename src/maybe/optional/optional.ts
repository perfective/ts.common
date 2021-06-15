// eslint-disable-next-line max-classes-per-file -- Optional, Some and None are co-dependent
import { Predicate } from '../../boolean/predicate/predicate';
import { isTrue, Proposition } from '../../boolean/proposition/proposition';
import { Value, valueOf } from '../../function/function/nullary';
import { TypeGuard } from '../../value/type-guard/type-guard';
import { Defined, isUndefined } from '../../value/value/value';
import { Option } from '../option';

export abstract class Optional<T> implements Option<T, undefined> {
    public abstract readonly value: T | undefined;

    public abstract onto<U>(
        flatMap: (value: T) => Optional<Defined<U>>,
    ): Optional<Defined<U>>;

    public abstract to<U>(
        map: (value: T) => U | undefined,
    ): Optional<U>;

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

    public abstract lift<U>(
        map: (value: T | undefined) => U | undefined,
    ): Optional<U>;
}

export class Some<T> implements Optional<T> {
    public constructor(
        public readonly value: Defined<T>,
    ) {
        if (isUndefined(this.value)) {
            throw new TypeError('Some value must be defined');
        }
    }

    public onto<U>(flatMap: (value: T) => Some<Defined<U>>): Some<Defined<U>>
    public onto<U>(flatMap: (value: T) => None<Defined<U>>): None<Defined<U>>
    public onto<U>(flatMap: (value: T) => Optional<Defined<U>>): Optional<Defined<U>>
    public onto<U>(
        flatMap: (value: T) => Optional<Defined<U>>,
    ): Optional<Defined<U>> {
        return flatMap(this.value);
    }

    // Return type has to be Defined<U> to exclude undefined from the type U
    public to<U>(map: (value: T) => Defined<U>): Some<U>
    public to<U>(map: (value: T) => undefined): None<U>
    public to<U>(map: (value: T) => U | undefined): Optional<U>
    public to<U>(map: (value: T) => U | undefined): Optional<U> | Some<U> | None<U> {
        return optional<U>(map(this.value));
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

    public otherwise(fallback: Value<T | undefined>): Some<T>
    public otherwise(): Some<T> {
        return this;
    }

    public or(fallback: Value<T | undefined>): T
    public or(): T {
        return this.value;
    }

    public run(procedure: (value: T) => void): Some<T> {
        procedure(this.value);
        return this;
    }

    public lift<U>(map: (value: T) => U | undefined): Optional<U> {
        return optional(map(this.value));
    }
}

export class None<T> implements Optional<T> {
    public readonly value: undefined;

    public onto<U>(flatMap: (value: T) => Optional<Defined<U>>): None<Defined<U>>
    public onto<U>(): None<Defined<U>> {
        return this as unknown as None<Defined<U>>;
    }

    public to<U>(map: (value: T) => (U | undefined)): None<U>
    public to<U>(): None<U> {
        return this as unknown as None<U>;
    }

    public pick<K extends keyof T>(property: Value<K>): None<Defined<T[K]>>
    public pick<K extends keyof T>(): None<Defined<T[K]>> {
        return this as unknown as None<Defined<T[K]>>;
    }

    public that(filter: Predicate<T>): None<T>
    public that(): None<T> {
        return this;
    }

    public which<U extends T>(filter: TypeGuard<T, U>): None<U>
    public which<U extends T>(): None<U> {
        return this as unknown as None<U>;
    }

    public when(condition: Proposition): None<T>
    public when(): None<T> {
        return this;
    }

    public otherwise(fallback: Value<T>): Some<T>
    public otherwise(fallback: Value<undefined>): None<T>;
    public otherwise(fallback: Value<T | undefined>): Optional<T>
    public otherwise(fallback: Value<T | undefined>): Some<T> | None<T> | Optional<T> {
        return optional(valueOf(fallback));
    }

    public or(fallback: Value<T>): T
    public or(fallback: Value<undefined>): undefined
    public or(fallback: Value<T | undefined>): T | undefined
    public or(
        fallback: Value<T | undefined> | Value<T>,
    ): T | undefined {
        return valueOf(fallback);
    }

    public run(procedure: (value: T) => void): None<T>
    public run(): None<T> {
        return this;
    }

    public lift<U>(map: (value: undefined) => U | undefined): Optional<U> {
        return optional(map(this.value));
    }
}

export function optional<T>(value: T | undefined): Optional<T> {
    if (isUndefined(value)) {
        return none<T>();
    }
    return some(value as Defined<T>);
}

export function some<T>(value: Defined<T>): Some<T> {
    return new Some<T>(value);
}

const cached: None<unknown> = new None<unknown>();

export function none<T>(): None<T> {
    return cached as None<T>;
}
