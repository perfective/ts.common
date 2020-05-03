import {
    Absent,
    Defined,
    NotNull,
    Predicate,
    Present,
    isAbsent,
    isDefined,
    isNotNull,
    isNull,
    isPresent,
    isUndefined,
} from './value';

export type WithDefined<T, K extends keyof T> = T & {
    [P in K]-?: Defined<T[P]>;
};

export type WithUndefined<T, K extends keyof T> = T & {
    [P in K]: undefined;
};

export type WithNotNull<T, K extends keyof T> = T & {
    [P in K]: NotNull<T[P]>;
};

export type WithNull<T, K extends keyof T> = T & {
    [P in K]: null;
};

export type WithPresent<T, K extends keyof T> = T & {
    [P in K]-?: Present<T[P]>;
};

export type WithAbsent<T, K extends keyof T> = T & {
    [P in K]: Absent<T[P]>;
};

export function hasDefinedProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is WithDefined<T, K> {
    return hasPropertiesThat(isDefined, value, [property].concat(and));
}

export function definedProperty<T, K extends keyof T>(
    property: K,
    ...and: readonly K[]
): (value: T) => value is WithDefined<T, K> {
    return (value: T): value is WithDefined<T, K> => hasDefinedProperty(value, property, ...and);
}

export function hasUndefinedProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is WithUndefined<T, K> {
    return hasPropertiesThat(isUndefined, value, [property].concat(and));
}

export function undefinedProperty<T, K extends keyof T>(
    property: K,
    ...and: readonly K[]
): (value: T) => value is WithUndefined<T, K> {
    return (value: T): value is WithUndefined<T, K> => hasUndefinedProperty(
        value,
        property,
        ...and,
    );
}

export function hasNotNullProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is WithNotNull<T, K> {
    return hasPropertiesThat(isNotNull, value, [property].concat(and));
}

export function notNullProperty<T, K extends keyof T>(
    property: K,
    ...and: readonly K[]
): (value: T) => value is WithNotNull<T, K> {
    return (value: T): value is WithNotNull<T, K> => hasNotNullProperty(value, property, ...and);
}

export function hasNullProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is WithNull<T, K> {
    return hasPropertiesThat(isNull, value, [property].concat(and));
}

export function nullProperty<T, K extends keyof T>(
    property: K,
    ...and: readonly K[]
): (value: T) => value is WithNull<T, K> {
    return (value: T): value is WithNull<T, K> => hasNullProperty(value, property, ...and);
}

export function hasPresentProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is WithPresent<T, K> {
    return hasPropertiesThat(isPresent, value, [property].concat(and));
}

export function presentProperty<T, K extends keyof T>(
    property: K,
    ...and: readonly K[]
): (value: T) => value is WithPresent<T, K> {
    return (value: T): value is WithPresent<T, K> => hasPresentProperty(value, property, ...and);
}

export function hasAbsentProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is WithAbsent<T, K> {
    return hasPropertiesThat(isAbsent, value, [property].concat(and));
}

export function absentProperty<T, K extends keyof T>(
    property: K,
    ...and: readonly K[]
): (value: T) => value is WithAbsent<T, K> {
    return (value: T): value is WithAbsent<T, K> => hasAbsentProperty(value, property, ...and);
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
