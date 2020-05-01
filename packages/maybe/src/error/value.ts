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
): (value?: T) => T {
    return (value?: T): T => valueOrPanic<T | undefined, T, E>(isDefined, value, error);
}

export function undefinedValueOrPanic<T, E extends Error>(
    error?: E | string,
): (value?: T) => undefined {
    return (value?: T): undefined => valueOrPanic<T | undefined, undefined, E>(
        isUndefined,
        value,
        error,
    );
}

export function notNullValueOrPanic<T, E extends Error>(
    error?: E | string,
): (value: T | null) => T {
    return (value: T | null): T => valueOrPanic<T | null, T, E>(isNotNull, value, error);
}

export function nullValueOrPanic<T, E extends Error>(
    error?: E | string,
): (value: T | null) => null {
    return (value: T | null): null => valueOrPanic<T | null, null, E>(isNull, value, error);
}

export function presentValueOrPanic<T, E extends Error>(
    error?: E | string,
): (value?: T | null) => T {
    return (value?: T | null): T => valueOrPanic<T | Absent, T, E>(
        isPresent,
        value,
        error,
    );
}

export function absentValueOrPanic<T, E extends Error>(
    error?: E | string,
): (value?: T | null) => Absent {
    return (value?: T | null): Absent => valueOrPanic<T | Absent, Absent, E>(
        isAbsent,
        value,
        error,
    );
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
