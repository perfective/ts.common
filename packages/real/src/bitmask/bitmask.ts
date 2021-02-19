import { Unary } from '@perfective/fp';

import { Enum, Member, members } from '../enum/enum';

export type Flags<T extends number = number> = Enum<T>;
export type Flag<T extends Flags> = T[keyof T] & number;

export type Bitmask<T extends Flags | number = number> = T extends Flags ? Flag<T> : number;

/* eslint-disable no-bitwise -- bitmask operations require bitwise operators */

/**
 * Creates a bitmask by raising all given flags.
 */
export function bitmask<T extends Flags | number = number>(flags: Bitmask<T>[]): Bitmask {
    return flags.reduce((bitmask: number, flag: number) => bitmask | flag, 0b0);
}

/**
 * Returns flags that are raised on the given bitmask.
 */
export function raisedFlags<T extends number>(
    // TS2345: Argument of type 'typeof Style' is not assignable to parameter of type 'Record<string, number>'.
    // eslint-disable-next-line @typescript-eslint/ban-types -- TBD: Is it possible to pass Flags<T>?
    type: object,
    bitmask: Bitmask<T>,
): Member<T>[] {
    const flags: Flags<T> = type as unknown as Flags<T>;
    return members(flags)
        .filter(flag => isFlagOn(bitmask, flags[flag] as unknown as Bitmask<T>));
}

/**
 * Creates a curried version of the hasRaised() function.
 *
 * @see isFlagOn()
 */
export function hasFlagOn<T extends Flags | number>(flag: Bitmask<T>): Unary<Bitmask<T>, boolean> {
    return (bitmask: Bitmask<T>): boolean => isFlagOn(bitmask, flag);
}

/**
 * Returns true when given flags are raised on a bitmask.
 */
export function isFlagOn<T extends Flags | number>(bitmask: Bitmask<T>, flag: Bitmask<T>): boolean {
    /* eslint-disable @typescript-eslint/tslint/config -- flag is a number */
    return (bitmask & flag) === flag
        && flag !== 0;
    /* eslint-enable @typescript-eslint/tslint/config */
}

/* eslint-enable no-bitwise */
