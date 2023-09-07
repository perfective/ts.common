import { Timestamp } from './timestamp';

/**
 * Creates a copy of a given {@link Date}.
 *
 * If the `date` is invalid, returns `null`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
 *
 * @since v0.10.0
 */
export function date(date: Date): Date | null;

/**
 * Creates a {@link Date} for a given {@link Timestamp}.
 *
 * If the `timestamp` is invalid, returns `null`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
 *
 * @since v0.10.0
 */
export function date(timestamp: Timestamp): Date | null;

/**
 * Parses a {@link Date} from a given string.
 *
 * If the `input` cannot be parsed, returns `null`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
 *
 * @since v0.10.0
 */
export function date(input: string): Date | null;

export function date(value: Date | Timestamp | string): Date | null {
    const date = new Date(value);
    if (isInvalid(date)) {
        return null;
    }
    return date;
}

/**
 * Creates a {@link Date} for the current moment.
 *
 * The function uses the `Date.now()` as it can be mocked in unit tests.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
 * @see https://jestjs.io/docs/mock-function-api#jestspiedsource
 *
 * @since v0.10.0
 */
export function now(): Date {
    return new Date(Date.now());
}

/**
 * Creates a {@link Date} of the Unix epoch (i.e., January 1, 1970, 00:00:00 UTC).
 *
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Unix_time
 *
 * @since v0.10.0
 */
export function epoch(): Date {
    return new Date(0);
}

/**
 * Returns `true` if a given {@link Date} is a valid (not an "Invalid Date").
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#the_epoch_timestamps_and_invalid_date
 *
 * @since v0.10.0
 */
export function isValid(date: Date): boolean {
    return !Number.isNaN(date.valueOf());
}

/**
 * Returns `true` if a given {@link Date} is an "Invalid Date".
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#the_epoch_timestamps_and_invalid_date
 *
 * @since v0.10.0
 */
export function isInvalid(date: Date): boolean {
    return Number.isNaN(date.valueOf());
}
