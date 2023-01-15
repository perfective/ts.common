import { error } from '../../error/error/error';
import { Exception, exception } from '../../error/exception/exception';
import { output as stringOutput } from '../../string/string/output';

import { Failure, failure, Result } from './result';
import { resultDecimal, safeStringOutput, strictErrorOutput } from './result.mock';

describe(failure, () => {
    describe('when a given input is an instance of an Error', () => {
        it('creates an instance of a Failure', () => {
            const output: Failure<unknown> = failure(exception('Error'));

            expect(output).toBeInstanceOf(Failure);
            expect(output).toBeInstanceOf(Result);
            expect(output.value).toBeInstanceOf(Error);
            expect(output.value).toBeInstanceOf(Exception);
        });
    });

    describe('when a given input is not an instance of an Error', () => {
        it('throws a TypeError', () => {
            // @ts-expect-error -- TS2345: Argument of type 'number' is not assignable to parameter of type 'Error'.
            expect(() => failure('Error'))
                .toThrow(TypeError);
            // @ts-expect-error -- TS2345: Argument of type 'number' is not assignable to parameter of type 'Error'.
            expect(() => failure('Error'))
                .toThrow('The value of `Failure` must be an instance of an `Error`');
        });
    });
});

describe(Failure, () => {
    const input = failure<number>(error('Failure'));

    describe('onto', () => {
        it('ignores a given `flatMap` callback and returns itself', () => {
            const output: Failure<string> = input.onto(resultDecimal);

            expect(output).toBe(input);
        });
    });

    describe('to', () => {
        it('ignores a given `map` callback and returns itself', () => {
            const output: Failure<string> = input.to(stringOutput);

            expect(output).toBe(input);
        });
    });

    describe('into', () => {
        it('applies a given `reduce` callback to the Failure.value and returns the result', () => {
            expect(input.into(safeStringOutput)).toBe('Failure');
        });

        it('allows a `reduce` callback that does not accept a non-Error input', () => {
            expect(input.into(strictErrorOutput)).toBe('Failure');
        });
    });
});