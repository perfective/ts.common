/**
 * @file Contains functions that establish relationship between the {@linkcode Result} and {@linkcode Promise} types.
 */

import { caughtError } from '../../error/exception/exception';
import { fulfilled, rejected } from '../../promise/promise/promise';

import { Failure, failure, Result, success } from './result';

/**
 * Creates a {@linkcode Failure} from an `unknown` `reason`.
 *
 * Pass this function into {@linkcode Promise.catch} or {@linkcode Promise.then} as an `onRejection` callback
 * to wrap a `reason` into a {@linkcode Failure}.
 *
 * @since v0.9.0
 */
export function rejection<T = never>(reason: unknown): Failure<T> {
    return failure(caughtError(reason));
}

/**
 * Wraps a {@linkcode Promise} value into a {@linkcode Result}.
 *
 * Returns a {@linkcode Success} with a value if a {@linkcode Promise} is fulfilled.
 * Returns a {@linkcode Failure} with a reason if a {@linkcode Promise} is rejected.
 *
 * @since v0.9.0
 */
export async function promisedResult<T>(promise: Promise<T>): Promise<Result<T>> {
    return promise.then(success).catch(rejection);
}

/**
 * Creates a settled {@linkcode Promise} from a given {@linkcode Result}.
 *
 * Returns a fulfilled {@linkcode Promise} if `result` is a {@linkcode Success}.
 * Returns a rejected {@linkcode Promise} if `result` is a {@linkcode Failure}.
 *
 * @since v0.9.0
 */
export async function settledResult<T>(result: Result<T>): Promise<T> {
    return result.into(fulfilled, rejected);
}
