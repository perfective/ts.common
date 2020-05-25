export type Defined<T> = T extends undefined ? never : T;
export type NotNull<T> = T extends null ? never : T;
export type Present<T> = T extends null | undefined ? never : T;
export type Absent<T> = T extends null | undefined ? T : never;

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

export function isPresent<T>(value: T | null | undefined): value is T {
    return isDefined(value) && isNotNull(value);
}

export function isAbsent<T>(value: T | null | undefined): value is null | undefined {
    return isUndefined(value) || isNull(value);
}
