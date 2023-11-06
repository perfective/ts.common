export function isString<T>(value: T | string): value is string {
    return typeof value === 'string';
}

export function isNotString<T>(value: T | string): value is T {
    return typeof value !== 'string';
}

export function isEmpty(value: string): boolean {
    return value === '';
}

export function isNotEmpty(value: string): boolean {
    return value !== '';
}

export function length(value: string): number {
    return value.length;
}

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

export type CodePoint = number;

/**
 * @since v0.2.0
 * @deprecated Since v0.10.0. Use {@link String.fromCodePoint} directly.
 * TODO: Remove in v0.11.0-alpha.
 */
export function stringFromCodePoint(...codePoints: CodePoint[]): string {
    return String.fromCodePoint(...codePoints);
}
