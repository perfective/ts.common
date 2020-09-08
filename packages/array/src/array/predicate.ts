import { Predicate } from '@perfective/fp';

export function includedIn<T>(array: T[], from?: number): Predicate<T> {
    return (value: T): boolean => array.includes(value, from);
}
