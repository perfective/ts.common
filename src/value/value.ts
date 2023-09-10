/**
 * Constructs a type by excluding `undefined` from `T`.
 *
 * @since v0.1.0
 */
export type Defined<T> = T extends undefined ? never : T;

/**
 * Returns a given `value`, if it is defined.
 *
 * @throws {TypeError} If the `value` is undefined.
 *
 * @since v0.9.0
 */
export function defined<T>(value: T | undefined): T {
    if (isDefined(value)) {
        return value;
    }
    throw new TypeError('Value is undefined');
}

/**
 * A type guard that returns `true`, if a given value is not `undefined`.
 *
 * @since v0.1.0
 */
export function isDefined<T>(value: T | undefined): value is Defined<T> {
    // eslint-disable-next-line no-void -- the same check as in the compiled JS
    return value !== void 0;
}

/**
 * Constructs a type by excluding defined types from `T`.
 *
 * @since v0.3.0
 */
export type Undefined<T> = T extends undefined ? T : never;

/**
 * A type guard that returns `true` if a given `value` is `undefined`.
 *
 * @since v0.1.0
 */
export function isUndefined<T>(value: T | undefined): value is undefined {
    // eslint-disable-next-line no-void -- the same check as in the compiled JS
    return value === void 0;
}

/**
 * Constructs a type by excluding `null` from `T`.
 *
 * Unlike {@link NonNullable}, this type does not exclude `undefined`.
 *
 * @since v0.1.0
 */
export type NotNull<T> = T extends null ? never : T;

/**
 * Returns a given `value`, if it is not null.
 *
 * @throws {TypeError} If the `value` is null.
 *
 * @since v0.9.0
 */
export function notNull<T>(value: T | null): T {
    if (isNotNull(value)) {
        return value;
    }
    throw new TypeError('Value is null');
}

/**
 * A type guard that returns `true` if a given value is not `null`.
 *
 * Returns `false`, if a given value is `undefined`.
 *
 * @since v0.1.0
 */
export function isNotNull<T>(value: T | null): value is NotNull<T> {
    return value !== null;
}

/**
 * Constructs a type by excluding non-`null` types from `T`.
 *
 * @since v0.3.0
 */
export type Null<T> = T extends null ? T : never;

/**
 * A type guard that returns `true` if a given value is `null`.
 *
 * @since v0.1.0
 */
export function isNull<T>(value: T | null): value is null {
    return value === null;
}

/**
 * Constructs a type by excluding `null` and `undefined` from `T`.
 *
 * Keeping legacy definition (instead of using T & {}) to ensure support of TypeScript prior to v4.9.
 *
 * @see NonNullable
 *
 * @since v0.1.0
 */
export type Present<T> = T extends null | undefined ? never : T;

/**
 * Returns a given `value`, if it is defined and is not null.
 *
 * @throws {TypeError} If the `value` is null or undefined.
 *
 * @since v0.9.0
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

/**
 * A type guard that returns `true` if a given `value` is defined and is not `null`.
 *
 * @since v0.1.0
 */
export function isPresent<T>(value: T | null | undefined): value is Present<T> {
    return isDefined(value) && isNotNull(value);
}

/**
 * Constructs a type by excluding non-`null` and defined types from `T`.
 *
 * @since v0.1.0
 */
export type Absent<T> = T extends null | undefined ? T : never;

/**
 * A type guard that return `true` if a given `value` is `null` or `undefined`.
 *
 * @since v0.1.0
 */
export function isAbsent<T>(value: T | null | undefined): value is null | undefined {
    return isUndefined(value) || isNull(value);
}
