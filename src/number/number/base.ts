import { Integer } from './integer';
import { isNumber } from './number';

/**
 * Returns a string representing a specified number in decimal notation (base 10).
 *
 * @since v0.1.0
 */
export function decimal(value: number): string;

/**
 * Returns a `number` parsed from a given string in decimal notation (base 10).
 * If the string cannot be parsed, returns `null`.
 *
 * This function is convenient in the `Maybe` chain, because `decimal` returns `null`
 * while {@link Number.parseFloat} and {@link Number.parseInt} return {@link NaN}.
 *
 * @since v0.1.0
 */
export function decimal(value: string): number | null;

export function decimal(value: number | string): string | number | null {
    if (typeof value === 'string') {
        const float: number = Number.parseFloat(value);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Runtime check for NaN
        return isNumber(float) ? float : null;
    }
    return value.toString(10);
}

/**
 * Returns a string representing a specified integer in binary notation (base 2).
 *
 * If given a float, converts only its integer part.
 *
 * @since v0.1.0
 */
export function binary(value: Integer): string;

/**
 * Returns an {@link Integer} `number` parsed from a given string in binary notation (base 2).
 * If the string cannot be parsed, returns `null`.
 *
 * This function is convenient in the `Maybe` chain, because `decimal` returns `null`
 * while {@link Number.parseFloat} and {@link Number.parseInt} return {@link NaN}.
 *
 * @since v0.1.0
 */
export function binary(value: string): Integer | null;

export function binary(value: Integer | string): string | Integer | null {
    return base(2, value);
}

/**
 * Returns a string representing a specified integer in octal notation (base 8).
 *
 * If given a float, converts only its integer part.
 *
 * @since v0.1.0
 */
export function octal(value: Integer): string;

/**
 * Returns an {@link Integer} `number` parsed from a given string in octal notation (base 8).
 * If the string cannot be parsed, returns `null`.
 *
 * This function is convenient in the `Maybe` chain, because `decimal` returns `null`
 * while {@link Number.parseFloat} and {@link Number.parseInt} return {@link NaN}.
 *
 * @since v0.1.0
 */
export function octal(value: string): Integer | null;

export function octal(value: Integer | string): string | Integer | null {
    return base(8, value);
}

/**
 * Returns a string representing a specified integer in hexadecimal notation (base 16).
 *
 * If given a float, converts only its integer part.
 *
 * @since v0.1.0
 */
export function hexadecimal(value: Integer): string;

/**
 * Returns an {@link Integer} `number` parsed from a given string in hexadecimal notation (base 16).
 * If the string cannot be parsed, returns `null`.
 *
 * This function is convenient in the `Maybe` chain, because `decimal` returns `null`
 * while {@link Number.parseFloat} and {@link Number.parseInt} return {@link NaN}.
 *
 * @since v0.1.0
 */
export function hexadecimal(value: string): Integer | null;

export function hexadecimal(value: Integer | string): string | Integer | null {
    return base(16, value);
}

type Base = 2 | 8 | 16;

function base(base: Base, value: Integer | string): string | Integer | null {
    if (typeof value === 'string') {
        const integer: number = Number.parseInt(value, base);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Runtime check for NaN
        return isNumber(integer) ? integer : null;
    }
    return Math.floor(value).toString(base);
}
