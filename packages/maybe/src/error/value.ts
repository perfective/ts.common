import {
    Absent,
    TypeGuard,
    isAbsent,
    isDefined,
    isNotNull,
    isNull,
    isPresent,
    isUndefined,
} from '../value/value';

import { throws } from './error';

export function definedValueOrPanic<T, E extends Error>(
    error?: E | string,
): (value: T | undefined) => T {
    return (value?: T): T => valueOrPanic(isDefined, value, error);
}

export function undefinedValueOrPanic<T, E extends Error>(
    error?: E | string,
): (value: T | undefined) => undefined {
    return (value?: T): undefined => valueOrPanic(isUndefined, value, error);
}

export function notNullValueOrPanic<T, E extends Error>(
    error?: E | string,
): (value: T | null) => T {
    return (value: T | null): T => valueOrPanic(isNotNull, value, error);
}

export function nullValueOrPanic<T, E extends Error>(
    error?: E | string,
): (value: T | null) => null {
    return (value: T | null): null => valueOrPanic(isNull, value, error);
}

export function presentValueOrPanic<T, E extends Error>(
    error?: E | string,
): (value?: T | null) => T {
    return (value: T | Absent): T => valueOrPanic(isPresent, value, error);
}

export function absentValueOrPanic<T, E extends Error>(
    error?: E | string,
): (value?: T | null) => Absent {
    return (value: T | Absent): Absent => valueOrPanic(isAbsent, value, error);
}

function valueOrPanic<T, V extends T, E extends Error>(
    is: TypeGuard<T, V>,
    value: T,
    error?: E | string,
): V {
    if (is(value)) {
        return value;
    }
    return throws(error);
}
