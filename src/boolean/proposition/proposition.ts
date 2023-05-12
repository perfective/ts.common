import { Value, valueOf } from '../../function/function/nullary';

/**
 * A `boolean` value or a nullary function that returns a `boolean` value.
 *
 * @since v0.2.0
 */
export type Proposition = Value<boolean>;

/**
 * Returns `true` if a given `proposition` is `true` or returns `true`.
 * Otherwise, returns `false`.
 *
 * @since v0.2.0
 */
export function isTrue(proposition: Proposition): boolean {
    return valueOf(proposition);
}

/**
 * Returns `true` if a given `proposition` is `false` or returns `false`.
 * Otherwise, returns `false`.
 *
 * @since v0.2.0
 */
export function isFalse(proposition: Proposition): boolean {
    return !valueOf(proposition);
}

/**
 * Returns `true` if a given `proposition` is `false` or returns `false`.
 * Otherwise, returns `false`.
 *
 * @since v0.5.1
 */
export function negated(proposition: Proposition): boolean {
    return !valueOf(proposition);
}
