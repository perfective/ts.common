import { Predicate, isAbsent, isDefined, isNotNull, isNull, isPresent, isUndefined } from './value';

export function hasDefinedProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is T & Required<Pick<T, K>> {
    return hasPropertiesThat(isDefined, value, [property].concat(and));
}

export type Undefined<T> = {
    [P in keyof T]: undefined;
};

export function hasUndefinedProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is T & Undefined<Pick<T, K>> {
    return hasPropertiesThat(isUndefined, value, [property].concat(and));
}

export type NotNull<T> = {
    [P in keyof T]: T[P] extends null ? never : T[P];
};

export function hasNotNullProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is T & NotNull<Pick<T, K>> {
    return hasPropertiesThat(isNotNull, value, [property].concat(and));
}

export type Null<T, K extends keyof T> = Required<Pick<T, K>> & {
    [P in keyof T]: null;
};

export function hasNullProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is T & Null<Pick<T, K>, K> {
    return hasPropertiesThat(isNull, value, [property].concat(and));
}

export type Present<T, K extends keyof T> = Required<Pick<T, K>> & NotNull<Pick<T, K>>;

export function hasPresentProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is T & Present<Pick<T, K>, K> {
    return hasPropertiesThat(isPresent, value, [property].concat(and));
}

export type Absent<T> = {
    [P in keyof T]: T[P] extends null | undefined ? T[P] : never;
};

export function hasAbsentProperty<T, K extends keyof T>(
    value: T,
    property: K,
    ...and: readonly K[]
): value is T & Absent<Pick<T, K>> {
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
