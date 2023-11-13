/**
 * Returns `true` if a given `value` is a number and not a {@link NaN}.
 *
 * @since v0.2.1
 */
export function isNumber<T>(value: number | T): value is number {
    return typeof value === 'number' && !Number.isNaN(value);
}

/**
 * Returns `true` if a given `value` is not a number or is a {@link NaN}.
 *
 * @since v0.2.1
 */
export function isNotNumber<T>(value: number | T): value is T {
    // TODO(https://github.com/perfective/ts.common/issues/19): Handle NaN consistently.
    return typeof value !== 'number' || Number.isNaN(value);
}

/**
 * Returns the negated value of a given number.
 * If the given number is 0, returns 0.
 *
 * @since v0.5.1
 */
export function negative(value: number): number {
    if (value === 0) {
        return 0;
    }
    return -value;
}
