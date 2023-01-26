import { error } from '../../error/error/error';
import { exception } from '../../error/exception/exception';

import { promisedResult, rejection, settledResult } from './promise';
import { Failure, failure, Result, Success, success } from './result';

const reason = error('Rejected');
const rejected = Promise.reject<number>(reason);
const fulfilled = Promise.resolve(0);

describe(success, () => {
    describe('with Promise', () => {
        it('can be passed as `onFulfilled` argument to `Promise.then`', async () => {
            const output: Success<number> = await fulfilled.then(success);

            expect(output).toStrictEqual(success(0));
        });
    });
});

describe(rejection, () => {
    it('creates a `Failure` from an `Error` reason', () => {
        const output: Failure<never> = rejection(error('Rejected Promise'));

        expect(output).toStrictEqual(failure(error('Rejected Promise')));
    });

    it('creates a `Failure` from a non-`Error` reason', () => {
        const output: Failure<never> = rejection('Rejected Promise');

        expect(output).toStrictEqual(failure(exception('Literal error')));
    });

    describe('with Promise', () => {
        it('can be passed as `onRejected` argument to `Promise.then`', async () => {
            const output: Result<number> = await rejected.then(success, rejection);

            expect(output).toStrictEqual(failure(reason));
        });

        it('can be passed as `onRejected` argument to `Promise.catch`', async () => {
            const output: number | Failure<never> = await rejected.catch(rejection);

            expect(output).toStrictEqual(failure(reason));
        });

        it('can be passed as `onRejected` argument to `Promise.catch` after `Promise.then`', async () => {
            const output: number | Error = await rejected.then(success).catch(rejection)
                .then((result: Result<number>) => result.value);

            expect(output).toBe(reason);
        });
    });
});

describe(promisedResult, () => {
    describe('when Promise is fulfilled', () => {
        it('creates a `Success` with a fulfilled `Promise` value', async () => {
            const output: Result<number> = await promisedResult(fulfilled);

            expect(output).toStrictEqual(success(0));
        });
    });

    describe('when Promise is rejected', () => {
        it('creates a `Failure` with a given rejection reason', async () => {
            const output: Result<number> = await promisedResult(rejected);

            expect(output).toStrictEqual(failure(reason));
        });
    });
});

describe(settledResult, () => {
    describe('when given a `Success`', () => {
        it('returns a fulfilled `Promise` with the `Success` value', async () => {
            const output: number = await settledResult(success(0));

            expect(output).toBe(0);
        });
    });

    describe('when given a `Failure`', () => {
        it('returns a rejected `Promise` with the `Failure` value as a reason', async () => {
            const output: Promise<number> = settledResult<number>(failure(reason));

            await expect(output).rejects.toThrow(reason);
        });
    });
});
