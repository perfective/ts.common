import { Predicate } from '@perfective/fp';

export function includedIn<T>(array: T[], from?: number): Predicate<T> {
    return (value: T): boolean => array.includes(value, from);
}

export function isEmpty<T>(value: T[]): boolean {
    return value.length <= 0;
}

export function isNotEmpty<T>(value: T[]): boolean {
    return value.length > 0;
}
