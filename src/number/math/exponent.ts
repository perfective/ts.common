import { invalidArgumentException } from '../../error/exception/exception';
import { NonNegativeNumber } from '../number/number';

/**
 * Returns Euler's number `e` raised to the power of the given number.
 *
 * @throws Exception - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function exp(value: number): NonNegativeNumber {
    if (Number.isNaN(value)) {
        throw invalidArgumentException('value', 'number', String(value));
    }
    return Math.exp(value);
}
