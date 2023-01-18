import { array } from '../../array/array/array';
import { error } from '../../error/error/error';
import { chainedException } from '../../error/exception/exception';
import { same } from '../../function/function/unary';
import { output as stringOutput } from '../../string/string/output';

import { Failure, failure, Result, result, Success, success } from './result';
import {
    eitherResult,
    resultDecimal,
    resultNumber,
    safeNumberOutput,
    strictErrorOutput,
    strictNumberOutput,
    successErrorMessage,
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

describe(Result, () => {
    describe('onto', () => {
        describe('is a "bind" (>>=) operator for the Result monad', () => {
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

    describe('to(mapValue)', () => {
        describe('is an "fmap" method for the Result functor and a "second" method for the Result bifunctor', () => {
            it('preserves identity morphisms', () => {
                // Identity:
                // - fmap id  ===  id
                // - second id  ===  id

                // Success with a non-error value
                const sa = success(0);

                expect(sa.to(same)).toStrictEqual(same(sa));

                // Success with an error value
                const sb = success(error('Success'));

                expect(sb.to(same)).toStrictEqual(same(sb));

                // Failure (with an error value)
                const fa = failure<number>(error('Failure'));

                expect(fa.to(same)).toStrictEqual(same(fa));
            });

            it('preserves composition of morphisms', () => {
                // Composition:
                // - fmap (f . g)  ===  fmap f . fmap g
                // - second (f . g)  ===  second f . second g

                // Success with a non-error value
                const sa = success(0);

                expect(sa.to(x => array(stringOutput(x))))
                    .toStrictEqual(sa.to(stringOutput).to(array));

                // Success with an error value
                const sb = success(error('Success'));

                expect(sb.to(x => array(successErrorMessage(x))))
                    .toStrictEqual(sb.to(successErrorMessage).to(array));

                // Failure (with an error value)
                const fa = failure<number>(error('Failure'));

                expect(fa.to(x => array(stringOutput(x))))
                    .toStrictEqual(fa.to(stringOutput).to(array));
            });
        });
    });

    describe('to(mapValue, mapError)', () => {
        describe('is a "bimap" method for the Result bifunctor', () => {
            it('preserves identity morphisms', () => {
                // Identity: bimap id id = id

                // Success with a non-error value
                const sa = success(0);

                expect(sa.to(same, same)).toStrictEqual(same(sa));

                // Success with an error value
                const sb = success(error('Success'));

                expect(sb.to(same, same)).toStrictEqual(same(sb));

                // Failure (with an error value)
                const fa = failure<number>(error('Failure'));

                expect(fa.to(same, same)).toStrictEqual(same(fa));
            });

            it('the same as applying the "first" and "second" methods', () => {
                // Ensure: bimap f g  =  first f . second g

                // Success with a non-error value
                const sa = success(0);

                expect(sa.to(strictNumberOutput, chainedException('Exceptional')))
                    .toStrictEqual(sa.to(strictNumberOutput).failure(chainedException('Exceptional')));

                // Success with an error value
                const sb = success(error('Success'));

                expect(sb.to(strictErrorOutput, chainedException('Exceptional')))
                    .toStrictEqual(sb.to(strictErrorOutput).failure(chainedException('Exceptional')));

                // Failure (with an error value)
                const fa = failure<number>(error('Failure'));

                expect(fa.to(strictNumberOutput, chainedException('Exceptional')))
                    .toStrictEqual(fa.to(strictNumberOutput).failure(chainedException('Exceptional')));
            });
        });
    });

    describe('into(reduce)', () => {
        it('is an equivalent of applying a `reduce` callback to the Result.value', () => {
            // Success with a non-error value
            const sa = success(0);

            expect(sa.into(safeNumberOutput)).toBe(safeNumberOutput(sa.value));

            // Success with an error value
            const sb = success(error('Success'));

            expect(sb.into(safeNumberOutput)).toBe(safeNumberOutput(sb.value));

            // Failure (with an error value)
            const fa = failure<number>(error('Failure'));

            expect(fa.into(safeNumberOutput)).toBe(safeNumberOutput(fa.value));
        });

        it('is an equivalent of applying a `reduce` callback as `reduceValue` and `reduceError`', () => {
            // Success with a non-error value
            const sa = success(0);

            expect(sa.into(safeNumberOutput)).toBe(sa.into(safeNumberOutput, safeNumberOutput));

            // Success with an error value
            const sb = success(error('Success'));

            expect(sb.into(safeNumberOutput)).toBe(sb.into(safeNumberOutput, safeNumberOutput));

            // Failure (with an error value)
            const fa = failure<number>(error('Failure'));

            expect(fa.into(safeNumberOutput)).toBe(fa.into(safeNumberOutput, safeNumberOutput));
        });
    });

    describe('failure(mapError)', () => {
        describe('is a "first" method of a Result bifunctor', () => {
            it('preserves identity morphisms', () => {
                // Identity: first id  =  id

                // Success with a non-error value
                const sa = success(0);

                expect(sa.failure(same)).toStrictEqual(same(sa));

                // Success with an error value
                const sb = success(error('Success'));

                expect(sb.failure(same)).toStrictEqual(same(sb));

                // Failure (with an error value)
                const fa = failure<number>(error('Failure'));

                expect(fa.failure(same)).toStrictEqual(same(fa));
            });

            it('preserves composition of morphisms', () => {
                // Composition: first (f . g)  ===  first f . first g
                const f = chainedException('Exceptional');
                const g = chainedException('Failure');

                // Success with a non-error value
                const sa = success(0);

                expect(sa.failure(error => f(g(error))))
                    .toStrictEqual(sa.failure(g).failure(f));

                // Success with an error value
                const sb = success(error('Success'));

                expect(sb.failure(error => f(g(error))))
                    .toStrictEqual(sb.failure(g).failure(f));

                // Failure (with an error value)
                const fa = failure<number>(error('Failure'));

                expect(fa.failure(error => f(g(error))))
                    .toStrictEqual(fa.failure(g).failure(f));
            });
        });
    });
});
