import { describe, expect, it } from '@jest/globals';

import { Callback, settlement } from './callback';
import { promise, Reject, Resolve } from './promise';

function isError<T>(data: T | Error, callback: Callback<T>): void {
    if (data instanceof Error) {
        callback(data, null as unknown as T);
        return;
    }
    callback(null, data);
}

async function isErrorPromise<T>(data: T | Error): Promise<T> {
    return promise<T>((resolve: Resolve<T>, reject: Reject): void => {
        isError(data, settlement(resolve, reject));
    });
}

describe(settlement, () => {
    describe('when `error` is undefined and a value is defined', () => {
        it('resolves a Promise', async () => {
            const result = await isErrorPromise('example');

            expect(result).toBe('example');
        });
    });

    describe('when `error` is defined', () => {
        // eslint-disable-next-line jest/prefer-ending-with-an-expect -- testing try-catch error.
        it('rejects a Promise', async () => {
            expect.assertions(1);

            try {
                await isErrorPromise(new Error('Fail'));
            }
            catch (error: unknown) {
                // eslint-disable-next-line jest/no-conditional-expect -- approach with "toThrow()" does not work
                expect(error).toStrictEqual(new Error('Fail'));
            }
        });
    });
});
