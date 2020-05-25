import { Predicate } from '@perfective/fp';
import {
    Absent,
    Defined,
    NotNull,
    Present,
    isAbsent,
    isDefined,
    isNotNull,
    isNull,
    isPresent,
    isUndefined,
} from '@perfective/value';

export type ObjectWithDefined<T, K extends keyof T> = T & {
    [P in K]-?: Defined<T[P]>;
};

export type ObjectWithUndefined<T, K extends keyof T> = T & {
    [P in K]: undefined;
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

export function hasDefinedProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is ObjectWithDefined<T, K> {
    return hasPropertiesThat(isDefined, value, [property].concat(and));
}

export function definedProperty<T, K extends keyof T>(
    property: K,
    ...and: readonly K[]
): (value: T) => value is ObjectWithDefined<T, K> {
    return (value: T): value is ObjectWithDefined<T, K> => hasDefinedProperty(
        value,
        property,
        ...and,
    );
}

export function hasUndefinedProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is ObjectWithUndefined<T, K> {
    return hasPropertiesThat(isUndefined, value, [property].concat(and));
}

export function undefinedProperty<T, K extends keyof T>(
    property: K,
    ...and: readonly K[]
): (value: T) => value is ObjectWithUndefined<T, K> {
    return (value: T): value is ObjectWithUndefined<T, K> => hasUndefinedProperty(
        value,
        property,
        ...and,
    );
}

export function hasNotNullProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is ObjectWithNotNull<T, K> {
    return hasPropertiesThat(isNotNull, value, [property].concat(and));
}

export function notNullProperty<T, K extends keyof T>(
    property: K,
    ...and: readonly K[]
): (value: T) => value is ObjectWithNotNull<T, K> {
    return (value: T): value is ObjectWithNotNull<T, K> => hasNotNullProperty(
        value,
        property,
        ...and,
    );
}

export function hasNullProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is ObjectWithNull<T, K> {
    return hasPropertiesThat(isNull, value, [property].concat(and));
}

export function nullProperty<T, K extends keyof T>(
    property: K,
    ...and: readonly K[]
): (value: T) => value is ObjectWithNull<T, K> {
    return (value: T): value is ObjectWithNull<T, K> => hasNullProperty(value, property, ...and);
}

export function hasPresentProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is ObjectWithPresent<T, K> {
    return hasPropertiesThat(isPresent, value, [property].concat(and));
}

export function presentProperty<T, K extends keyof T>(
    property: K,
    ...and: readonly K[]
): (value: T) => value is ObjectWithPresent<T, K> {
    return (value: T): value is ObjectWithPresent<T, K> => hasPresentProperty(
        value,
        property,
        ...and,
    );
}

export function hasAbsentProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is ObjectWithAbsent<T, K> {
    return hasPropertiesThat(isAbsent, value, [property].concat(and));
}

export function absentProperty<T, K extends keyof T>(
    property: K,
    ...and: readonly K[]
): (value: T) => value is ObjectWithAbsent<T, K> {
    return (value: T): value is ObjectWithAbsent<T, K> => hasAbsentProperty(
        value,
        property,
        ...and,
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
