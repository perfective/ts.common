/**
 * An integer value representing the number of milliseconds since January 1, 1970 00:00 UTC.
 */
export type Timestamp = number;

/**
 * Returns a {@link Timestamp} for a given {@link Date}.
 *
 * If the given `date` is "Invalid Date", returns `null`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
 */
export function timestamp(date: Date): Timestamp | null {
    const output = date.getTime();
    if (Number.isNaN(output)) {
        return null;
    }
    return output;
}
