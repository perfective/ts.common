/**
 * A type of object that have the `length` property.
 *
 * @since v0.6.0
 */
export interface Length {
    length: number;
}

/**
 * Returns the {@linkcode Length.length|length} property of a given `value`.
 *
 * @since v0.6.0
 */
export function length<L extends Length>(value: L): number {
    return value.length;
}

/**
 * Returns a predicate that checks if the input value has a given `length`.
 *
 * @since v0.6.0
 */
export function hasLength<L extends Length>(length: number): (value: L) => boolean {
    return (value: L): boolean => value.length === length;
}

/**
 * Returns `true` if a given `value` has non-positive length.
 *
 * @since v0.6.0
 */
export function isEmpty<L extends Length>(value: L): boolean {
    return value.length <= 0;
}

/**
 * Returns `true` if a given `value` has length greater than 0.
 *
 * @since v0.6.0
 */
export function isNotEmpty<L extends Length>(value: L): boolean {
    return value.length > 0;
}

/**
 * Returns the shortest of two given values.
 *
 * The function can be used as an {@linkcode Array.reduce} callback.
 *
 * @since v0.6.0
 */
export function toShortest<T extends Length>(first: T, second: T): T {
    return first.length < second.length ? first : second;
}

/**
 * Returns the longest of two given values.
 *
 * The function can be used as an {@linkcode Array.reduce} callback.
 *
 * @since v0.6.0
 */
export function toLongest<T extends Length>(first: T, second: T): T {
    return first.length > second.length ? first : second;
}
