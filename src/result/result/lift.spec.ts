import { pushInto } from '../../array/array/lift';
import { error } from '../../error/error/error';
import { chained, exception } from '../../error/exception/exception';

import { into, onto, through, to } from './lift';
import { Failure, failure, Result, Success, success } from './result';
import { resultString, safeNumberOutput, strictErrorOutput, successFailure } from './result.mock';

const successNumber: Success<number> = success(0);
const successError: Success<Error> = success(error('Success'));
const failureNumber: Failure<number> = failure<number>(error('Failure'));

const results: Result<number | Error>[] = [successNumber, successError, failureNumber];

describe(onto, () => {
    describe('onto(Failure)', () => {
        it('applies a given `value` callback to the `Result.onto()` method', () => {
            const output: Failure<string>[] = results.map(onto(successFailure));

            expect(output).toStrictEqual([
                failure<string>(error('0')),
                failure<string>(error('Error: Success')),
                failureNumber,
            ]);
        });

        it('cannot be assigned to an array of `Success`', () => {
            // @ts-expect-error -- TS2322: Type 'Failure<string>[]' is not assignable to type 'Success<string>[]'.
            const output: Success<string>[] = results.map(onto(successFailure));

            expect(output).toStrictEqual([
                failure<string>(error('0')),
                failure<string>(error('Error: Success')),
                failureNumber,
            ]);
        });
    });

    describe('onto(Result)', () => {
        it('applies a given `value` callback to the `Result.onto()` method', () => {
            const output: Result<string>[] = results.map(onto(resultString));

            expect(output).toStrictEqual([
                success('0'),
                failure<string>(error('Success')),
                failureNumber,
            ]);
        });
    });
});

describe(to, () => {
    describe('to(value)', () => {
        it('applies a given `value` callback to the `Result.to()` method', () => {
            const output: Result<string>[] = results.map(to(safeNumberOutput));

            expect(output).toStrictEqual([
                success('0'),
                success('Error: Success'),
                failureNumber,
            ]);
        });
    });

    describe('to(value, error)', () => {
        it('applies given `value` and `error` callbacks to the `Result.to()` method', () => {
            const output: Result<string>[] = results.map(to(safeNumberOutput, chained('Exceptional Failure')));

            expect(output).toStrictEqual([
                success('0'),
                success('Error: Success'),
                failure(exception('Exceptional Failure')),
            ]);
        });
    });

    describe('to(maps)', () => {
        it('applies a given `maps` callbacks pair to the `Result.to()` method', () => {
            const output: Result<string>[] = results.map(to([safeNumberOutput, chained('Exceptional Failure')]));

            expect(output).toStrictEqual([
                success('0'),
                success('Error: Success'),
                failure(exception('Exceptional Failure')),
            ]);
        });
    });
});

describe(into, () => {
    describe('into(value, error)', () => {
        it('applies given `value` and `error` callbacks to the `Result.into()` method', () => {
            const output: string[] = results.map(into(safeNumberOutput, strictErrorOutput));

            expect(output).toStrictEqual([
                '0',
                'Error: Success',
                'Failure',
            ]);
        });
    });

    describe('into(fold)', () => {
        it('applies a given `fold` callbacks pair to the `Result.into()` method', () => {
            const output: string[] = results.map(into([safeNumberOutput, strictErrorOutput]));

            expect(output).toStrictEqual([
                '0',
                'Error: Success',
                'Failure',
            ]);
        });
    });
});

describe(through, () => {
    describe('through(value, error)', () => {
        it('applies given `value` and `error` callbacks to the `Result.through()` method', () => {
            const values: (number | Error)[] = [];
            const output: Result<number | Error>[] = results.map(through(pushInto(values), pushInto(values)));

            expect(output).toStrictEqual(results);
            expect(values).toStrictEqual([0, error('Success'), error('Failure')]);
        });
    });

    describe('through(procedures)', () => {
        it('applies a given `procedures` callbacks pair to the `Result.through()` method', () => {
            const values: (number | Error)[] = [];
            const output: Result<number | Error>[] = results.map(through([pushInto(values), pushInto(values)]));

            expect(output).toStrictEqual(results);
            expect(values).toStrictEqual([0, error('Success'), error('Failure')]);
        });
    });
});
