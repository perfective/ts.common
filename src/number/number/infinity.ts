import { typeException } from '../../error/exception/exception';

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
export function isInfinity(value: number): value is Infinity {
    return value === Number.POSITIVE_INFINITY
        || value === Number.NEGATIVE_INFINITY
        // eslint-disable-next-line unicorn/prefer-number-properties -- specific value
        || value === Infinity
        // eslint-disable-next-line unicorn/prefer-number-properties -- specific value
        || value === -Infinity;
}

/**
 * Nominal type for a non-Infinity number.
 */
export type FiniteNumber = number;

/**
 * Returns `true` if a given value is not positive or negative {@link Infinity} and is not `NaN`.
 *
 * @since v0.11.0
 */
export function isFinite(value: number): value is FiniteNumber {
    return Number.isFinite(value);
}

/**
 * Asserts if a given value is a finite number.
 *
 * @throws {Exception} If the given value is `NaN` or is positive or negative infinity.
 */
export function assertIsFinite(value: number): asserts value is FiniteNumber;

/**
 * Asserts if a given value is a finite number.
 *
 * @throws {Exception} If the given value is `NaN` or is positive or negative infinity.
 */
export function assertIsFinite(name: string, value: number): asserts value is FiniteNumber;

export function assertIsFinite(arg1: number | string, arg2?: number): void {
    const [name, value] = typeof arg1 === 'string' ? [arg1, arg2] : ['value', arg1];

    if (!Number.isFinite(value)) {
        throw typeException(name, 'FiniteNumber', String(value));
    }
}
