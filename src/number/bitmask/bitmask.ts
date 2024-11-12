import { Unary } from '../../function/function/unary';
import { Enum, Member, members } from '../../object/enum/enum';

/**
 * An enum object with a list of available bitmask flags.
 *
 * @since v0.6.0
 */
export type Flags<T extends number = number> = Enum<T>;

/**
 * A bitmask flag defined in a given {@link Flags} enum.
 *
 * @since v0.6.0
 */
export type Flag<T extends Flags> = T[keyof T] & number;

/**
 * A bitmask consisting of one or more {@link Flags}.
 *
 * @see https://en.wikipedia.org/wiki/Mask_(computing)
 *
 * @since v0.6.0
 */
export type Bitmask<T extends Flags | number = number> = T extends Flags ? Flag<T> : number;

/* eslint-disable no-bitwise -- bitmask operations require bitwise operators */

/**
 * Creates a bitmask with all given flags raised.
 *
 * @since v0.6.0
 */
export function bitmask<T extends Flags | number = number>(flags: Bitmask<T>[]): Bitmask {
    return flags.reduce((bitmask: number, flag: number) => bitmask | flag, 0b0);
}

/**
 * Returns flags that are raised on the given bitmask.
 *
 * @since v0.6.0
 */
export function raisedFlags<T extends number>(
    // TS2345: Argument of type 'typeof Style' is not assignable to parameter of type 'Record<string, number>'.
    // eslint-disable-next-line @typescript-eslint/no-restricted-types -- TBD: Is it possible to pass Flags<T>?,
    type: object,
    bitmask: Bitmask<T>,
): Member<T>[] {
    const flags: Flags<T> = type as unknown as Flags<T>;
    return members(flags)
        // eslint-disable-next-line security/detect-object-injection -- only reading the property
        .filter(flag => isFlagOn(bitmask, flags[flag] as unknown as Bitmask<T>));
}

/**
 * Creates a function that returns `true` if a given `flag` is raised in the input bitmask.
 *
 * @see isFlagOn()
 *
 * @since v0.6.0
 */
export function hasFlagOn<T extends Flags | number>(flag: Bitmask<T>): Unary<Bitmask<T>, boolean> {
    return (bitmask: Bitmask<T>): boolean => isFlagOn(bitmask, flag);
}

/**
 * Returns `true` if a given flag is raised on a bitmask.
 *
 * @since v0.6.0
 */
export function isFlagOn<T extends Flags | number>(bitmask: Bitmask<T>, flag: Bitmask<T>): boolean {
    return (bitmask & flag) === flag
        && flag !== 0;
}

/* eslint-enable no-bitwise */
