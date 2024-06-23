/**
 * A nominal type for radians.
 */
export type Radians = number;

/**
 * Returns the inverse cosine of the given cosine (between -1 and 1, inclusive).
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
