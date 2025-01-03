import { NonNegativeNumber } from '../number/number';

/**
 * A nominal type for radians.
 */
export type Radians = number;

/**
 * Returns the inverse cosine [0, π] of the given cosine value [-1, 1].
 *
 * Returns `null`, if the given cosine is less than -1 or greater than 1.
 */
export function arccos(cosine: number): Radians | null {
    const arccos = Math.acos(cosine);
    if (Number.isNaN(arccos)) {
        return null;
    }
    return arccos;
}

/**
 * Returns the inverse hyperbolic cosine [0, +∞) of a given number from [1, +∞).
 *
 * Returns `null` if the given number is less than 1.
 *
 * @since v0.11.0
 */
export function arccosh(value: number): NonNegativeNumber | null {
    const result = Math.acosh(value);
    if (Number.isNaN(result)) {
        return null;
    }
    return result;
}

/**
 * Returns the inverse sine [-π/2, π/2] of the given sine value [-1, 1].
 *
 * Returns `null`, if the given sine is less than -1 or greater than 1.
 */
export function arcsin(sine: number): Radians | null {
    const arcsin = Math.asin(sine);
    if (Number.isNaN(arcsin)) {
        return null;
    }
    return arcsin;
}
