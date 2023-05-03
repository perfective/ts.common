import { pushInto } from '../../array/array/lift';
import { error } from '../../error/error/error';
import { causedBy, chained, Exception, exception } from '../../error/exception/exception';
import { isGreaterThan } from '../../number/number/order';
import { isNotNull } from '../../value/value';

import { Failure, failure, failureFrom, isFailure, isNotFailure, Result, success } from './result';
import { resultDecimal, strictErrorOutput, strictNumberOutput } from './result.mock';

describe(failure, () => {
    describe('when a given input is an instance of an Error', () => {
        const output: Failure<unknown> = failure(exception('Error'));

        it('creates an instance of a Failure', () => {
            expect(output).toBeInstanceOf(Failure);
            expect(output).toBeInstanceOf(Result);
            expect(output.value).toBeInstanceOf(Error);
            expect(output.value).toBeInstanceOf(Exception);
        });
    });

    describe('when a given input is not an instance of an Error or a string', () => {
        it('throws a TypeError', () => {
            // @ts-expect-error -- TS2345: Argument of type 'number' is not assignable to parameter of type 'Error'.
            expect(() => failure(404))
                .toThrow(TypeError);
            // @ts-expect-error -- TS2345: Argument of type 'number' is not assignable to parameter of type 'Error'.
            expect(() => failure(404))
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

describe(isFailure, () => {
    describe('when a given `value` is a `Failure`', () => {
        it('returns true', () => {
            expect(isFailure(failure(error('Failure')))).toBe(true);
        });
    });

    describe('when a given `value` is not a `Failure`', () => {
        it('returns false', () => {
            expect(isFailure(error('Failure'))).toBe(false);
            expect(isFailure(success(0))).toBe(false);
        });
    });
});

describe(isNotFailure, () => {
    describe('when a given `value` is not a `Failure`', () => {
        it('returns true', () => {
            expect(isNotFailure(error('Failure'))).toBe(true);
            expect(isNotFailure(success(0))).toBe(true);
        });
    });

    describe('when a given `value` is a `Failure`', () => {
        it('returns true', () => {
            expect(isNotFailure(failure(error('Failure')))).toBe(false);
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
        describe('to(mapValue)', () => {
            it('ignores a given `mapValue` callback and returns itself', () => {
                const output: Failure<string> = input.to(strictNumberOutput);

                expect(output).toBe(input);
            });
        });

        describe('to(mapValue, mapError)', () => {
            it('applies a given `mapError` callback and returns its result wrapped into a Failure', () => {
                const output: Failure<string> = input.to(strictNumberOutput, chained('Exceptional Failure'));

                expect(output).toStrictEqual(failure(causedBy(input.value, 'Exceptional Failure')));
            });
        });

        describe('to(maps)', () => {
            it('applies the first callback of a given maps pair to the Failure.value and returns a Failure', () => {
                const output: Failure<string> = input.to([strictNumberOutput, chained('Exceptional Failure')]);

                expect(output).toStrictEqual(failure(causedBy(input.value, 'Exceptional Failure')));
            });
        });
    });

    describe('into', () => {
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

    describe('that', () => {
        it('returns itself', () => {
            expect(input.that(isGreaterThan(0), 'Is not greater than 0')).toBe(input);
        });
    });

    describe('which', () => {
        const input: Failure<number | null> = failure(error('Failure'));

        describe('when given an Error fallback', () => {
            const output: Failure<number> = input.which(isNotNull, error('Value is null'));

            it('returns itself', () => {
                expect(output).toBe(input);
            });
        });

        describe('when given an error message fallback', () => {
            const output: Failure<number> = input.which(isNotNull, 'Value is null');

            it('returns itself', () => {
                expect(output).toBe(input);
            });
        });
    });

    describe('when', () => {
        const input: Failure<number> = failure(error('Failure'));

        describe('when condition is true', () => {
            describe('when given an error', () => {
                const output: Failure<number> = input.when(true, error('Never'));

                it('returns itself', () => {
                    expect(output).toBe(input);
                });
            });

            describe('when given a message', () => {
                const output: Failure<number> = input.when(true, 'Never');

                it('returns itself', () => {
                    expect(output).toBe(input);
                });
            });
        });

        describe('when condition is false', () => {
            describe('when given an error', () => {
                const output: Failure<number> = input.when(false, error('Never'));

                it('returns itself', () => {
                    expect(output).toBe(input);
                });
            });

            describe('when given a message', () => {
                const output: Failure<number> = input.when(false, 'Never');

                it('returns itself', () => {
                    expect(output).toBe(input);
                });
            });
        });
    });

    describe('through', () => {
        describe('through(valueProcedure, errorProcedure)', () => {
            it('executes a given `errorProcedure`, ignores a `valueProcedure`, and returns itself', () => {
                const values: number[] = [];
                const errors: string[] = [];
                const input = failure<number>(error('Failure'));
                const output: Failure<number> = input.through(pushInto(values), error => errors.push(error.message));

                expect(output).toBe(input);
                expect(values).toStrictEqual([]);
                expect(errors).toStrictEqual(['Failure']);
            });
        });

        describe('through(procedures)', () => {
            it('executes the second callback in a given `procedures` pair and returns itself', () => {
                const values: number[] = [];
                const errors: string[] = [];
                const input = failure<number>(error('Failure'));
                const output: Failure<number> = input.through([
                    pushInto(values),
                    (error: Error): number => errors.push(error.message),
                ]);

                expect(output).toBe(input);
                expect(values).toStrictEqual([]);
                expect(errors).toStrictEqual(['Failure']);
            });
        });
    });
});
