export function isDefined<T>(value?: T): value is T {
    return typeof value !== 'undefined';
}

export function isUndefined<T>(value?: T): value is undefined {
    return typeof value === 'undefined';
}

export function isNotNull<T>(value: T | null): value is T {
    return value !== null;
}

export function isNull<T>(value: T | null): value is null {
    return value === null;
}

export function isPresent<T>(value?: T | null): value is T {
    return isDefined(value) && isNotNull(value);
}

export function isAbsent<T>(value?: T | null): value is undefined | null {
    return isUndefined(value) || isNull(value);
}
