import { Predicate } from '@perfective/fp';

export interface Interval {
    readonly min: number;
    readonly max: number;
}

export function interval(min: number, max: number): Interval | null {
    if (min > max) {
        return null;
    }
    return {
        min,
        max,
    };
}

export function intervalFromPair(pair: readonly [number, number]): Interval | null {
    return interval(pair[0], pair[1]);
}

export function isInInterval(interval: Interval): Predicate<number> {
    return (variable: number): boolean => interval.min <= variable && variable <= interval.max;
}

export function isInOpenInterval(interval: Interval): Predicate<number> {
    return (variable: number): boolean => interval.min < variable && variable < interval.max;
}

export function isInLeftOpenInterval(interval: Interval): Predicate<number> {
    return (variable: number): boolean => interval.min < variable && variable <= interval.max;
}

export function isInRightOpenInterval(interval: Interval): Predicate<number> {
    return (variable: number): boolean => interval.min <= variable && variable < interval.max;
}

export function range(values: number[]): Interval | undefined {
    if (values.length === 0) {
        return undefined;
    }
    return {
        min: Math.min(...values),
        max: Math.max(...values),
    };
}
