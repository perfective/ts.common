import { invalidArgumentException } from '../../error/exception/exception';

/**
 * A number that is greater than 0.
 *
 * @since v0.11.0
 */
export type PositiveNumber = number;

/**
 * A number that is less than or equal to 0.
 *
 * @since v0.11.0
 */
export type NonPositiveNumer = number;

/**
 * A number that is less than 0.
 *
 * @since v0.11.0
 */
export type NegativeNumber = number;

/**
 * A number that is greater than or equal to 0.
 *
 * @since v0.11.0
 */
export type NonNegativeNumber = number;

/**
 * Returns `true` if a given `value` is a number and not a {@link NaN}.
 *
 * @since v0.2.1
 */
export function isNumber(value: unknown): value is number {
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

/**
 * Indicator of the sign of the number.
 * -1 for negative numbers.
 * 1 for positive numbers.
 *
 * @since v0.11.0
 */
export type Sign = -1 | 1;

/**
 * Returns 1 if given a positive number, -1 if given a negative number.
 * Returns `null` if given 0 or -0.
 *
 * @throws Exception - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function sign(value: number): Sign | null {
    assertIsNotNaN(value);
    if (value === 0) {
        return null;
    }
    return Math.sign(value) as Sign;
}

/**
 * Asserts that the given number value is not NaN.
 *
 * @throws Exception - if the given number value is NaN.
 *
 * @since v0.11.0
 */
export function assertIsNotNaN(value: number): asserts value is number;

/**
 * Asserts that the given number value is not NaN.
 *
 * @throws Exception - if the given number value is NaN.
 *
 * @since v0.11.0
 */
// eslint-disable-next-line @typescript-eslint/unified-signatures -- docs and readability
export function assertIsNotNaN(value: number, expected: string): asserts value is number;

/**
 * Asserts that the given number value is not NaN.
 *
 * @throws Exception - if the given number value is NaN.
 *
 * @since v0.11.0
 */
export function assertIsNotNaN(argument: string, value: number): asserts value is number;

/**
 * Asserts that the given number value is not NaN.
 *
 * @throws Exception - if the given number value is NaN.
 *
 * @since v0.11.0
 */
// eslint-disable-next-line @typescript-eslint/unified-signatures -- docs and readability
export function assertIsNotNaN(argument: string, value: number, expected: string): asserts value is number;

// eslint-disable-next-line complexity -- polymorphism
export function assertIsNotNaN(arg1: string | number, arg2: number | string = 'number', arg3?: string): void {
    const [argument, value, expected] = [
        typeof arg1 === 'string' ? arg1 : 'value',
        typeof arg1 === 'number' ? arg1 : arg2,
        // eslint-disable-next-line no-nested-ternary -- arguments mapping
        typeof arg3 === 'string' ? arg3 : typeof arg2 === 'string' ? arg2 : 'number',
    ];
    if (Number.isNaN(value)) {
        throw invalidArgumentException(argument, expected, 'NaN');
    }
}
