import { Unary } from '@perfective/fp';

export type Element<A> = A extends readonly (infer T)[] ? T : undefined;

export function head<T>(array: T[]): T | undefined {
    return array[0];
}

export function tail<T>(array: T[]): T | undefined {
    return array[array.length - 1];
}

export function element<T>(index: number): Unary<T[], T | undefined> {
    return (array: T[]): T | undefined => array[index];
}

export function first<T>(count: number = 1): Unary<T[], T[]> {
    return (array: T[]): T[] => array.slice(0, count);
}

export function last<T>(count: number = 1): Unary<T[], T[]> {
    return (array: T[]): T[] => array.slice(-count);
}
