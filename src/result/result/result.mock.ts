import { error, isError } from '../../error/error/error';
import { caughtError, Exception } from '../../error/exception/exception';
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
 * Converts a given number into a string and returns as a {@linkcode Success}.
 * If given an {@linkcode Error}, returns a {@linkcode Failure}.
 */
export function resultString(value: number | Error): Result<string> {
    if (isError(value)) {
        return failure(value);
    }
    return success(String(value));
}

/**
 * Converts a given value into a string and returns as a {@linkcode Failure}.
 */
export function successFailure(value: number | Error): Failure<string> {
    return failure(error(String(value)));
}

/**
 * Converts a given integer into a decimal string.
 *
 * Returns result as a {@linkcode Success} when `input` is an integer.
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
    try {
        return success(unsafeNumberOutput(input));
    }
    catch (error: unknown) {
        return failure(caughtError(error));
    }
}

export function successErrorMessage(error: Error): Success<string> {
    return success(error.message);
}

// eslint-disable-next-line unicorn/prefer-native-coercion-functions -- a strict number-to-string function for testing.
export function strictNumberOutput(input: number): string {
    return String(input);
}

// eslint-disable-next-line unicorn/prefer-native-coercion-functions -- a custom function signature for testing.
export function safeNumberOutput(input: number | Error): string {
    return String(input);
}

export function unsafeNumberOutput(input: string): number {
    const output = decimal(input);
    if (isNull(output)) {
        throw error('Failed to parse a number');
    }
    return output;
}

/**
 * Returns {@linkcode Error.message}.
 */
export function strictErrorOutput(error: Error): string {
    return error.message;
}

export function strictExceptionOutput(exception: Exception): string {
    return exception.template;
}
