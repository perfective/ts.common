import { isString } from '../../string/string/string';

/**
 * An integer value representing the number of milliseconds since January 1, 1970 00:00 UTC.
 *
 * @since v0.10.0
 */
export type Timestamp = number;

/**
 * Returns a {@link Timestamp} for a given {@link Date}.
 *
 * If the given `date` is "Invalid Date", returns `null`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
 *
 * @since v0.10.0
 */
export function timestamp(date: Date): Timestamp | null;

/**
 * Parses a given date/time `input` string as a {@link Timestamp}.
 *
 * If the given `input` is invalid, returns `null`.
 *
 * Use instead of the `Date.parse()` function,
 * as it's easy to compose using the `maybe()` monad.
 *
 * @param input - A string in the date/time string format.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
 *
 * @since v0.10.0
 */
export function timestamp(input: string): Timestamp | null;

export function timestamp(value: Date | string): Timestamp | null {
    const output = isString(value) ? Date.parse(value) : value.getTime();
    if (Number.isNaN(output)) {
        return null;
    }
    return output;
}
