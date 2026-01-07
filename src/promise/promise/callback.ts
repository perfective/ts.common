import { isPresent } from '../../value/value';

import { Reject, Resolve } from './promise';

/**
 * An error-first callback.
 *
 * @since v0.8.0
 */
export type Callback<T, E extends Error = Error> = (error: E | null | undefined, value: T) => void;

/**
 * Returns an error-first {@linkcode Callback} to promisify a function
 * with given `resolve` and `reject` callbacks from an executor.
 *
 * @since v0.9.0
 *
 * @rejects {Error}
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
