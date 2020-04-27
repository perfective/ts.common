import { isDefined, isNotNull, isNull, isUndefined } from './value';

export type Undefined<T> = {
    [P in keyof T]: undefined;
};

export type NotNull<T> = {
    [P in keyof T]: T[P] extends null ? never : T[P];
};

export type Null<T> = {
    [P in keyof T]: null;
};

export function hasDefinedProperty<T, K extends keyof T>(
    value: T,
    ...properties: readonly K[]
): value is T & Required<Pick<T, K>> {
    return properties
        .map(property => value[property])
        .map(isDefined)
        .filter(not)
        .length === 0;
}

export function hasUndefinedProperty<T, K extends keyof T>(
    value: T,
    ...properties: readonly K[]
): value is T & Undefined<Pick<T, K>> {
    return properties
        .map(property => value[property])
        .map(isUndefined)
        .filter(not)
        .length === 0;
}

export function hasNotNullProperty<T, K extends keyof T>(
    value: T,
    ...properties: readonly K[]
): value is T & NotNull<Pick<T, K>> {
    return properties
        .map(property => value[property])
        .map(isNotNull)
        .filter(not)
        .length === 0;
}

export function hasNullProperty<T, K extends keyof T>(
    value: T,
    ...properties: readonly K[]
): value is T & Null<Pick<T, K>> {
    return properties
        .map(property => value[property])
        .map(isNull)
        .filter(not)
        .length === 0;
}

function not(value: boolean): boolean {
    return !value;
}
