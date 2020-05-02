export type Absent = undefined | null;
export type Present<T> = T extends Absent ? never : T;

export type Unary<T, U> = (value: T) => U;
export type Predicate<T> = (value: T) => boolean;
export type TypeGuard<T, V extends T> = (value: T) => value is V;

export function isDefined<T>(value: T | undefined): value is T {
    // eslint-disable-next-line no-void
    return value !== void 0;
}

export function isUndefined<T>(value: T | undefined): value is undefined {
    // eslint-disable-next-line no-void
    return value === void 0;
}

export function isNotNull<T>(value: T | null): value is T {
    return value !== null;
}

export function isNull<T>(value: T | null): value is null {
    return value === null;
}

export function isPresent<T>(value: T | undefined | null): value is T {
    return isDefined(value) && isNotNull(value);
}

export function isAbsent<T>(value: T | undefined | null): value is undefined | null {
    return isUndefined(value) || isNull(value);
}
