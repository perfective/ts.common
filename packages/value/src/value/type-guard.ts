export function isDefined<T>(value: T | undefined): value is T {
    // eslint-disable-next-line no-void -- the same check as in the compiled JS
    return value !== void 0;
}

export function isUndefined<T>(value: T | undefined): value is undefined {
    // eslint-disable-next-line no-void -- the same check as in the compiled JS
    return value === void 0;
}

export function isNotNull<T>(value: T | null): value is T {
    return value !== null;
}

export function isNull<T>(value: T | null): value is null {
    return value === null;
}

export function isPresent<T>(value: T | null | undefined): value is T {
    return isDefined(value) && isNotNull(value);
}

export function isAbsent<T>(value: T | null | undefined): value is null | undefined {
    return isUndefined(value) || isNull(value);
}
