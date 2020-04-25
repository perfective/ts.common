import { isDefined, isUndefined } from './value';

export type Undefined<T> = {
    [P in keyof T]: undefined;
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

function not(value: boolean): boolean {
    return !value;
}
