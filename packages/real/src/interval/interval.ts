import { Predicate } from '@perfective/fp';

export interface Interval {
    readonly min: number;
    readonly max: number;
}

export function interval(a: number, b: number): Interval {
    if (a > b) {
        return {
            min: b,
            max: a,
        };
    }
    return {
        min: a,
        max: b,
    };
}

export function intervalFromPair(pair: readonly [number, number]): Interval {
    return interval(pair[0], pair[1]);
}

export function isInInterval(interval: Interval): Predicate<number> {
    return (variable: number): boolean => interval.min <= variable && variable <= interval.max;
}

export function isInOpenInterval(interval: Interval): Predicate<number> {
    return (variable: number): boolean => interval.min < variable && variable < interval.max;
}

export function isInOpenMinInterval(interval: Interval): Predicate<number> {
    return (variable: number): boolean => interval.min < variable && variable <= interval.max;
}

export function isInOpenMaxInterval(interval: Interval): Predicate<number> {
    return (variable: number): boolean => interval.min <= variable && variable < interval.max;
}
