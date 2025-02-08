import { invalidArgumentException } from '../../error/exception/exception';

/**
 * Returns the cube root of a given number.
 *
 * @throws Exception - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function cubeRoot(value: number): number {
    if (Number.isNaN(value)) {
        throw invalidArgumentException('value', 'number', String(value));
    }
    return Math.cbrt(value);
}
