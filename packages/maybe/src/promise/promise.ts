import { maybe } from '../maybe/maybe';

export type Resolve<T> = (value?: T | PromiseLike<T>) => void;
export type Reject<E extends Error = Error> = (reason?: E) => void;
export type Run<T, E extends Error = Error> = (resolve: Resolve<T>, reject: Reject<E>) => void;
export type Callback<T, E extends Error = Error> = (error?: E | null, data?: T) => void;

export async function promise<T, E extends Error = Error>(run: Run<T, E>): Promise<T> {
    return new Promise<T>(run);
}

export function result<T, E extends Error = Error>(
    resolve: Resolve<T>,
    reject: Reject<E>,
): Callback<T, E> {
    return (error?: E | null, data?: T | PromiseLike<T>): void => maybe(error)
        .to(reject)
        .or(() => resolve(data));
}
