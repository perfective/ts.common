import { Callback, promise, Reject, Resolve, result } from './promise';

function forward<T>(data: T | Error, callback: Callback<T>): void {
    if (data instanceof Error) {
        return callback(data, undefined);
    }
    return callback(null, data);
}

async function promiseForward<T>(data: T | Error): Promise<T> {
    return promise<T>((resolve: Resolve<T>, reject: Reject): void => {
        forward(data, result(resolve, reject));
    });
}

describe('result', () => {
    it('resolves promise with data', async () => promiseForward('example')
        .then(result => expect(result)
            .toStrictEqual('example')));

    it('rejects promise when error is defined', async () => promiseForward(new Error('Fail'))
        .catch((error: Readonly<Error>) => expect(error)
            .toStrictEqual(new Error('Fail'))));
});
