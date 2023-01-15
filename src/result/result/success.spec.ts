import { error } from '../../error/error/error';
import { Exception, exception } from '../../error/exception/exception';
import { output as stringOutput } from '../../string/string/output';

import { Failure, failure, recovery, Result, Success, success } from './result';
import {
    failureDecimal,
    resultDecimal,
    safeStringOutput,
    strictStringOutput,
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
        it('applies a given `flatMap` callback to the Success `value` and returns the result', () => {
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
        it('applies a given `map` callback and returns the result wrapped into a Success', () => {
            const output: Success<string> = success(0).to(stringOutput);

            expect(output).toStrictEqual(success('0'));
        });
    });

    describe('into', () => {
        it('applies a given `reduce` callback to the Success.value and returns the result', () => {
            expect(success(0).into(safeStringOutput)).toBe('0');
            expect(success(error('Success')).into(safeStringOutput)).toBe('Success');
        });

        it('allows a `reduce` callback that does not accept an Error input', () => {
            expect(success(0).into(strictStringOutput)).toBe('0');
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
