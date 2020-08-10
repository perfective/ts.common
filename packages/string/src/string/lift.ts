import { Unary } from '@perfective/fp';

export function charAt(index: number): Unary<string, string> {
    return (value: string): string => value.charAt(index);
}

export function charCodeAt(index: number): Unary<string, number> {
    return (value: string): number => value.charCodeAt(index);
}

export function codePointAt(position: number): Unary<string, number | undefined> {
    return (value: string): number | undefined => value.codePointAt(position);
}

export function concat(...strings: string[]): Unary<string, string> {
    return (value: string): string => value.concat(...strings);
}

export function endsWith(search: string, length?: number): Unary<string, boolean> {
    return (value: string): boolean => value.endsWith(search, length);
}

export function includes(search: string, position?: number): Unary<string, boolean> {
    return (value: string): boolean => value.includes(search, position);
}

export function indexOf(search: string, from: number = 0): Unary<string, number> {
    return (value: string): number => value.indexOf(search, from);
}

export function lastIndexOf(search: string, from?: number): Unary<string, number> {
    return (value: string): number => value.lastIndexOf(search, from);
}

export function lowerCase(): Unary<string, string> {
    return (value: string): string => value.toLowerCase();
}

export type UnicodeCanonicalEquivalenceNormalization = 'NFC' | 'NFD';
export type UnicodeCompatibilityNormalization = 'NFKC' | 'NFKD';
export type UnicodeNormalizationForm = UnicodeCanonicalEquivalenceNormalization | UnicodeCompatibilityNormalization;

export function normalize(form: UnicodeNormalizationForm = 'NFC'): Unary<string, string> {
    return (value: string): string => value.normalize(form);
}

export function padEnd(length: number, fill?: string): Unary<string, string> {
    return (value: string): string => value.padEnd(length, fill);
}

export function padStart(length: number, fill?: string): Unary<string, string> {
    return (value: string): string => value.padStart(length, fill);
}

export function repeat(count: number): Unary<string, string> {
    return (value: string): string => value.repeat(count);
}

export function replace(search: string | RegExp, replacement: string): Unary<string, string> {
    return (value: string): string => value.replace(search, replacement);
}

export type Replacement = (substring: string, ...args: unknown[]) => string;

/**
 * An alias for replace() to pass a Replacement function.
 */
export function replaceWith(search: string | RegExp, replacement: Replacement): Unary<string, string> {
    return (value: string): string => value.replace(search, replacement);
}

export function search(search: RegExp): Unary<string, number | -1> {
    return (value: string): number | -1 => value.search(search);
}

export function slice(start: number, end?: number): Unary<string, string> {
    return (value: string): string => value.slice(start, end);
}

export function split(separator: string | RegExp, limit?: number): Unary<string, string[]> {
    return (value: string): string[] => value.split(separator, limit);
}

export function startsWith(search: string, from: number = 0): Unary<string, boolean> {
    return (value: string): boolean => value.startsWith(search, from);
}

export function trim(): Unary<string, string> {
    return (value: string): string => value.trim();
}

export function upperCase(): Unary<string, string> {
    return (value: string): string => value.toUpperCase();
}
