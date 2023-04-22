// eslint-disable-next-line max-classes-per-file -- Maybe<T>, Just<T>, and Nothing<T> are co-dependent
import { Predicate } from '../../boolean/predicate/predicate';
import { isTrue, Proposition } from '../../boolean/proposition/proposition';
import { Value, valueOf } from '../../function/function/nullary';
import { Unary } from '../../function/function/unary';
import { TypeGuard } from '../../value/type-guard/type-guard';
import { isNull, isPresent, isUndefined, Present } from '../../value/value';

/**
 * Type {@linkcode Maybe} contains a defined and non-null value `T`
 * (as an instance of {@linkcode Just})
 * or a {@linkcode null} or an {@linkcode undefined} value
 * (as an instance of {@linkcode Nothing}).
 *
 * @see Just
 * @see Nothing
 */
export abstract class Maybe<T> {
    /**
     * Either a present value of type `T` or an absent value (null or undefined).
     */
    public abstract readonly value: T | null | undefined;

    /**
     * Applies a given {@linkcode flatMap} callback to the {@linkcode Just.value},
     * if the instance is a {@linkcode Just}.
     * Returns the result of the {@linkcode flatMap}.
     *
     * If the instance is a {@linkcode Nothing},
     * ignores the {@linkcode flatMap} callback and returns itself.
     */
    public abstract onto<U>(
        flatMap: (value: T) => Maybe<Present<U>>,
    ): Maybe<Present<U>>;

    /**
     * Applies a given {@linkcode map} callback to the {@linkcode Just.value},
     * if the instance is a {@linkcode Just}.
     * Returns the result of the {@linkcode map} wrapped into a {@linkcode Maybe}.
     *
     * If the instance is a {@linkcode Nothing},
     * ignores the {@linkcode map} callback and returns itself.
     */
    public abstract to<U>(
        map: (value: T) => U | null | undefined,
    ): Maybe<U>;

    /**
     * Applies a given {@linkcode reduce} callback to the {@linkcode Maybe.value}.
     *
     * @returns The result of the {@linkcode reduce}.
     * @since 0.9.0
     */
    public abstract into<U>(
        reduce: (value: T | null | undefined) => U
    ): U;

    /**
     * If an instance is a {@linkcode Just},
     * returns a value of a given {@linkcode Just.value} {@linkcode property} wrapped into a {@linkcode Maybe}.
     *
     * If an instance is a {@linkcode Nothing},
     * ignores the {@linkcode property} argument and returns itself.
     */
    // Using Present<T[K]> to exclude null | undefined from the type.
    public abstract pick<K extends keyof T>(property: Value<K>): Maybe<Present<T[K]>>;

    /**
     * If an instance is a {@linkcode Just},
     * applies a given {@linkcode filter} callback to the {@linkcode Just.value}.
     * Returns the original {@linkcode Just} when the {@linkcode filter} returns true,
     * otherwise returns {@linkcode Nothing}.
     *
     * If an instance is a {@linkcode Nothing},
     * ignores the {@linkcode filter} callback and returns itself.
     */
    public abstract that(filter: Predicate<T>): Maybe<T>;

    /**
     * If an instance is a {@linkcode Just},
     * applies a given {@linkcode filter} type guard to the {@linkcode Just.value}.
     * Returns the original {@linkcode Just} with a narrowed down type of the {@linkcode Just.value},
     * when the {@linkcode filter} returns true.
     *
     * If an instance is a {@linkcode Nothing},
     * ignores the {@linkcode filter} callback and returns itself.
     */
    public abstract which<U extends T>(filter: TypeGuard<T, U>): Maybe<U>;

    /**
     * If an instance is a {@linkcode Just},
     * evaluates a given {@linkcode condition} callback
     * (regardless of the {@linkcode Just.value}).
     *
     * Returns the original {@linkcode Just} when the {@linkcode condition} returns true,
     * otherwise returns {@linkcode Nothing}.
     *
     * If an instance is a {@linkcode Nothing},
     * ignores the {@linkcode condition} callback and returns itself.
     */
    public abstract when(condition: Proposition): Maybe<T>;

    /**
     * If an instance is a {@linkcode Nothing}
     * returns a given present {@linkcode fallback} value as a {@linkcode Just}.
     *
     * If an instance is a {@linkcode Just},
     * ignores the {@linkcode fallback} and returns itself.
     */
    public abstract otherwise(fallback: Value<T>): Just<T>;

    /**
     * If an instance is a {@linkcode Nothing}
     * returns a given {@linkcode fallback} value as a {@linkcode Maybe}.
     *
     * If an instance is a {@linkcode Just},
     * ignores the {@linkcode fallback} and returns itself.
     */
    public abstract otherwise(fallback: Value<T | null | undefined>): Maybe<T>;

    /**
     * If an instance is a {@linkcode Nothing}
     * returns a given present {@linkcode fallback} value.
     *
     * If an instance is a {@linkcode Just},
     * ignores the {@linkcode fallback} and returns {@linkcode Just.value}.
     */
    public abstract or(fallback: Value<T>): T;

    /**
     * If an instance is a {@linkcode Nothing}
     * returns a given nullable {@linkcode fallback} value.
     *
     * If an instance is a {@linkcode Just},
     * ignores the {@linkcode fallback} and returns {@linkcode Just.value} as a nullable type.
     */
    public abstract or(fallback: Value<T | null>): T | null;

    /**
     * If an instance is a {@linkcode Nothing}
     * returns a given optional {@linkcode fallback} value.
     *
     * If an instance is a {@linkcode Just},
     * ignores the {@linkcode fallback} and returns {@linkcode Just.value} as an optional type.
     */
    public abstract or(fallback: Value<T | undefined>): T | undefined;

    /**
     * If an instance is a {@linkcode Nothing}
     * returns a given optional and nullable {@linkcode fallback} value.
     *
     * If an instance is a {@linkcode Just},
     * ignores the {@linkcode fallback} and returns {@linkcode Just.value} as an optional and nullable type.
     */
    public abstract or(fallback: Value<T | null | undefined>): T | null | undefined;

    /**
     * If an instance is a {@linkcode Just},
     * runs a given {@linkcode procedure} with the {@linkcode Just.value}.
     * Ignores the {@linkcode procedure} result and returns the original {@linkcode Just}.
     *
     * If an instance is a {@linkcode Nothing},
     * ignores the {@linkcode procedure} and returns itself.
     *
     * @since v0.9.0
     */
    public abstract through(procedure: (value: T) => void): Maybe<T>;
}

/**
 * Type {@linkcode Just} represents a defined non-null value of type `T`.
 *
 * @final
 */
export class Just<T> extends Maybe<T> {
    /**
     * Creates an instance of {@linkcode Just} from a given defined non-null {@linkcode value}.
     *
     * @throws {TypeError} If the given {@linkcode value} is null or undefined in runtime.
     */
    public constructor(
        public readonly value: Present<T>,
    ) {
        super();
        // Catches an error when the given argument passes the type definition, but is null or undefined in runtime.
        if (isNull(this.value)) {
            throw new TypeError('The value of `Just` must not be `null`');
        }
        if (isUndefined(this.value)) {
            throw new TypeError('The value of `Just` must not be `undefined`');
        }
    }

    public onto<U>(flatMap: (value: T) => Just<Present<U>>): Just<Present<U>>;
    public onto<U>(flatMap: (value: T) => Nothing<Present<U>>): Nothing<Present<U>>;
    public onto<U>(flatMap: (value: T) => Maybe<Present<U>>): Maybe<Present<U>>;

    /**
     * Applies a given {@linkcode flatMap} callback to the {@linkcode Just.value}.
     *
     * @returns The result of the {@linkcode flatMap}.
     */
    public onto<U>(
        flatMap: (value: T) => Maybe<Present<U>>,
    ): Maybe<Present<U>> {
        return flatMap(this.value);
    }

    // Return type has to be Present<U> to exclude null or undefined from the type U
    public to<U>(map: (value: T) => Present<U>): Just<U>;
    public to<U>(map: (value: T) => null | undefined): Nothing<U>;
    public to<U>(map: (value: T) => U | null | undefined): Maybe<U>;

    /**
     * Applies a given {@linkcode map} callback to the {@linkcode Just.value}.
     *
     * @returns The result of the {@linkcode map} wrapped into a {@linkcode Maybe}.
     */
    public to<U>(map: (value: T) => U | null | undefined): Maybe<U> {
        return maybe<U>(map(this.value));
    }

    /**
     * Applies a given {@linkcode reduce} callback to the {@linkcode Just.value}.
     *
     * @returns The result of the {@linkcode reduce}.
     * @since 0.9.0
     */
    public into<U>(reduce: (value: T) => U): U {
        return reduce(this.value);
    }

    public pick<K extends keyof T>(
        property: Value<K>,
    ): T[K] extends Present<T[K]> ? Just<T[K]> : Maybe<Present<T[K]>>;

    /**
     * Returns a value of a given {@linkcode Just.value} {@linkcode property} wrapped into a {@linkcode Maybe}.
     */
    public pick<K extends keyof T>(property: Value<K>): Just<T[K]> | Maybe<Present<T[K]>> {
        return this.to(value => value[valueOf(property)]) as unknown as Maybe<Present<T[K]>>;
    }

    /**
     * Applies a given {@linkcode filter} callback to the {@linkcode Just.value}.
     *
     * @returns The original {@linkcode Just} when the {@linkcode filter} returns true,
     * otherwise returns {@linkcode Nothing}.
     */
    public that(filter: Predicate<T>): Maybe<T> {
        if (filter(this.value)) {
            return this;
        }
        return nothing<T>();
    }

    /**
     * Applies a given {@linkcode filter} type guard to the {@linkcode Just.value}.
     *
     * @returns The original {@linkcode Just} with a narrowed down type of the {@linkcode Just.value},
     * when the {@linkcode filter} returns true.
     * Otherwise returns {@linkcode Nothing}.
     */
    public which<U extends T>(filter: TypeGuard<T, U>): Maybe<U> {
        if (filter(this.value)) {
            // When condition is true, this.value is of type U extends T.
            // Return it as is instead of passing it through just(this.value).
            return this as unknown as Just<U>;
        }
        return nothing<U>();
    }

    /**
     * Evaluates a given {@linkcode condition} callback
     * (regardless of the {@linkcode Just.value}).
     *
     * @returns The original {@linkcode Just} when the {@linkcode condition} returns true,
     * otherwise returns {@linkcode Nothing}.
     */
    public when(condition: Proposition): Maybe<T> {
        if (isTrue(condition)) {
            return this;
        }
        return nothing<T>();
    }

    /**
     * Ignores a given {@linkcode fallback} value and returns itself.
     */
    public otherwise(fallback: Value<T | null | undefined>): Just<T>;
    public otherwise(): this {
        return this;
    }

    /**
     * Ignores a given {@linkcode fallback} value and returns own {@linkcode Just.value}.
     */
    public or(fallback: Value<T | null | undefined>): T;
    public or(): T {
        return this.value;
    }

    /**
     * Runs a given {@linkcode procedure} with the {@linkcode Just.value} as an argument.
     *
     * Ignores the {@linkcode procedure} result and returns the original {@linkcode Just}.
     *
     * @since v0.9.0
     */
    public through(procedure: (value: T) => void): this {
        procedure(this.value);
        return this;
    }
}

/**
 * Type {@linkcode Nothing} represents an undefined or a null value of type `T`.
 *
 * @final
 */
export class Nothing<T> extends Maybe<T> {
    /**
     * Creates an instance of {@linkcode Nothing} from a given undefined or null {@linkcode value}.
     *
     * @throws {TypeError} If the given {@linkcode value} is defined or non-null in runtime.
     */
    public constructor(
        public readonly value: null | undefined,
    ) {
        super();
        if (isPresent(this.value)) {
            throw new TypeError('Nothing value must be absent');
        }
    }

    /**
     * Ignores a given {@linkcode flatMap} callback and returns itself.
     */
    public onto<U>(
        flatMap: (value: T) => Maybe<Present<U>>,
    ): Nothing<Present<U>>;
    public onto<U>(): Nothing<U> {
        return this as unknown as Nothing<U>;
    }

    /**
     * Ignores a given {@linkcode map} callback and returns itself.
     */
    public to<U>(map: (value: T) => (U | null | undefined)): Nothing<U>;
    public to<U>(): Nothing<U> {
        return this as unknown as Nothing<U>;
    }

    /**
     * Applies a given {@linkcode reduce} callback to the {@linkcode Nothing.value}.
     *
     * @returns The result of the {@linkcode reduce}.
     * @since 0.9.0
     */
    public into<U>(reduce: (value: (null | undefined)) => U): U {
        return reduce(this.value);
    }

    /**
     * Ignores a given {@linkcode property} and returns itself.
     */
    public pick<K extends keyof T>(property: Value<K>): Nothing<Present<T[K]>>;
    public pick<K extends keyof T>(): Nothing<Present<T[K]>> {
        return this as unknown as Nothing<Present<T[K]>>;
    }

    /**
     * Ignores a given {@linkcode filter} callback and returns itself.
     */
    public that(filter: Predicate<T>): Nothing<T>;
    public that(): this {
        return this;
    }

    /**
     * Ignores a given {@linkcode filter} callback and returns itself
     * with a narrowed down type of the {@linkcode Maybe.value}.
     */
    public which<U extends T>(filter: TypeGuard<T, U>): Nothing<U>;
    public which<U extends T>(): Nothing<U> {
        return this as unknown as Nothing<U>;
    }

    /**
     * Ignores a given {@linkcode condition} callback and returns itself.
     */
    public when(condition: Proposition): Nothing<T>;
    public when(): this {
        return this;
    }

    /**
     * Returns a given null or undefined {@linkcode fallback} value as a {@linkcode Nothing}.
     */
    public otherwise(fallback: Value<null | undefined>): Nothing<T>;

    /**
     * Returns a given present {@linkcode fallback} value as a {@linkcode Just}.
     */
    public otherwise(fallback: Value<T>): Just<T>;

    /**
     * Returns a given {@linkcode fallback} value as a {@linkcode Maybe}.
     */
    public otherwise(fallback: Value<T | null | undefined>): Maybe<T>;

    public otherwise(fallback: Value<T | null | undefined>): Maybe<T> {
        return maybe(valueOf(fallback));
    }

    /**
     * Returns a given null {@linkcode fallback} value.
     */
    public or(fallback: Value<null>): null;

    /**
     * Returns a given undefined {@linkcode fallback} value.
     */
    public or(fallback: Value<undefined>): undefined;

    /**
     * Returns a given present {@linkcode fallback} value.
     */
    public or(fallback: Value<T>): T;

    /**
     * Returns a given nullable {@linkcode fallback} value.
     */
    public or(fallback: Value<T | null>): T | null;

    /**
     * Returns a given optional {@linkcode fallback} value.
     */
    public or(fallback: Value<T | undefined>): T | undefined;

    /**
     * Returns a given {@linkcode fallback} value.
     */
    public or(fallback: Value<T | null | undefined>): T | null | undefined;

    public or(
        fallback: Value<T | null | undefined> | Value<T | null> | Value<T | undefined> | Value<T>,
    ): T | null | undefined {
        return valueOf(fallback);
    }

    /**
     * Ignores a given {@linkcode procedure} callback and returns itself.
     *
     * @since v0.9.0
     */
    public through(procedure: (value: T) => void): Nothing<T>;
    public through(): this {
        return this;
    }
}

/**
 * Creates an instance of {@linkcode Just} with the present {@linkcode value}.
 */
export function maybe<T>(value: Present<T>): Just<T>;

/**
 * Returns a memoized instance of {@linkcode Nothing}
 * with either {@linkcode null} or {@linkcode undefined} value.
 */
export function maybe<T>(value: null | undefined): Nothing<T>;

/**
 * Creates an instance of {@linkcode Just} when the {@linkcode value} is present
 * or returns a memoized instance of {@linkcode Nothing}
 * with either {@linkcode null} or {@linkcode undefined} value.
 */
export function maybe<T>(value: T | null | undefined): Maybe<T>;

/**
 * Creates an instance of {@linkcode Just} when the {@linkcode value} is present
 * or returns a memoized instance of {@linkcode Nothing}
 * with either {@linkcode null} or {@linkcode undefined} value.
 */
export function maybe<T>(value: T | null | undefined): Maybe<T> {
    if (isPresent(value)) {
        return just(value);
    }
    if (isNull(value)) {
        return nil();
    }
    return nothing();
}

/**
 * Creates a function that applies a given {@linkcode map} to a present {@linkcode value}
 * and returns the defined and non-null result wrapped into a {@linkcode Just}.
 *
 * @since v0.9.0
 */
export function maybeFrom<T, U>(
    map: (value: T | null | undefined) => Present<U>,
): Unary<T | null | undefined, Just<Present<U>>>;

/**
 * Creates a function that applies a given {@linkcode map} to a {@linkcode value}
 * and returns the present result wrapped into a {@linkcode Just}.
 *
 * @since v0.9.0
 */
export function maybeFrom<T, U>(
    map: (value: Present<T>) => Present<U>,
): Unary<Present<T>, Just<Present<U>>>;

/**
 * Creates a function that applies a given {@linkcode map} to a {@linkcode value}
 * and returns the null or undefined result wrapped into a {@linkcode Nothing}.
 *
 * @since v0.9.0
 */
export function maybeFrom<T, U>(
    map: (value: T | null | undefined) => null | undefined,
): Unary<T | null | undefined, Nothing<U>>;

/**
 * Creates a function that applies a given {@linkcode map} to a {@linkcode value}
 * and returns the result wrapped into a {@linkcode Maybe}.
 *
 * @since v0.9.0
 */
export function maybeFrom<T, U>(
    map: (value: T | null | undefined) => U | null | undefined,
): Unary<T | null | undefined, Maybe<U>>;

/**
 * Creates a function that applies a given {@linkcode map} to a {@linkcode value}
 * and returns the result wrapped into a {@linkcode Maybe}.
 *
 * @since v0.9.0
 */
export function maybeFrom<T, U>(
    map: (value: T | null | undefined) => U | null | undefined,
): Unary<T | null | undefined, Maybe<U>> {
    return (value: T | null | undefined): Maybe<U> | Just<U> | Nothing<U> => maybe(map(value));
}

/**
 * Creates an instance of {@linkcode Just} with a given defined non-null {@linkcode value}.
 *
 * A unit (return) function for the {@linkcode Maybe} monad.
 */
export function just<T>(value: Present<T>): Just<T> {
    return new Just<T>(value);
}

/**
 * Creates a function that applies a given {@linkcode map} to a {@linkcode value}
 * and returns the result wrapped into a {@linkcode Just}.
 *
 * @since v0.9.0
 */
export function justFrom<T, U>(
    map: (value: T | null | undefined) => Present<U>,
): Unary<T | null | undefined, Just<U>> {
    return (value: T | null | undefined): Just<U> => just(map(value));
}

interface Memo {
    nothing: Nothing<unknown>;
    nil: Nothing<unknown>;
}

const memo: Memo = {
    nothing: new Nothing(undefined),
    nil: new Nothing(null),
};

/**
 * Returns a memoized instance of {@linkcode Nothing} with an {@linkcode undefined} value.
 */
export function nothing<T>(): Nothing<T> {
    return memo.nothing as Nothing<T>;
}

/**
 * Returns a memoized instance of {@linkcode Nothing} with a {@linkcode null} value.
 *
 * @since v0.10.0
 */
export function nil<T>(): Nothing<T> {
    // eslint-disable-next-line deprecation/deprecation -- TODO: Delete in v0.11.0-alpha.
    return naught();
}

/**
 * Returns a memoized instance of {@linkcode Nothing} with a {@linkcode null} value.
 *
 * @deprecated Since v0.10.0. Use {@linkcode nil} instead.
 */
export function naught<T>(): Nothing<T> {
    return memo.nil as Nothing<T>;
}

/**
 * Returns true if a given value is a {@linkcode Maybe}.
 *
 * @since 0.9.0
 */
export function isMaybe<T, U>(value: Maybe<T> | U): value is Maybe<T> {
    return value instanceof Maybe;
}

/**
 * Returns true if a given value is not a {@linkcode Maybe}.
 *
 * @since 0.9.0
 */
export function isNotMaybe<T, U>(value: Maybe<T> | U): value is U {
    return !(value instanceof Maybe);
}

/**
 * Returns true if a given value is a {@linkcode Just}.
 *
 * @since 0.9.0
 */
export function isJust<T, U>(value: Just<T> | U): value is Just<T> {
    return value instanceof Just;
}

/**
 * Returns true if a given value is not a {@linkcode Just}.
 *
 * @since 0.9.0
 */
export function isNotJust<T, U>(value: Just<T> | U): value is U {
    return !(value instanceof Just);
}

/**
 * Returns true if a given value is a {@linkcode Nothing}.
 *
 * @since 0.9.0
 */
export function isNothing<T, U>(value: Nothing<T> | U): value is Nothing<T> {
    return value instanceof Nothing;
}

/**
 * Returns true if a given value is not a {@linkcode Nothing}.
 *
 * @since 0.9.0
 */
export function isNotNothing<T, U>(value: Nothing<T> | U): value is U {
    return !(value instanceof Nothing);
}
