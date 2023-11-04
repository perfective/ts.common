import { Predicate } from '../../boolean/predicate/predicate';
import { maximum, minimum } from '../math/set';
import { isNumber } from '../number/number';

/**
 * Two fixed endpoints of a numbers interval.
 *
 * @see https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * @since v0.2.0
 */
export interface Interval {
    readonly min: number;
    readonly max: number;
}

/**
 * Creates an {@link Interval} from given `min` and `max` numbers.
 *
 * If `min` is greater than `max`, returns `null`.
 *
 * @since v0.2.0
 */
export function interval(min: number, max: number): Interval | null {
    if (min > max) {
        return null;
    }
    return {
        min,
        max,
    };
}

/**
 * Creates an {@link Interval} from a given pair of numbers, where the first number is `min` and the second is `max`.
 *
 * If `min` is greater than `max`, returns `null`.
 *
 * @since v0.2.0
 */
export function intervalFromPair([min, max]: readonly [number, number]): Interval | null {
    return interval(min, max);
}

/**
 * Creates an {@link Interval} from the minimum and maximum numbers in a given array of numbers.
 *
 * If the given array is empty, returns `null`.
 *
 * @since v0.5.0
 */
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

/**
 * Creates an {@link Interval} from the given `min` and `max` numbers, which can be null.
 *
 * If the `min` is `null`, the interval will have a minimum of -∞.
 * If the `max` is `null`, the interval will have a maximum of +∞.
 *
 * @since v0.5.0
 */
export function intervalFromNullable(min: number | null, max: number | null): Interval | null {
    return interval(
        isNumber(min) ? min : Number.NEGATIVE_INFINITY,
        isNumber(max) ? max : Number.POSITIVE_INFINITY,
    );
}

/**
 * Creates a predicate that checks returns `true`
 * if the input number is greater than or equal to the given `interval` minimum,
 * or is less than or equal the given `interval` maximum.
 *
 * @since v0.2.0
 */
export function isInInterval(interval: Interval): Predicate<number> {
    return (variable: number): boolean => interval.min <= variable && variable <= interval.max;
}

/**
 * Creates a predicate that checks returns `true`
 * if the input number is greater than the given `interval` minimum,
 * or is less than the given `interval` maximum.
 *
 * @since v0.2.0
 */
export function isInOpenInterval(interval: Interval): Predicate<number> {
    return (variable: number): boolean => interval.min < variable && variable < interval.max;
}

/**
 * Creates a predicate that checks returns `true`
 * if the input number is greater than the given `interval` minimum,
 * or is less than or equal the given `interval` maximum.
 *
 * @since v0.3.0
 */
export function isInLeftOpenInterval(interval: Interval): Predicate<number> {
    return (variable: number): boolean => interval.min < variable && variable <= interval.max;
}

/**
 * Creates a predicate that checks returns `true`
 * if the input number is greater than or equal to the given `interval` minimum,
 * or is less than the given `interval` maximum.
 *
 * @since v0.2.0
 */
export function isInRightOpenInterval(interval: Interval): Predicate<number> {
    return (variable: number): boolean => interval.min <= variable && variable < interval.max;
}
