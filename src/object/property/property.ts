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

export type ObjectWithDefined<T, K extends keyof T> = T & {
    [P in K]-?: Defined<T[P]>;
};

export type ObjectWithUndefined<T, K extends keyof T> = T & {
    [P in K]?: undefined;
};

export type ObjectWithNotNull<T, K extends keyof T> = T & {
    [P in K]: NotNull<T[P]>;
};

export type ObjectWithNull<T, K extends keyof T> = T & {
    [P in K]: null;
};

export type ObjectWithPresent<T, K extends keyof T> = T & {
    [P in K]-?: Present<T[P]>;
};

export type ObjectWithAbsent<T, K extends keyof T> = T & {
    [P in K]: Absent<T[P]>;
};

export function property<T, K extends keyof T>(property: K): Unary<T, T[K]>;
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

type Compare<T> = (a: T, b: T) => number;

export function by<T, K extends keyof T>(property: K, ordering: Compare<T[K]>): Compare<T> {
    return (a: T, b: T): number => ordering(a[property], b[property]);
}

export function hasDefinedProperty<T, K extends keyof T>(
    property: K,
    ...and: readonly K[]
): (value: T) => value is ObjectWithDefined<T, K> {
    return (value: T): value is ObjectWithDefined<T, K> => hasPropertiesThat(
        isDefined,
        value,
        [property].concat(and),
    );
}

export function hasUndefinedProperty<T, K extends keyof T>(
    property: K,
    ...and: readonly K[]
): (value: T) => value is ObjectWithUndefined<T, K> {
    return (value: T): value is ObjectWithUndefined<T, K> => hasPropertiesThat(
        isUndefined,
        value,
        [property].concat(and),
    );
}

export function hasNotNullProperty<T, K extends keyof T>(
    property: K,
    ...and: readonly K[]
): (value: T) => value is ObjectWithNotNull<T, K> {
    return (value: T): value is ObjectWithNotNull<T, K> => hasPropertiesThat(
        isNotNull,
        value,
        [property].concat(and),
    );
}

export function hasNullProperty<T, K extends keyof T>(
    property: K,
    ...and: readonly K[]
): (value: T) => value is ObjectWithNull<T, K> {
    return (value: T): value is ObjectWithNull<T, K> => hasPropertiesThat(
        isNull,
        value,
        [property].concat(and),
    );
}

export function hasPresentProperty<T, K extends keyof T>(
    property: K,
    ...and: readonly K[]
): (value: T) => value is ObjectWithPresent<T, K> {
    return (value: T): value is ObjectWithPresent<T, K> => hasPropertiesThat(
        isPresent,
        value,
        [property].concat(and),
    );
}

export function hasAbsentProperty<T, K extends keyof T>(
    property: K,
    ...and: readonly K[]
): (value: T) => value is ObjectWithAbsent<T, K> {
    return (value: T): value is ObjectWithAbsent<T, K> => hasPropertiesThat(
        isAbsent,
        value,
        [property].concat(and),
    );
}

function hasPropertiesThat<T, K extends keyof T>(
    is: Predicate<T[K]>,
    value: T,
    properties: readonly K[],
): boolean {
    return properties
        .map(property => value[property])
        .map(is)
        .filter(Boolean)
        .length === properties.length;
}
