import { array } from '../../array/array/array';
import { error } from '../../error/error/error';
import { chainedException, exception } from '../../error/exception/exception';
import { panic } from '../../error/panic/panic';
import { same, Unary } from '../../function/function/unary';

import { failureWith, successWith } from './arguments';
import { Failure, failure, Result, result, resultFrom, resultOf, Success, success } from './result';
import {
    eitherResult,
    resultDecimal,
    resultNumber,
    strictErrorOutput,
    strictExceptionOutput,
    strictNumberOutput,
    successErrorMessage,
    unsafeNumberOutput,
} from './result.mock';

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

describe(resultOf, () => {
    describe('given a callback that returns a value', () => {
        it('returns the result of the callback as a `Success`', () => {
            const output: Result<string> = resultOf(() => strictNumberOutput(0));

            expect(output).toStrictEqual(success('0'));
        });
    });

    describe('given a callback that throws an error', () => {
        it('catches the error and returns it as a `Failure`', () => {
            const output: Result<unknown> = resultOf(panic('Failure'));

            expect(output).toStrictEqual(failure(exception('Failure')));
        });
    });
});

describe(resultFrom, () => {
    describe('when a given a function to convert a value into either a value or an Error', () => {
        it('cannot be assigned to a `Success`', () => {
            // @ts-expect-error -- TS2322:
            //  Type 'Unary<string, Result<string>>' is not assignable to type 'Unary<string, Success<string>>'.
            const output: Unary<string, Success<string>> = resultFrom<string, string>(eitherResult);

            expect(output('Success')).toStrictEqual(success('Success'));
        });

        it('cannot be assigned to a `Failure`', () => {
            // @ts-expect-error -- TS2322:
            //  Type 'Unary<string, Result<number>>' is not assignable to type 'Unary<string, Failure<number>>'.
            const output: Unary<string, Failure<number>> = resultFrom<string, number>(unsafeNumberOutput);

            expect(output('NaN')).toStrictEqual(failure(error('Failed to parse a number')));
        });
    });

    describe('when a given a function to convert a value into a value', () => {
        it('returns an instance of `Success`', () => {
            const output: Unary<number, Success<string>> = resultFrom(strictNumberOutput);

            expect(output(0)).toStrictEqual(success('0'));
        });
    });

    describe('when a given a function to convert a value into an Error', () => {
        it('returns an instance of `Failure`', () => {
            const output: Unary<string, Failure<string>> = resultFrom(error);

            expect(output('Failure')).toStrictEqual(failure(error('Failure')));
        });
    });
});

/**
 * The {@linkcode Result} is an abstract class, so the tests for it use {@linkcode Success} and {@linkcode Failure}.
 * The purpose of each test is only to show any relations between methods.
 * Each test should use at least three inputs:
 * - a {@linkcode Success} with a non-error value,
 * - a {@linkcode Success} with an {@linkcode Error} value,
 * - and a {@linkcode Failure}.
 *
 * Some parameters are duplicated to preserve generic form.
 */
describe.each([
    // Success with a non-error value
    [success(0), resultDecimal, resultNumber, strictNumberOutput, array, strictNumberOutput],
    // Success with an error value
    [success(error('Success')), successErrorMessage, resultNumber, strictErrorOutput, array, strictExceptionOutput],
    // Failure (with an error value)
    [failure<number>(error('Failure')), resultDecimal, resultNumber, strictNumberOutput, array, strictNumberOutput],
    // @ts-expect-error -- TSC creates a union of all types, while only each row arguments have to match.
])(Result.name, <T, U1, V1, U2, V2>(
    result: Result<T>,
    flatMap1: Unary<T, Result<U1>>,
    flatMap2: Unary<U1, Result<V1>>,
    mapValue1: Unary<T, U2>,
    mapValue2: Unary<U2, V2>,
    reduce1: Unary<T, string>,
) => {
    const mapError1 = chainedException('Exceptional');

    describe('onto', () => {
        describe('is a "bind" (>>=) operator for the Result monad', () => {
            it('is associative', () => {
                // Associativity: ma >>= (\x -> f x >>= g)  ===  (ma >>= f) >>= g
                expect(result.onto(x => flatMap1(x).onto(flatMap2)))
                    .toStrictEqual(result.onto(flatMap1).onto(flatMap2));
            });
        });
    });

    describe('to(mapValue)', () => {
        describe('is an "fmap" method for the Result functor and a "second" method for the Result bifunctor', () => {
            it('preserves identity morphisms', () => {
                // Identity:
                // - fmap id  ===  id
                // - second id  ===  id
                expect(result.to(same))
                    .toStrictEqual(same(result));
            });

            it('preserves composition of morphisms', () => {
                // Composition:
                // - fmap (f . g)  ===  fmap f . fmap g
                // - second (f . g)  ===  second f . second g
                expect(result.to(x => mapValue2(mapValue1(x))))
                    .toStrictEqual(result.to(mapValue1).to(mapValue2));
            });
        });
    });

    describe('to(maps)', () => {
        it('is the same as applying the first callback as `mapValue` and the second callback as `mapError`', () => {
            expect(result.to([mapValue1, mapError1]))
                .toStrictEqual(result.to(mapValue1, mapError1));
        });

        describe('is a "bimap" method for the Result bifunctor', () => {
            it('preserves identity morphisms', () => {
                // Identity: bimap id id = id
                expect(result.to([same, same]))
                    .toStrictEqual(same(result));
            });

            it('the same as applying the "first" and "second" methods', () => {
                // Ensure: bimap f g  =  first f . second g
                expect(result.to([mapValue1, mapError1]))
                    .toStrictEqual(result.to(successWith(mapValue1)).to(failureWith(mapError1)));
            });
        });
    });

    describe('into(fold)', () => {
        it('is an equivalent of applying a `reduceValue` and `reduceError` as separate arguments', () => {
            expect(result.into([reduce1, strictErrorOutput]))
                .toBe(result.into(reduce1, strictErrorOutput));
        });
    });
});
