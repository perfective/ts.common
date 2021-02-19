import { Unary } from '@perfective/fp';

import { Enum } from '../enum/enum';

export type Bitmask<T extends Enum<number> | number = number> = T extends Enum<number> ? T[keyof T] : number;

/**
 * Creates a bitmask by raising all given flags.
 */
export function bitmask<T extends Bitmask = Bitmask>(flags: T[]): number {
    return flags.reduce(withFlagOn, 0);
}

/**
 * Creates a curried version of the hasRaised() function.
 *
 * @see isFlagOn()
 */
export function hasFlagOn<T extends Bitmask = number>(flag: T): Unary<T, boolean> {
    return (bitmask: T): boolean => isFlagOn(bitmask, flag);
}

/* eslint-disable no-bitwise -- bitmask operations require bitwise operators */

/**
 * Raises a bit flag on a given bitmask.
 */
export function withFlagOn<T extends Bitmask = Bitmask>(bitmask: T, flag: T): number {
    // TBD: Return type of the function has to be "number",
    //  because a particular combination of flags may not exist on the Enum<number>
    return bitmask | flag;
}

/**
 * Returns true when given flags are raised on a bitmask.
 */
export function isFlagOn<T extends Bitmask = Bitmask>(bitmask: T, flag: T): boolean {
    /* eslint-disable @typescript-eslint/tslint/config -- flag is a number */
    return (bitmask & flag) === flag
        && flag !== 0;
    /* eslint-enable @typescript-eslint/tslint/config */
}

/* eslint-enable no-bitwise */
