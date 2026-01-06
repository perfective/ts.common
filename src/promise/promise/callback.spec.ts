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
            await expect(isErrorPromise('example')).resolves.toBe('example');
        });
    });

    describe('when `error` is defined', () => {
        it('rejects a Promise', async () => {
            await expect(isErrorPromise(new Error('Fail'))).rejects.toThrow(new Error('Fail'));
        });
    });
});
