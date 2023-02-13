export type Defined<T> = T extends undefined ? never : T;

/**
 * Returns a given {@linkcode value}, if it is defined.
 *
 * @throws {TypeError} If the {@linkcode value} is undefined.
 */
export function defined<T>(value: T | undefined): T {
    if (isDefined(value)) {
        return value;
    }
    throw new TypeError('Value is undefined');
}

export function isDefined<T>(value: T | undefined): value is Defined<T> {
    // eslint-disable-next-line no-void -- the same check as in the compiled JS
    return value !== void 0;
}

export type Undefined<T> = T extends undefined ? T : never;

export function isUndefined<T>(value: T | undefined): value is undefined {
    // eslint-disable-next-line no-void -- the same check as in the compiled JS
    return value === void 0;
}

export type NotNull<T> = T extends null ? never : T;

/**
 * Returns a given {@linkcode value}, if it is not null.
 *
 * @throws {TypeError} If the {@linkcode value} is null.
 */
export function notNull<T>(value: T | null): T {
    if (isNotNull(value)) {
        return value;
    }
    throw new TypeError('Value is null');
}

export function isNotNull<T>(value: T | null): value is NotNull<T> {
    return value !== null;
}

export type Null<T> = T extends null ? T : never;

export function isNull<T>(value: T | null): value is null {
    return value === null;
}

/**
 * Keeping legacy definition (instead of using T & {}) to ensure support of TypeScript prior to v4.9.
 *
 * @see NonNullable
 */
export type Present<T> = T extends null | undefined ? never : T;

/**
 * Returns a given {@linkcode value}, if it is defined and is not null.
 *
 * @throws {TypeError} If the {@linkcode value} is null or undefined.
 */
export function present<T>(value: T | null | undefined): T {
    if (isUndefined(value)) {
        throw new TypeError('Value is undefined');
    }
    if (isNull(value)) {
        throw new TypeError('Value is null');
    }
    return value;
}

export function isPresent<T>(value: T | null | undefined): value is Present<T> {
    return isDefined(value) && isNotNull(value);
}

export type Absent<T> = T extends null | undefined ? T : never;

export function isAbsent<T>(value: T | null | undefined): value is null | undefined {
    return isUndefined(value) || isNull(value);
}
