import { Unary } from '@perfective/fp';

export function lowerCase(): Unary<string, string> {
    return (value: string): string => value.toLowerCase();
}

export function split(separator: string | RegExp, limit?: number): Unary<string, string[]> {
    return (value: string): string[] => value.split(separator, limit);
}

export function trim(): Unary<string, string> {
    return (value: string): string => value.trim();
}

export function upperCase(): Unary<string, string> {
    return (value: string): string => value.toUpperCase();
}
