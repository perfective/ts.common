import { pushInto } from '../../array/array/lift';
import { error } from '../../error/error/error';
import { causedBy, chainedException, Exception, exception } from '../../error/exception/exception';

import { Failure, failure, failureFrom, Result } from './result';
import { resultDecimal, safeNumberOutput, strictErrorOutput, strictNumberOutput } from './result.mock';

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

describe(failureFrom, () => {
    it('creates a function to pass a `value` into a given `map` callback and return the result as a `Failure`', () => {
        const output = failureFrom(error);

        expect(output('Failure'))
            .toStrictEqual(failure(error('Failure')));
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
        describe('to(mapValue)', () => {
            it('ignores a given `mapValue` callback and returns itself', () => {
                const output: Failure<string> = input.to(strictNumberOutput);

                expect(output).toBe(input);
            });
        });

        describe('to(mapValue, mapError)', () => {
            it('applies a given `mapError` callback and returns its result wrapped into a Failure', () => {
                const output: Failure<string> = input.to(strictNumberOutput, chainedException('Exceptional Failure'));

                expect(output).toStrictEqual(failure(causedBy(input.value, 'Exceptional Failure')));
            });
        });

        describe('to(biMap)', () => {
            it('applies the first callback of a given biMap pair to the Failure.value and returns a Failure', () => {
                const output: Failure<string> = input.to([strictNumberOutput, chainedException('Exceptional Failure')]);

                expect(output).toStrictEqual(failure(causedBy(input.value, 'Exceptional Failure')));
            });
        });
    });

    describe('into', () => {
        describe('into(reduce)', () => {
            it('applies a given `reduce` callback to the Failure.value and returns the result', () => {
                expect(input.into(safeNumberOutput)).toBe('Failure');
            });

            it('allows a `reduce` callback that does not accept a non-Error input', () => {
                expect(input.into(strictErrorOutput)).toBe('Failure');
            });
        });

        describe('into(reduceValue, reduceError)', () => {
            it('returns the result of a given `reduceError` callback applied to the Failure.value', () => {
                expect(input.into(strictNumberOutput, strictErrorOutput)).toBe('Failure');
            });
        });

        describe('into(fold)', () => {
            it('returns the result of the second callback of the `fold` pair applied to the Failure.value', () => {
                expect(input.into([strictNumberOutput, strictErrorOutput])).toBe('Failure');
            });
        });
    });

    describe('run', () => {
        it('runs a given `errorProcedure`, ignores a `valueProcedure`, and returns itself', () => {
            const values: number[] = [];
            const errors: string[] = [];
            const input = failure<number>(error('Failure'));
            const output: Failure<number> = input.run(pushInto(values), error => errors.push(error.message));

            expect(output).toBe(input);
            expect(values).toStrictEqual([]);
            expect(errors).toStrictEqual(['Failure']);
        });
    });
});
