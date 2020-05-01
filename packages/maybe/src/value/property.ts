import {
    Absent,
    Predicate,
    isAbsent,
    isDefined,
    isNotNull,
    isNull,
    isPresent,
    isUndefined,
} from './value';

export type WithDefined<T, K extends keyof T> = T & {
    [P in K]-?: T[P];
};

export type WithUndefined<T, K extends keyof T> = T & {
    [P in keyof Pick<T, K>]: undefined;
};

export type WithNotNull<T, K extends keyof T> = T & {
    [P in keyof Pick<T, K>]: T[P] extends null ? never : T[P];
};

export type WithNull<T, K extends keyof T> = T & {
    [P in K]: null;
};

export type WithPresent<T, K extends keyof T> = T & {
    [P in K]: T[P] extends Absent ? never : T[P];
};

export type WithAbsent<T, K extends keyof T> = T & {
    [P in keyof Pick<T, K>]: T[P] extends Absent ? T[P] : never;
};

export function hasDefinedProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is WithDefined<T, K> {
    return hasPropertiesThat(isDefined, value, [property].concat(and));
}

export function hasUndefinedProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is WithUndefined<T, K> {
    return hasPropertiesThat(isUndefined, value, [property].concat(and));
}

export function hasNotNullProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is WithNotNull<T, K> {
    return hasPropertiesThat(isNotNull, value, [property].concat(and));
}

export function hasNullProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is WithNull<T, K> {
    return hasPropertiesThat(isNull, value, [property].concat(and));
}

export function hasPresentProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is WithPresent<T, K> {
    return hasPropertiesThat(isPresent, value, [property].concat(and));
}

export function hasAbsentProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is WithAbsent<T, K> {
    return hasPropertiesThat(isAbsent, value, [property].concat(and));
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
