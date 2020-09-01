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

export type Utf16CodeUnit = number;

export function stringFromCharCode(...codes: Utf16CodeUnit[]): string {
    return String.fromCharCode(...codes);
}

export type CodePoint = number;

export function stringFromCodePoint(...codePoints: CodePoint[]): string {
    return String.fromCodePoint(...codePoints);
}
