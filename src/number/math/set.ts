import { isNumber } from '../number/number';

/**
 * Returns the largest of given numbers (ignores {@link NaN}).
 *
 * If the given `values` array is empty or contains only {@link NaN}, returns `null`.
 *
 * Use this function instead of {@link Math.max}, as it returns `Infinity` or `NaN` for edge cases.
 *
 * @see Math.max
 *
 * @since v0.5.0
 */
export function maximum(values: readonly number[]): number | null {
    const numbers: number[] = values.filter(isNumber);
    if (numbers.length === 0) {
        return null;
    }
    return Math.max(...numbers);
}

/**
 * Returns the smallest of given numbers (ignores {@link NaN}).
 *
 * If the given `values` array is empty or contains only {@link NaN}, returns `null`.
 *
 * Use this function instead of {@link Math.min}, as it returns `Infinity` or `NaN` for edge cases.
 *
 * @see Math.min
 *
 * @since v0.5.0
 */
export function minimum(values: readonly number[]): number | null {
    const numbers: number[] = values.filter(isNumber);
    if (numbers.length === 0) {
        return null;
    }
    return Math.min(...numbers);
}
