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
        it('resolves a Promise', async () => isErrorPromise('example')
            .then(result => expect(result).toBe('example')));
    });

    describe('when `error` is defined', () => {
        it('rejects a Promise', async () => {
            expect.assertions(1);

            await isErrorPromise(new Error('Fail'))
            // eslint-disable-next-line jest/no-conditional-expect -- approach with "toThrow()" does not work
                .catch((error: Readonly<Error>) => expect(error).toStrictEqual(new Error('Fail')));
        });
    });
});
