import { Compare } from '../../array/array/lift';
import { Predicate } from '../../boolean/predicate/predicate';
import { isFunction } from '../../function/function/function';
import { Unary } from '../../function/function/unary';
import {
    Absent,
    Defined,
    isAbsent,
    isDefined,
    isNotNull,
    isNull,
    isPresent,
    isUndefined,
    NotNull,
    Present,
} from '../../value/value';

/**
 * An object of type `T` with a defined value of property `K`.
 *
 * @since v0.1.0
 */
export type ObjectWithDefined<T, K extends keyof T> = T & {
    [P in K]-?: Defined<T[P]>;
};

/**
 * An object of type `T` with an undefined value of property `K`.
 *
 * @since v0.1.0
 */
export type ObjectWithUndefined<T, K extends keyof T> = T & {
    [P in K]?: undefined;
};

/**
 * An object of type `T` with a non-null value of property `K`.
 *
 * @since v0.1.0
 */
export type ObjectWithNotNull<T, K extends keyof T> = T & {
    [P in K]: NotNull<T[P]>;
};

/**
 * An object of type `T` with a null value of property `K`.
 *
 * @since v0.1.0
 */
export type ObjectWithNull<T, K extends keyof T> = T & {
    [P in K]: null;
};

/**
 * An object of type `T` with a present value of property `K`.
 *
 * @since v0.1.0
 */
export type ObjectWithPresent<T, K extends keyof T> = T & {
    [P in K]-?: Present<T[P]>;
};

/**
 * An object of type `T` with an absent value of property `K`.
 *
 * @since v0.1.0
 */
export type ObjectWithAbsent<T, K extends keyof T> = T & {
    [P in K]: Absent<T[P]>;
};

/**
 * Creates a function that for a given value returns the value of a given {@linkcode property}.
 *
 * @since v0.2.0
 */
export function property<T, K extends keyof T>(property: K): Unary<T, T[K]>;

/**
 * Creates a predicate that for a given value returns true
 * if a given {@linkcode property} satisfies a given {@linkcode condition}.
 *
 * @since v0.2.0
 */
export function property<T, K extends keyof T>(property: K, condition: Predicate<T[K]>): Predicate<T>;

export function property<T, K extends keyof T>(
    property: K,
    condition?: Predicate<T[K]>,
): Unary<T, T[K]> | Predicate<T> {
    if (isFunction(condition)) {
        return (value: T): boolean => condition(value[property]);
    }
    return (value: T): T[K] => value[property];
}

/**
 * Returns a function to compare two objects by their {@linkcode property} with a given {@linkcode order} callback.
 *
 * @since v0.2.0
 */
export function by<T, K extends keyof T>(property: K, order: Compare<T[K]>): Compare<T> {
    return (a: T, b: T): number => order(a[property], b[property]);
}

/**
 * Returns a type guard that returns true if its argument has a defined {@linkcode property}
 * and all given {@linkcode properties}.
 *
 * @since v0.2.0
 */
export function hasDefinedProperty<T, K extends keyof T>(
    property: K,
    ...properties: readonly K[]
): (value: T) => value is ObjectWithDefined<T, K> {
    return (value: T): value is ObjectWithDefined<T, K> => hasPropertiesThat(
        isDefined,
        value,
        [property].concat(properties),
    );
}

/**
 * Returns a type guard that returns true if its argument has an undefined {@linkcode property}
 * and all given {@linkcode properties}.
 *
 * @since v0.2.0
 */
export function hasUndefinedProperty<T, K extends keyof T>(
    property: K,
    ...properties: readonly K[]
): (value: T) => value is ObjectWithUndefined<T, K> {
    return (value: T): value is ObjectWithUndefined<T, K> => hasPropertiesThat(
        isUndefined,
        value,
        [property].concat(properties),
    );
}

/**
 * Returns a type guard that returns true if its argument has a non-null {@linkcode property}
 * and all given {@linkcode properties}.
 *
 * @since v0.2.0
 */
export function hasNotNullProperty<T, K extends keyof T>(
    property: K,
    ...properties: readonly K[]
): (value: T) => value is ObjectWithNotNull<T, K> {
    return (value: T): value is ObjectWithNotNull<T, K> => hasPropertiesThat(
        isNotNull,
        value,
        [property].concat(properties),
    );
}

/**
 * Returns a type guard that returns true if its argument has a `null` {@linkcode property}
 * and all given {@linkcode properties}.
 *
 * @since v0.2.0
 */
export function hasNullProperty<T, K extends keyof T>(
    property: K,
    ...properties: readonly K[]
): (value: T) => value is ObjectWithNull<T, K> {
    return (value: T): value is ObjectWithNull<T, K> => hasPropertiesThat(
        isNull,
        value,
        [property].concat(properties),
    );
}

/**
 * Returns a type guard that returns true if its argument has a present {@linkcode property}
 * and all given {@linkcode properties}.
 *
 * @since v0.2.0
 */
export function hasPresentProperty<T, K extends keyof T>(
    property: K,
    ...properties: readonly K[]
): (value: T) => value is ObjectWithPresent<T, K> {
    return (value: T): value is ObjectWithPresent<T, K> => hasPropertiesThat(
        isPresent,
        value,
        [property].concat(properties),
    );
}

/**
 * Returns a type guard that returns true if its argument has an absent {@linkcode property}
 * and all given {@linkcode properties}.
 *
 * @since v0.2.0
 */
export function hasAbsentProperty<T, K extends keyof T>(
    property: K,
    ...properties: readonly K[]
): (value: T) => value is ObjectWithAbsent<T, K> {
    return (value: T): value is ObjectWithAbsent<T, K> => hasPropertiesThat(
        isAbsent,
        value,
        [property].concat(properties),
    );
}

/**
 * Returns true if a given {@linkcode value} has all its {@linkcode properties} satisfy a given {@linkcode condition}.
 */
function hasPropertiesThat<T, K extends keyof T>(
    condition: Predicate<T[K]>,
    value: T,
    properties: readonly K[],
): boolean {
    return properties
        .map(property => value[property])
        .map(condition)
        .filter(Boolean)
        .length === properties.length;
}
