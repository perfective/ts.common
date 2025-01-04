import { invalidArgumentException } from '../../error/exception/exception';
import { NonNegativeNumber } from '../number/number';

/**
 * A nominal type for radians.
 */
export type Radians = number;

/**
 * Returns the inverse cosine [0, π] of the given cosine value [-1, 1].
 *
 * @throws Exception - if the given cosine is less than -1, greater than 1, or is NaN.
 *
 * @since v0.11.0
 */
// eslint-disable-next-line complexity -- assertions
export function arccos(cosine: number): Radians | null {
    if (Number.isNaN(cosine) || cosine < -1 || cosine > 1) {
        throw invalidArgumentException('cosine', '[-1, 1]', String(cosine));
    }
    return Math.acos(cosine);
}

/**
 * Returns the inverse hyperbolic cosine [0, +∞) of a given number from [1, +∞).
 *
 * @throws Exception - if the given number is less than 1 or is NaN.
 *
 * @since v0.11.0
 */
export function arccosh(value: number): NonNegativeNumber | null {
    if (Number.isNaN(value) || value < 1) {
        throw invalidArgumentException('value', '[1, +∞)', String(value));
    }
    return Math.acosh(value);
}

/**
 * Returns the inverse sine [-π/2, π/2] of the given sine value [-1, 1].
 *
 * @throws Exception - if the given number is less than -1, greater than 1, or is NaN.
 *
 * @since v0.11.0
 */
// eslint-disable-next-line complexity -- assertions
export function arcsin(sine: number): Radians | null {
    if (Number.isNaN(sine) || sine < -1 || sine > 1) {
        throw invalidArgumentException('sine', '[-1, 1]', String(sine));
    }
    return Math.asin(sine);
}

/**
 * Returns the inverse hyperbolic sine (-∞, +∞) of a given number from (-∞, +∞).
 *
 * @throws Exception - if the given number is NaN.
 *
 * @since v0.11.0
 */
export function arcsinh(value: number): number {
    if (Number.isNaN(value)) {
        throw invalidArgumentException('value', '(-∞, +∞)', String(value));
    }
    return Math.asinh(value);
}
