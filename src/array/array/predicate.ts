import { Predicate } from '../../boolean/predicate/predicate';

/**
 * Creates a callback that returns `true` if the input value is present in a given `array`
 * (optionally, checking `from` a given index).
 *
 * @since v0.1.1
 */
export function includedIn<T>(array: T[], from?: number): Predicate<T> {
    return (value: T): boolean => array.includes(value, from);
}

/**
 * Returns `true` if a given `array` is empty.
 * Otherwise, returns `false`.
 *
 * @since v0.2.0
 */
export function isEmpty<T>(array: T[]): boolean {
    return array.length <= 0;
}

/**
 * Returns `true` if a given `array` is not empty.
 * Otherwise, returns `false`.
 *
 * @since v0.2.0
 */
export function isNotEmpty<T>(value: T[]): boolean {
    return value.length > 0;
}
