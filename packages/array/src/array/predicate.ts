import { Predicate } from '@perfective/fp';

export function includedIn<T>(array: T[], fromIndex?: number): Predicate<T> {
    return (value: T): boolean => array.includes(value, fromIndex);
}
