/**
 * Returns `true` if a given value is a `string`.
 *
 * @since v0.1.0
 */
export function isString<T>(value: T | string): value is string {
    return typeof value === 'string';
}

/**
 * Returns `true` if a given value is not a `string`.
 *
 * @since v0.1.0
 */
export function isNotString<T>(value: T | string): value is T {
    return typeof value !== 'string';
}

/**
 * Returns `true` if a given string is empty.
 *
 * @since v0.1.0
 */
export function isEmpty(value: string): boolean {
    return value === '';
}

/**
 * Returns `true` if a given string is not empty.
 *
 * @since v0.1.0
 */
export function isNotEmpty(value: string): boolean {
    return value !== '';
}

/**
 * Returns the length of a given string.
 *
 * @since v0.2.0
 */
export function length(value: string): number {
    return value.length;
}

/**
 * A integer between `0` and `65535` (`0xFFFF`) representing a UTF-16 code unit.
 *
 * @see https://en.wikipedia.org/wiki/UTF-16
 *
 * @since v0.2.0
 */
export type Utf16CodeUnit = number;

/**
 * @since v0.2.0
 * @deprecated Since v0.10.0. Use {@link String.fromCharCode} directly.
 * TODO: Remove in v0.11.0-alpha.
 */
export function stringFromCharCode(...codes: Utf16CodeUnit[]): string {
    // eslint-disable-next-line unicorn/prefer-code-point -- proxy function
    return String.fromCharCode(...codes);
}

/**
 * An integer between `0` and `0x10FFFF` (inclusive) representing a Unicode code point.
 *
 * @see https://en.wikipedia.org/wiki/UTF-16
 *
 * @since v0.2.0
 */
export type CodePoint = number;

/**
 * @since v0.2.0
 * @deprecated Since v0.10.0. Use {@link String.fromCodePoint} directly.
 * TODO: Remove in v0.11.0-alpha.
 */
export function stringFromCodePoint(...codePoints: CodePoint[]): string {
    return String.fromCodePoint(...codePoints);
}
