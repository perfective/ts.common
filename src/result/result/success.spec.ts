import { error } from '../../error/error/error';
import { chainedException, Exception, exception } from '../../error/exception/exception';

import { Failure, failure, recovery, Result, Success, success } from './result';
import {
    failureDecimal,
    resultDecimal,
    safeNumberOutput,
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
                    .to(strictNumberOutput, chainedException('Exceptional Failure'));

                expect(output).toStrictEqual(success('0'));
            });
        });
    });

    describe('into', () => {
        describe('into(reduce)', () => {
            it('applies a given `reduce` callback to the Success.value and returns the result', () => {
                expect(success(0).into(safeNumberOutput)).toBe('0');

                const sb = success(exception('Success of {{number}}', { number: '0' }));

                expect(sb.into(safeNumberOutput)).toBe('Success of `0`');
            });

            it('allows a `reduce` callback that does not accept an Error input', () => {
                expect(success(0).into(strictNumberOutput)).toBe('0');
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
    });

    describe('failure', () => {
        it('ignores a given `mapError` callback and returns itself', () => {
            const input = success(0);
            const output: Success<number> = input.failure(chainedException('Exceptional Failure'));

            expect(output).toBe(input);
        });
    });
});

describe(recovery, () => {
    describe('when the created function is given a value argument', () => {
        it('returns a Success with the given value', () => {
            expect(recovery(0)(1)).toStrictEqual(success(1));
        });
    });

    describe('when the created function is given an Error argument', () => {
        it('returns a Success with the fallback value', () => {
            expect(recovery(0)(error('Failure'))).toStrictEqual(success(0));
        });
    });
});
