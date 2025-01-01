/**
 * Nominal type for the {@link Number.POSITIVE_INFINITY}.
 *
 * @since v0.11.0
 */
export type PositiveInfinity = typeof Number.POSITIVE_INFINITY;

/**
 * Nominal type for the {@link Number.NEGATIVE_INFINITY}.
 *
 * @since v0.11.0
 */
export type NegativeInfinity = typeof Number.NEGATIVE_INFINITY;

/**
 * Nominal type for positive or negative infinity.
 *
 * @since v0.11.0
 */
// eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents -- for readability.
export type Infinity = PositiveInfinity | NegativeInfinity;

/**
 * Returns `true` if the given value is a positive or negative {@link Infinity}.
 *
 * @since v0.11.0
 */
// eslint-disable-next-line complexity -- checking all possible values.
export function isInfinity(value: number): boolean {
    return value === Number.POSITIVE_INFINITY
        || value === Number.NEGATIVE_INFINITY
        // eslint-disable-next-line unicorn/prefer-number-properties -- specific value
        || value === Infinity
        // eslint-disable-next-line unicorn/prefer-number-properties -- specific value
        || value === -Infinity;
}

/**
 * Returns `true` if the given value is a positive or negative {@link Infinity}.
 *
 * @since v0.11.0
 */
export function isNotInfinity(value: number): boolean {
    return !isInfinity(value);
}
