export type Defined<T> = T extends undefined ? never : T;

export function isDefined<T>(value: T | undefined): value is T {
    // eslint-disable-next-line no-void -- the same check as in the compiled JS
    return value !== void 0;
}

export type Undefined<T> = T extends undefined ? T : never;

export function isUndefined<T>(value: T | undefined): value is undefined {
    // eslint-disable-next-line no-void -- the same check as in the compiled JS
    return value === void 0;
}

export type NotNull<T> = T extends null ? never : T;

export function isNotNull<T>(value: T | null): value is T {
    return value !== null;
}

export type Null<T> = T extends null ? T : never;

export function isNull<T>(value: T | null): value is null {
    return value === null;
}

/**
 * Keeping legacy definition (instead of using T & {}) to ensure support of preivious TypeScript versions.
 *
 * @see NonNullable
 */
export type Present<T> = T extends null | undefined ? never : T;

export function isPresent<T>(value: T | null | undefined): value is Present<T> {
    return isDefined(value) && isNotNull(value);
}

export type Absent<T> = T extends null | undefined ? T : never;

export function isAbsent<T>(value: T | null | undefined): value is Absent<T> {
    return isUndefined(value) || isNull(value);
}
