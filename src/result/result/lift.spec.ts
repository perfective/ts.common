import { error } from '../../error/error/error';
import { chained, exception } from '../../error/exception/exception';

import { onto, to } from './lift';
import { Failure, failure, Result, Success, success } from './result';
import { resultString, safeNumberOutput, successFailure } from './result.mock';

const successNumber: Success<number> = success(0);
const successError: Success<Error> = success(error('Success'));
const failureNumber: Failure<number> = failure<number>(error('Failure'));

const results: Result<number | Error>[] = [successNumber, successError, failureNumber];

describe(onto, () => {
    describe('onto(Failure)', () => {
        it('applies a given flatMap function to the input Result.onto method', () => {
            const output: Failure<string>[] = results.map(onto(successFailure));

            expect(output).toStrictEqual([
                failure<string>(error('0')),
                failure<string>(error('Error: Success')),
                failureNumber,
            ]);
        });

        it('cannot be assigned to an array of Success', () => {
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
        it('applies a given flatMap function to the input Result.onto method', () => {
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
    describe('to(mapValue)', () => {
        it('applies a given mapValue callback to the Result.to() method', () => {
            const output: Result<string>[] = results.map(to(safeNumberOutput));

            expect(output).toStrictEqual([
                success('0'),
                success('Error: Success'),
                failureNumber,
            ]);
        });
    });

    describe('to(mapValue, mapError)', () => {
        it('applies a given mapValue and mapError callbacks to the Result.to() method', () => {
            const output: Result<string>[] = results.map(to(safeNumberOutput, chained('Exceptional Failure')));

            expect(output).toStrictEqual([
                success('0'),
                success('Error: Success'),
                failure(exception('Exceptional Failure')),
            ]);
        });
    });

    describe('to(maps)', () => {
        it('applies a given maps callbacks to the Result.to() method', () => {
            const output: Result<string>[] = results.map(to([safeNumberOutput, chained('Exceptional Failure')]));

            expect(output).toStrictEqual([
                success('0'),
                success('Error: Success'),
                failure(exception('Exceptional Failure')),
            ]);
        });
    });
});
