import { Callback, promise, Reject, Resolve, result } from './promise';

function forward<T>(data: T | Error, callback: Callback<T>): void {
    if (data instanceof Error) {
        callback(data, null as unknown as T);
        return;
    }
    callback(null, data);
}

async function promiseForward<T>(data: T | Error): Promise<T> {
    return promise<T>((resolve: Resolve<T>, reject: Reject): void => {
        forward(data, result(resolve, reject));
    });
}

describe('result', () => {
    it('resolves promise with data', async () => promiseForward('example')
        .then(result => expect(result)
            .toBe('example')));

    it('rejects promise when error is defined', async () => {
        expect.assertions(1);

        await promiseForward(new Error('Fail'))
            // eslint-disable-next-line jest/no-conditional-expect -- approach with "toThrow()" does not work
            .catch((error: Readonly<Error>) => expect(error).toStrictEqual(new Error('Fail')));
    });
});
