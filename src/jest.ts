/**
 * @file Defines internal functions for the Jest tests. This file is not distributed with the package.
 */

import { isUndefined } from './value/value';

/**
 * A generic object that can be passed into the Jest `describe.each()` function as a test data.
 *
 * Use {@linkcode TestCase.name} as `$name` in the Jest test suite title.
 * Pass {@linkcode TestCase.input} and {@linkcode TestCase.output} into the `describe` run function.
 */
export interface TestCase<T, U> {
    name: string;
    input: T;
    output: U;
}

/**
 * Creates a Jest {@linkcode TestCase} with a given {@linkcode input} and {@linkcode output}.
 *
 * Use this shortcut signature when a {@linkcode TestCase.name} can be derived from the {@linkcode input}.
 */
export function testCase<T, U>(input: T, output: U): TestCase<T, U>;

/**
 * Creates a Jest {@linkcode TestCase} with given {@linkcode name}, {@linkcode input}, and {@linkcode output}.
 */
export function testCase<T, U>(name: string, input: T, output: U): TestCase<T, U>;

export function testCase<T, U>(first: string | T, second: T | U, third?: U): TestCase<T, U> {
    if (isUndefined(third)) {
        return {
            name: String(first),
            input: first as T,
            output: second as U,
        };
    }
    return {
        name: first as string,
        input: second as T,
        output: third,
    };
}