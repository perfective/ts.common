import { NonNegativeNumber } from '../number/number';

/**
 * A nominal type for radians.
 */
export type Radians = number;

/**
 * Returns the inverse cosine of the given cosine value (between -1 and 1, inclusive).
 *
 * Returns `null`, if the given cosine is less than -1 or greater than 1.
 */
export function arccosine(cosine: number): Radians | null {
    const arccos = Math.acos(cosine);
    if (Number.isNaN(arccos)) {
        return null;
    }
    return arccos;
}

/**
 * Returns the inverse sine of the given sine value (between -1 and 1, inclusive).
 *
 * Returns `null`, if the given sine is less than -1 or greater than 1.
 */
export function arcsine(sine: number): Radians | null {
    const arcsin = Math.asin(sine);
    if (Number.isNaN(arcsin)) {
        return null;
    }
    return arcsin;
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
