import { error } from '../../error/error/error';

import { onto } from './lift';
import { Failure, failure, Result, Success, success } from './result';
import { resultString, successFailure } from './result.mock';

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
