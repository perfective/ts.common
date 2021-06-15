import { Predicate } from '../../function/function/predicate';
import { maximum, minimum } from '../math/set';
import { isNumber } from '../number/number';

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

export function intervalFromValues(values: number[]): Interval | null {
    const numbers: number[] = values.filter(isNumber);
    if (numbers.length === 0) {
        return null;
    }
    return intervalFromNullable(
        minimum(numbers),
        maximum(numbers),
    );
}

export function intervalFromNullable(min: number | null, max: number | null): Interval | null {
    return interval(
        isNumber(min) ? min : Number.NEGATIVE_INFINITY,
        isNumber(max) ? max : Number.POSITIVE_INFINITY,
    );
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
