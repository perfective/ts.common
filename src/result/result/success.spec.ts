import { pushInto } from '../../array/array/lift';
import { error } from '../../error/error/error';
import { chained, Exception, exception } from '../../error/exception/exception';
import { isEqualTo, isGreaterThan } from '../../number/number/order';
import { isNotNull, isNull } from '../../value/value';

import {
    Failure,
    failure, isNotSuccess,
    isSuccess,
    recovery,
    Result,
    Success,
    success,
    successFrom,
} from './result';
import {
    failureDecimal,
    resultDecimal,
    strictErrorOutput,
    strictExceptionOutput,
    strictNumberOutput,
    successDecimal,
    successErrorMessage,
} from './result.mock';

describe(success, () => {
    it('creates an instance of Success', () => {
        expect(success('Result')).toBeInstanceOf(Success);
        expect(success('Result')).toBeInstanceOf(Result);
    });

    it('creates an instance of Success even for an Error value', () => {
        const input: Exception = exception('Expected');
        const output: Success<Exception> = success(input);

        expect(output.value).toBe(input);
    });

    describe('is a unit function for the Result monad', () => {
        it('is a left identity for the "bind" (Result.onto)', () => {
            // Left identity: unit a >>= f  ===  fa
            expect(success(0).onto(resultDecimal))
                .toStrictEqual(resultDecimal(0));
            expect(success(error('Success')).onto(successErrorMessage))
                .toStrictEqual(successErrorMessage(error('Success')));
        });

        it('is a right identity for the "bind" (Result.onto)', () => {
            // Right identity: ma >>= unit  ===  ma

            // Success with a non-error value
            const sa = success(0);

            expect(sa.onto(success)).toStrictEqual(sa);

            // Success with an error value
            const sb = success(error('Success'));

            expect(sb.onto(success))
                .toStrictEqual(success(error('Success')));

            // Failure (with an error value)
            const fa = failure(error('Failure'));

            expect(fa.onto(success)).toStrictEqual(fa);
        });
    });
});

describe(successFrom, () => {
    it('creates a function to pass a `value` into a given `map` callback and return the result as a `Success`', () => {
        const outputNumber = successFrom(strictNumberOutput);
        const outputError = successFrom(strictErrorOutput);

        expect(outputNumber(0)).toStrictEqual(success('0'));
        expect(outputError(error('Success'))).toStrictEqual(success('Success'));
    });
});

describe(isSuccess, () => {
    describe('when a given `value` is a `Success`', () => {
        it('returns true', () => {
            expect(isSuccess(success(0))).toBe(true);
            expect(isSuccess(success(error('Failure')))).toBe(true);
        });
    });

    describe('when a given `value` is not a `Success`', () => {
        it('returns false', () => {
            expect(isSuccess(0)).toBe(false);
            expect(isSuccess(error('Failure'))).toBe(false);
            expect(isSuccess(failure(error('Failure')))).toBe(false);
        });
    });
});

describe(isNotSuccess, () => {
    describe('when a given `value` is not a `Success`', () => {
        it('returns true', () => {
            expect(isNotSuccess(0)).toBe(true);
            expect(isNotSuccess(error('Failure'))).toBe(true);
            expect(isNotSuccess(failure(error('Failure')))).toBe(true);
        });
    });

    describe('when a given `value` is a `Success`', () => {
        it('returns false', () => {
            expect(isNotSuccess(success(0))).toBe(false);
            expect(isNotSuccess(success(error('Failure')))).toBe(false);
        });
    });
});

describe(Success, () => {
    describe('onto', () => {
        it('applies a given `flatMap` callback to the Success.value. and returns the result', () => {
            expect(success(0).onto(successDecimal)).toStrictEqual(success('0'));
        });

        describe('when a given `flatMap` callback has a return type of Failure', () => {
            it('can be assigned to type Failure', () => {
                const output: Failure<unknown> = success(0).onto(failureDecimal);

                expect(output).toStrictEqual(failure(error('0')));
            });
        });

        describe('when a given `flatMap` callback has a return type of Success', () => {
            it('can be assigned to type Success', () => {
                const output: Success<string> = success(0).onto(successDecimal);

                expect(output).toStrictEqual(success('0'));
            });
        });

        describe('when a given `flatMap` callback has a return type of Result', () => {
            it('cannot be assigned to type Success', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Result<string>' is not assignable to type 'Success<string>'.
                const output: Success<string> = success(0).onto(resultDecimal);

                expect(output).toStrictEqual(success('0'));
            });

            it('cannot be assigned to type Failure', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Result<string>' is not assignable to type 'Failure<string>'.
                const output: Failure<string> = success(3.14).onto(resultDecimal);

                expect(output).toStrictEqual(failure(error('3.14')));
            });
        });
    });

    describe('to', () => {
        describe('to(mapValue)', () => {
            it('applies a given `mapValue` callback to the Success.value and returns a Success', () => {
                const output: Success<string> = success(0).to(strictNumberOutput);

                expect(output).toStrictEqual(success('0'));
            });
        });

        describe('to(mapValue, mapError)', () => {
            it('applies a given `mapValue` callback and ignores a given `mapError` callback', () => {
                const output: Success<string> = success(0)
                    .to(strictNumberOutput, chained('Exceptional Failure'));

                expect(output).toStrictEqual(success('0'));
            });
        });

        describe('to(maps)', () => {
            it('applies the first callback of a given maps pair to the Success.value and returns a Success', () => {
                const output: Success<string> = success(0)
                    .to([strictNumberOutput, chained('Exceptional Failure')]);

                expect(output).toStrictEqual(success('0'));
            });
        });
    });

    describe('into', () => {
        describe('into(reduceValue)', () => {
            it('applies a given `reduce` callback to the Success.value and returns the result', () => {
                expect(success(0).into(strictNumberOutput)).toBe('0');

                const sb = success(exception('Success of {{number}}', { number: '0' }));

                expect(sb.into(strictExceptionOutput)).toBe('Success of {{number}}');
            });
        });

        describe('into(reduceValue, reduceError)', () => {
            it('returns a result of applying a given `reduceValue` callback to the Success.value', () => {
                expect(success(0).into(strictNumberOutput, strictErrorOutput)).toBe('0');

                const sb = success(exception('Success of {{number}}', { number: '0' }));

                expect(sb.into(strictExceptionOutput, strictErrorOutput))
                    .toBe('Success of {{number}}');
            });
        });

        describe('into(fold)', () => {
            it('returns a result of applying the first callback of the `fold` pair to the Success.value', () => {
                expect(success(0).into([strictNumberOutput, strictErrorOutput])).toBe('0');

                const sb = success(exception('Success of {{number}}', { number: '0' }));

                expect(sb.into([strictExceptionOutput, strictErrorOutput]))
                    .toBe('Success of {{number}}');
            });
        });
    });

    describe('that', () => {
        const input = success(0);

        describe('when the Success.value satisfies a given Predicate', () => {
            it('returns itself', () => {
                expect(input.that(isEqualTo(0), 'Is not zero')).toBe(input);
            });
        });

        describe('when the Success.value does not satisfy a given Predicate', () => {
            describe('when a given error is an Error', () => {
                const errorInput = error('Is not greater than zero');

                it('returns a Failure with the given error', () => {
                    expect(input.that(isGreaterThan(0), errorInput))
                        .toStrictEqual(failure(errorInput));
                });
            });

            describe('when a given error is a string', () => {
                const errorInput = 'Value {{value}} is not greater than zero';

                it('returns a Failure with the given error', () => {
                    expect(input.that(isGreaterThan(0), errorInput))
                        .toStrictEqual(failure(exception(errorInput, {
                            value: '0',
                        }, {
                            value: 0,
                        })));
                });
            });
        });
    });

    describe('which', () => {
        const input = success<number | null>(0);

        describe('when the Success.value satisfies a given TypeGuard', () => {
            const output: Result<number> = input.which(isNotNull, 'The value is null');

            it('returns itself', () => {
                expect(output).toBe(input);
            });
        });

        describe('when the Success.value does not satisfy a given TypeGuard', () => {
            describe('when given an Error', () => {
                const output: Result<null> = input.which(isNull, error('The value is null'));

                it('returns a Failure with a given error', () => {
                    expect(output).toStrictEqual(failure(error('The value is null')));
                });
            });

            describe('when given an error message', () => {
                const output: Result<null> = input.which(isNull, 'The value is {{value}}');

                it('returns a Failure with an Exception with the given message', () => {
                    expect(output).toStrictEqual(failure(exception('The value is {{value}}', {
                        value: '0',
                    }, {
                        context: 0,
                    })));
                });
            });
        });
    });

    describe('through', () => {
        describe('through(valueProcedure)', () => {
            it('executes a given `valueProcedure` and returns itself', () => {
                const values: number[] = [];
                const input = success(0);
                const output: Success<number> = input.through(pushInto(values));

                expect(output).toBe(input);
                expect(values).toStrictEqual([0]);
            });
        });

        describe('through(valueProcedure, errorProcedure)', () => {
            it('executes a given `valueProcedure`, ignores an `errorProcedure`, and returns itself', () => {
                const values: number[] = [];
                const errors: string[] = [];
                const input = success(0);
                const output: Success<number> = input.through(pushInto(values), error => errors.push(error.message));

                expect(output).toBe(input);
                expect(values).toStrictEqual([0]);
                expect(errors).toStrictEqual([]);
            });
        });

        describe('through(procedures)', () => {
            it('executes the first callback in a given `procedures` pair and returns itself', () => {
                const values: number[] = [];
                const errors: string[] = [];
                const input = success(0);
                const output: Success<number> = input.through([
                    pushInto(values),
                    (error: Error): number => errors.push(error.message),
                ]);

                expect(output).toBe(input);
                expect(values).toStrictEqual([0]);
                expect(errors).toStrictEqual([]);
            });
        });
    });
});

describe(recovery, () => {
    const [ifSuccess, ifFailure] = recovery(1);

    describe('when the first function is given a value argument', () => {
        it('returns a Success with the given value', () => {
            expect(ifSuccess(0)).toStrictEqual(success(0));
        });
    });

    describe('when the second function is given an Error argument', () => {
        it('returns a Success with the fallback value', () => {
            expect(ifFailure(error('Failure'))).toStrictEqual(success(1));
        });
    });
});
