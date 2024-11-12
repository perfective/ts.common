import { isNonNegativeInteger } from './integer';
import { isNumber } from './number';

/**
 * A non-negative integer, according to the ISO 80000-2.
 *
 * @see https://en.wikipedia.org/wiki/Natural_number
 *
 * @since v0.5.0
 */
export type Natural = number;

/**
 * Returns `true` if a given number is a non-negative integer.
 *
 * @since v0.5.0
 */
export function isNatural(value: unknown): value is Natural {
    if (isNumber(value)) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard for nominal type
        return isNonNegativeInteger(value);
    }
    return false;
}
