/**
 * Splits a given string into an array of string based on the line separator (`\r\n\`, `\n`, and `\r`).
 *
 * @since v0.2.0
 */
export function lines(value: string): string[] {
    return value.split(/\r\n|\r|\n/gu);
}
