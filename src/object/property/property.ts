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
export type ObjectWithUndefined<T, K extends keyof T> = T & Partial<Record<K, undefined>>;

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
export type ObjectWithNull<T, K extends keyof T> = T & Record<K, null>;

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
 * Creates a function that for a given value returns the value of a given `property`.
 *
 * @since v0.2.0
 */
export function property<T, K extends keyof T>(property: K): Unary<T, T[K]>;

/**
 * Creates a predicate that for a given value returns true
 * if a given `property` satisfies a given `condition`.
 *
 * @since v0.2.0
 */
export function property<T, K extends keyof T>(property: K, condition: Predicate<T[K]>): Predicate<T>;

export function property<T, K extends keyof T>(
    property: K,
    condition?: Predicate<T[K]>,
): Unary<T, T[K]> | Predicate<T> {
    if (isFunction(condition)) {
        // eslint-disable-next-line security/detect-object-injection -- property checked statically
        return (value: T): boolean => condition(value[property]);
    }
    // eslint-disable-next-line security/detect-object-injection -- property checked statically
    return (value: T): T[K] => value[property];
}

/**
 * Returns a function to compare two objects by their `property` with a given `order` callback.
 *
 * @since v0.2.0
 */
export function by<T, K extends keyof T>(property: K, order: Compare<T[K]>): Compare<T> {
    // eslint-disable-next-line security/detect-object-injection -- property checked statically
    return (a: T, b: T): number => order(a[property], b[property]);
}

/**
 * Returns a type guard that returns true if its argument has a defined `property`
 * and all given `properties`.
 *
 * @since v0.2.3
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
 * Returns a type guard that returns true if its argument has an undefined `property`
 * and all given `properties`.
 *
 * @since v0.2.3
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
 * Returns a type guard that returns true if its argument has a non-null `property`
 * and all given `properties`.
 *
 * @since v0.2.3
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
 * Returns a type guard that returns true if its argument has a `null` `property`
 * and all given `properties`.
 *
 * @since v0.2.3
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
 * Returns a type guard that returns true if its argument has a present `property`
 * and all given `properties`.
 *
 * @since v0.2.3
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
 * Returns a type guard that returns true if its argument has an absent `property`
 * and all given `properties`.
 *
 * @since v0.2.3
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
 * Returns true if a given `value` has all its `properties` satisfy a given `condition`.
 */
function hasPropertiesThat<T, K extends keyof T>(
    condition: Predicate<T[K]>,
    value: T,
    properties: readonly K[],
): boolean {
    return properties
        // eslint-disable-next-line security/detect-object-injection -- property checked statically
        .map(property => value[property])
        .map(condition)
        .filter(Boolean)
        .length === properties.length;
}
