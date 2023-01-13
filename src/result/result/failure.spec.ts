import { error } from '../../error/error/error';
import { Exception, exception } from '../../error/exception/exception';

import { Failure, failure, Result } from './result';
import { resultDecimal } from './result.mock';

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
    describe('onto', () => {
        it('ignores a given `flatMap` callback and returns itself', () => {
            const input = failure<number>(error('Failure'));
            const output: Failure<string> = input.onto(resultDecimal);

            expect(output).toBe(input);
        });
    });
});
