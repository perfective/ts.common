import { isNonNegativeInteger } from './integer';
import { isNumber } from './number';

/**
 * Natural number is a non-negative integer, according to the ISO 80000-2.
 *
 * @see https://en.wikipedia.org/wiki/Natural_number
 */
export type Natural = number;

export function isNatural<T>(value: number | T): value is Natural {
    if (isNumber(value)) {
        return isNonNegativeInteger(value);
    }
    return false;
}
