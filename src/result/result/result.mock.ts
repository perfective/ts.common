import { error } from '../../error/error/error';
import { decimal } from '../../number/number/base';
import { isInteger } from '../../number/number/integer';
import { isNull } from '../../value/value';

import { Failure, failure, Result, Success, success } from './result';

/**
 * Obscures the type of a T and Error values, so TS compiler considers them as a T | Error only.
 */
export function eitherResult<T>(value: T | Error): T | Error {
    return value;
}

/**
 * Converts a given integer into a decimal string.
 *
 * Returns result as a {@linkcode Success} when {@linkcode input} is an integer.
 * Returns result as a {@linkcode Failure} otherwise.
 */
export function resultDecimal(input: number): Result<string> {
    if (isInteger(input)) {
        return successDecimal(input);
    }
    return failureDecimal(input);
}

/**
 * Converts a given integer into a decimal string and wraps it into a {@linkcode Success}.
 */
export function successDecimal(input: number): Success<string> {
    return success(input.toString(10));
}

/**
 * Converts a given integer into a decimal string and wraps it into a {@linkcode Failure}.
 */
export function failureDecimal<T>(input: number): Failure<T> {
    return failure(error(input.toString(10)));
}

/**
 * Parses a given string as a decimal number.
 *
 * Returns a number as  a {@linkcode Success}.
 * Returns a {@linkcode Failure} when a decimal number cannot be parsed.
 */
export function resultNumber(input: string): Result<number> {
    const output = decimal(input);
    if (isNull(output)) {
        return failure(error('Failed to parse a number'));
    }
    return success(output);
}

export function successErrorMessage(error: Error): Success<string> {
    return success(error.message);
}
