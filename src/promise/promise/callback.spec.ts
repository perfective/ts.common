import { Callback, result, settlement } from './callback';
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
        // eslint-disable-next-line deprecation/deprecation -- TODO: replace in v0.10.0-alpha
        isError(data, result(resolve, reject));
    });
}

describe(settlement, () => {
    it('resolves a Promise when `error` is undefined and a value is defined', async () => isErrorPromise('example')
        .then(result => expect(result).toBe('example')));

    it('rejects a Promise when `error` is defined', async () => {
        expect.assertions(1);

        await isErrorPromise(new Error('Fail'))
            // eslint-disable-next-line jest/no-conditional-expect -- approach with "toThrow()" does not work
            .catch((error: Readonly<Error>) => expect(error).toStrictEqual(new Error('Fail')));
    });
});
