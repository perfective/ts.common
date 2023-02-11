import { isError } from '../../error/error/error';

/**
 * A type of a callback called to resolve a {@linkcode Promise} value.
 */
export type Resolve<T> = (value: T | PromiseLike<T>) => void;

/**
 * A type of a callback called to reject a {@linkcode Promise} with a reason.
 *
 * This type is stricter than the default type of the reject callback,
 * as it requires an {@linkcode Error} as a {@linkcode reason}.
 */
export type Reject<E extends Error = Error> = (reason?: E) => void;

/**
 * A type of the `executor` callback passed into a {@linkcode Promise} constructor.
 *
 * @since v0.9.0
 */
export type Executor<T, E extends Error = Error> = (resolve: Resolve<T>, reject: Reject<E>) => void;

/**
 * @deprecated Since v0.9.0.
 */
export type Run<T, E extends Error = Error> = Executor<T, E>;

/**
 * A type of a callback passed as `onFulfilled` into {@linkcode Promise.then}.
 *
 * @since v0.9.0
 */
export type OnFulfilled<T, U = T> = (value: T) => U | PromiseLike<U>;

/**
 * A type of a callback passed as `onRejected` into {@linkcode Promise.then} or {@linkcode Promise.catch}.
 *
 * @since v0.9.0
 */
export type OnRejected<T = never> = (reason: unknown) => T | PromiseLike<T>;

/**
 * Creates a new {@linkcode Promise} with a given {@linkcode executor} callback.
 */
export async function promise<T, E extends Error = Error>(executor: Executor<T, E>): Promise<T> {
    return new Promise<T>(executor);
}

/**
 * Creates a fulfilled {@linkcode Promise}.
 * A shortcut for the {@linkcode Promise.resolve} function.
 *
 * Using the {@linkcode Promise.resolve} directly causes the `@typescript-eslint/unbound-method` linting error
 * and a TSC error: "TS2322: Type 'unknown' is not assignable to type 'T'".
 *
 * @see Promise.resolve()
 * @see https://typescript-eslint.io/rules/unbound-method/
 *
 * @since v0.9.0
 */
export async function fulfilled<T>(value: T | PromiseLike<T>): Promise<Awaited<T>> {
    // eslint-disable-next-line unicorn/no-useless-promise-resolve-reject -- instantiating a Promise.
    return Promise.resolve(value);
}

/**
 * Creates a rejected {@linkcode Promise}.
 * A shortcut for the {@linkcode Promise.reject} function.
 *
 * Using the {@linkcode Promise.reject} directly causes the `@typescript-eslint/unbound-method` linting error.
 *
 * @see Promise.reject()
 * @see https://typescript-eslint.io/rules/unbound-method/
 *
 * @since v0.9.0
 */
export async function rejected<T = never>(reason: Error): Promise<Awaited<T>> {
    // eslint-disable-next-line unicorn/no-useless-promise-resolve-reject -- instantiating a Promise.
    return Promise.reject<Awaited<T>>(reason);
}

/**
 * Creates a settled {@linkcode Promise}.
 *
 * - If a given value is not an {@linkcode Error},
 * the {@linkcode Promise} is fulfilled.
 * - If a given value is an {@linkcode Error},
 * the {@linkcode Promise} is rejected.
 * - If a given value is a {@linkcode PromiseLike},
 * the {@linkcode Promise} state matches the state of the given value.
 *
 * @since v0.9.0
 */
export async function settled<T>(value: T | PromiseLike<T> | Error): Promise<T> {
    /* eslint-disable unicorn/no-useless-promise-resolve-reject -- instantiating a Promise */
    if (isError(value)) {
        return Promise.reject(value);
    }
    return Promise.resolve(value);
    /* eslint-enable unicorn/no-useless-promise-resolve-reject */
}
