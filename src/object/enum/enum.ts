import { decimal } from '../../number/number/base';

/**
 * An {@linkcode Object} with string keys and string or number values
 * as generated by the TypeScript for an `enum` definition.
 *
 * @see https://www.typescriptlang.org/docs/handbook/enums.html
 *
 * @since v0.6.0
 */
export type Enum<T extends number | string> = Record<string, T>;

/**
 * Defines a type of the keys of an {@linkcode Enum}.
 *
 * @since v0.6.0
 */
export type Member<T extends number | string> = keyof Enum<T>;

/**
 * Returns the list of enum keys.
 *
 * @since v0.6.0
 */
export function members<T extends number | string>(value: Enum<T>): Member<T>[] {
    return Object.keys(value)
        .filter(key => decimal(key) === null);
}
