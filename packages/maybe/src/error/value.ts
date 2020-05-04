import {
    TypeGuard,
    isAbsent,
    isDefined,
    isNotNull,
    isNull,
    isPresent,
    isUndefined,
} from '../value/value';

import { throws } from './error';

export function definedValueOrThrow<T, E extends Error = Error>(
    value: T | undefined,
    error?: E | string,
): T {
    return valueOrThrow(isDefined, value, error);
}

export function definedValueOrPanic<T, E extends Error = Error>(
    error?: E | string,
): (value: T | undefined) => T {
    return (value: T | undefined): T => valueOrThrow(isDefined, value, error);
}

export function undefinedValueOrThrow<T, E extends Error = Error>(
    value: T | undefined,
    error?: E | string,
): undefined {
    return valueOrThrow(isUndefined, value, error);
}

export function undefinedValueOrPanic<T, E extends Error = Error>(
    error?: E | string,
): (value: T | undefined) => undefined {
    return (value: T | undefined): undefined => valueOrThrow(isUndefined, value, error);
}

export function notNullValueOrThrow<T, E extends Error = Error>(
    value: T | null,
    error?: E | string,
): T {
    return valueOrThrow(isNotNull, value, error);
}

export function notNullValueOrPanic<T, E extends Error = Error>(
    error?: E | string,
): (value: T | null) => T {
    return (value: T | null): T => valueOrThrow(isNotNull, value, error);
}

export function nullValueOrThrow<T, E extends Error = Error>(
    value: T | null,
    error?: E | string,
): null {
    return valueOrThrow(isNull, value, error);
}

export function nullValueOrPanic<T, E extends Error>(
    error?: E | string,
): (value: T | null) => null {
    return (value: T | null): null => valueOrThrow(isNull, value, error);
}

export function presentValueOrThrow<T, E extends Error = Error>(
    value: T | null | undefined,
    error?: E | string,
): T {
    return valueOrThrow(isPresent, value, error);
}

export function presentValueOrPanic<T, E extends Error = Error>(
    error?: E | string,
): (value: T | null | undefined) => T {
    return (value: T | null | undefined): T => valueOrThrow(isPresent, value, error);
}

export function absentValueOrThrow<T, E extends Error = Error>(
    value: T | null | undefined,
    error?: E | string,
): null | undefined {
    return valueOrThrow(isAbsent, value, error);
}

export function absentValueOrPanic<T, E extends Error>(
    error?: E | string,
): (value: T | null | undefined) => null | undefined {
    return (value: T | null | undefined): null | undefined => valueOrThrow(isAbsent, value, error);
}

function valueOrThrow<T, V extends T, E extends Error>(
    is: TypeGuard<T, V>,
    value: T,
    error?: E | string,
): V {
    if (is(value)) {
        return value;
    }
    return throws(error);
}
