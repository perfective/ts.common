import { error } from '../../error/error/error';

import { Failure, failure, Result, result, Success, success } from './result';
import { eitherResult, resultDecimal, resultNumber, successErrorMessage } from './result.mock';

describe(result, () => {
    describe('when a given value is either an Error or not an Error', () => {
        it('cannot be assigned to type Success', () => {
            // @ts-expect-error -- TS2322:
            //  Type 'Result<string>' is not assignable to type 'Success<string>'.
            const output: Success<string> = result<string>(eitherResult('Success'));

            expect(output).toStrictEqual(success('Success'));
        });

        it('cannot be assigned to type Failure', () => {
            // @ts-expect-error -- TS2322:
            //  Type 'Result<string>' is not assignable to type 'Failure<string>'.
            const output: Failure<string> = result<string>(eitherResult<string>(error('Failure')));

            expect(output).toStrictEqual(failure(error('Failure')));
        });
    });

    describe('when a given value is not an Error', () => {
        it('returns an instance of type Success', () => {
            const output: Success<string> = result('Success');

            expect(output).toStrictEqual(success('Success'));
        });
    });

    describe('when a given value is an Error', () => {
        it('returns an instance of type Failure', () => {
            const output: Failure<unknown> = result(error('Failure'));

            expect(output).toStrictEqual(failure(error('Failure')));
        });
    });
});

describe(Result, () => {
    describe('onto', () => {
        describe('is a "bind" (>==) operator for the Result monad', () => {
            it('is associative', () => {
                // Associativity: ma >>= (\x -> f x >>= g)  ===  (ma >>= k) >>= g

                // Success with a non-error value
                const sa = success(0);

                expect(sa.onto(x => resultDecimal(x).onto(resultNumber)))
                    .toStrictEqual(sa.onto(resultDecimal).onto(resultNumber));

                // Success with an error value
                const sb = success(error('Success'));

                expect(sb.onto(x => successErrorMessage(x).onto(resultNumber)))
                    .toStrictEqual(sb.onto(successErrorMessage).onto(resultNumber));

                // Failure (with an error value)
                const fa = failure<number>(error('Failure'));

                expect(fa.onto(x => resultDecimal(x).onto(resultNumber)))
                    .toStrictEqual(fa.onto(resultDecimal).onto(resultNumber));
            });
        });
    });
});
