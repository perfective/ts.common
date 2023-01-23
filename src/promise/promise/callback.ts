import { isPresent } from '../../value/value';

import { Reject, Resolve } from './promise';

/**
 * An error-first callback type.
 */
export type Callback<T, E extends Error = Error> = (error: E | null | undefined, value: T) => void;

/**
 * Returns an error-first {@linkcode Callback} to promisify a function
 * with given {@linkcode resolve} and {@linkcode reject} callbacks from an executor.
 *
 * @since v0.9.0
 */
export function settlement<T, E extends Error = Error>(
    resolve: Resolve<T>,
    reject: Reject<E>,
): Callback<T, E> {
    return (error: E | null | undefined, data: T): void => {
        if (isPresent(error)) {
            reject(error);
        }
        else {
            resolve(data);
        }
    };
}

/**
 * Use {@linkcode settlement} function instead.
 *
 * @see settlement
 * @deprecated Since v0.9.0.
 */
export function result<T, E extends Error = Error>(
    resolve: Resolve<T>,
    reject: Reject<E>,
): Callback<T, E> {
    return settlement(resolve, reject);
}
