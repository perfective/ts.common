import { Unary } from '../../function/function/unary';

import { CodePoint, Utf16CodeUnit } from './string';

/**
 * Index of the first match or `-1` if not match was found.
 *
 * @since v0.2.0
 */
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents -- -1 is an error code
export type NumberOrErrorCode = number | -1;

/**
 * Creates a function that returns a UTF-16 code unit at a given zero-based `index` in the input string.
 *
 * @since v0.2.0
 */
export function charAt(index: number): Unary<string, string> {
    return (value: string): string => value.charAt(index);
}

/**
 * Creates a function that returns a UTF-16 code unit value at a given zero-based `index` in the input string.
 *
 * @since v0.2.0
 */
export function charCodeAt(index: number): Unary<string, Utf16CodeUnit> {
    // eslint-disable-next-line unicorn/prefer-code-point -- lifted function
    return (value: string): number => value.charCodeAt(index);
}

/**
 * Creates a function that returns a code point value of the character at a given `index` in the input string;
 * or returns `undefined` if the given `index` is out of range.
 *
 * @since v0.2.0
 */
export function codePointAt(position: number): Unary<string, CodePoint | undefined> {
    return (value: string): number | undefined => value.codePointAt(position);
}

/**
 * Creates a function that returns a string built from the input string and concatenated with given `strings`.
 *
 * @since v0.2.0
 */
export function concat(...strings: string[]): Unary<string, string> {
    return (value: string): string => value.concat(...strings);
}

/**
 * Creates a function that returns a string built from the input string(s) concatenated to a given `string`.
 *
 * @since v0.2.3
 */
export function concatTo(value: string): Unary<string | string[], string> {
    return (input: string | string[]): string => value
        .concat(...Array.isArray(input) ? input : [input]);
}

/**
 * Creates a function that returns `true` if a given `search` string is found at a given `endPosition` index
 * of the input string.
 * If `endPosition` is omitted, the input string length is used.
 *
 * @since v0.2.0
 */
export function endsWith(search: string, endPosition?: number): Unary<string, boolean> {
    return (value: string): boolean => value.endsWith(search, endPosition);
}

/**
 * Creates a function that returns `true` if a given `search` string is found in the input string
 * starting at a given `position` index.
 *
 * @since v0.2.0
 */
export function includes(search: string, position: number = 0): Unary<string, boolean> {
    return (value: string): boolean => value.includes(search, position);
}

/**
 * Creates a function that returns the index of the first occurrence of a given `search` string in the input string,
 * starting at a given `from` index;
 * or returns `-1` if the given `search` string is not found.
 *
 * TODO(https://github.com/perfective/ts.common/issues/29): Return undefined instead of -1.
 *
 * @since v0.2.0
 */
export function indexOf(search: string, from: number = 0): Unary<string, NumberOrErrorCode> {
    return (value: string): number => value.indexOf(search, from);
}

/**
 * Creates a function that returns the index of the first occurrence of a given `search` string in the input string,
 * starting at a given `from` index;
 * or returns `-1` if the given `search` string is not found.
 *
 * TODO(https://github.com/perfective/ts.common/issues/29): Return undefined instead of -1.
 *
 * @since v0.2.0
 */
export function lastIndexOf(search: string, from?: number): Unary<string, NumberOrErrorCode> {
    return (value: string): number => value.lastIndexOf(search, from);
}

/**
 * Converts a given string to lower case.
 *
 * @since v0.1.0
 */
export function lowerCase(value: string): string {
    return value.toLowerCase();
}

/**
 * Normalization form canonical composition and decomposition.
 *
 * @see https://en.wikipedia.org/wiki/Unicode_equivalence
 * @see https://unicode.org/reports/tr15/
 *
 * @since v0.2.0
 */
export type UnicodeCanonicalEquivalenceNormalization = 'NFC' | 'NFD';

/**
 * Normalization form compatibility composition and decomposition.
 *
 * @see https://en.wikipedia.org/wiki/Unicode_equivalence
 * @see https://unicode.org/reports/tr15/
 *
 * @since v0.2.0
 */
export type UnicodeCompatibilityNormalization = 'NFKC' | 'NFKD';

/**
 * Unicode normalization forms.
 *
 * @see https://en.wikipedia.org/wiki/Unicode_equivalence
 * @see https://unicode.org/reports/tr15/
 *
 * @since v0.2.0
 */
export type UnicodeNormalizationForm = UnicodeCanonicalEquivalenceNormalization | UnicodeCompatibilityNormalization;

/**
 * Creates a function that returns a string containing the Unicode Normalization Form of the input string
 * for a given normalization `form`.
 *
 * @since v0.2.0
 */
export function normalize(form: UnicodeNormalizationForm = 'NFC'): Unary<string, string> {
    return (value: string): string => value.normalize(form);
}

/**
 * Creates a function that pads the of end the input string with a given `fill` string up to the target `length`.
 *
 * @since v0.2.0
 */
export function padEnd(length: number, fill: string = ' '): Unary<string, string> {
    return (value: string): string => value.padEnd(length, fill);
}

/**
 * Creates a function that pads the of start the input string with a given `fill` string up to the target `length`.
 *
 * @since v0.2.0
 */
export function padStart(length: number, fill: string = ' '): Unary<string, string> {
    return (value: string): string => value.padStart(length, fill);
}

/**
 * Creates a function that creates a string consisting of a given `count` of copies of the input string.
 *
 * @since v0.2.0
 */
export function repeat(count: number): Unary<string, string> {
    return (value: string): string => value.repeat(count);
}

/**
 * Creates a function that replaces given `search` substrings in the input string with a given `replacement`.
 *
 * @since v0.2.0
 */
export function replace(search: string | RegExp, replacement: string): Unary<string, string> {
    return (value: string): string => value.replace(search, replacement);
}

/**
 * A function to be invoked for every match in the {@link String#replace} method.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
 *
 * @since v0.2.0
 */
export type Replacement = (substring: string, ...args: unknown[]) => string;

/**
 * Creates a function that replaces given `search` substrings in the input string
 * with a result of the `replacement` function (invoked on every match).
 *
 * @since v0.2.0
 */
export function replaceWith(search: string | RegExp, replacement: Replacement): Unary<string, string> {
    return (value: string): string => value.replace(search, replacement);
}

/**
 * Creates a function that returns the index of the first occurrence of a given regular expression in the input string;
 * or returns `-1` if the given expression is not found.
 *
 * TODO(https://github.com/perfective/ts.common/issues/29): Return undefined instead of -1.
 *
 * @since v0.2.0
 */
export function search(search: RegExp): Unary<string, NumberOrErrorCode> {
    return (value: string): NumberOrErrorCode => value.search(search);
}

/**
 * Creates a function that returns a section of the input string from a given `start` index to the end of the string,
 * or to a given `end` index (exclusive).
 *
 * @since v0.2.0
 */
export function slice(start: number, end?: number): Unary<string, string> {
    return (value: string): string => value.slice(start, end);
}

/**
 * Creates a function that creates an ordered list of substrings by splitting the input string
 * using a given `separator` and up to an optional `limit`.
 *
 * @since v0.1.0
 */
export function split(separator: string | RegExp, limit?: number): Unary<string, string[]> {
    return (value: string): string[] => value.split(separator, limit);
}

/**
 * Creates a function that returns `true` if the input string begins with a given `search` substring
 * at a given `from` index.
 *
 * @since v0.2.0
 */
export function startsWith(search: string, from: number = 0): Unary<string, boolean> {
    return (value: string): boolean => value.startsWith(search, from);
}

/**
 * Removes whitespace from both ends of a given string.
 *
 * @since v0.1.0
 */
export function trim(value: string): string {
    return value.trim();
}

/**
 * Converts a given string to upper case.
 *
 * @since v0.1.0
 */
export function upperCase(value: string): string {
    return value.toUpperCase();
}
