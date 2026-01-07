import { BiFold } from '../../function';

/**
 * A value that can be passed into {@link Promise.resolve}.
 *
 * @see Promise.resolve()
 *
 * @since v0.9.0
 */
export type Resolvable<T> = T | PromiseLike<T>;

/**
 * A function that can called to resolve a {@linkcode Promise} value.
 *
 * @since v0.8.0
 */
export type Resolve<T> = (value: Resolvable<T>) => void;

/**
 * A function called to reject a {@linkcode Promise} with an optional `reason`.
 *
 * This type is stricter than the default type of the reject callback,
 * as it requires an {@linkcode Error} as a `reason`.
 *
 * @since v0.8.0
 */
export type Reject<E extends Error = Error> = (reason?: E) => void;

/**
 * A callback passed into the {@linkcode Promise} constructor.
 *
 * @since v0.9.0
 */
export type Executor<T, E extends Error = Error> = (resolve: Resolve<T>, reject: Reject<E>) => void;

/**
 * A `onFulfilled` callback passed into the {@linkcode Promise.then} method.
 *
 * @since v0.9.0
 */
export type OnFulfilled<T, U = T> = (value: T) => Resolvable<U>;

/**
 * A `onRejected` callback passed into the {@linkcode Promise.then} or {@linkcode Promise.catch} methods.
 *
 * @since v0.9.0
 */
export type OnRejected<T = never> = (reason: unknown) => Resolvable<T>;

/**
 * Creates a new {@linkcode Promise} with a given `executor` callback.
 *
 * @since v0.8.0
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
export async function fulfilled<T>(value: Resolvable<T>): Promise<Awaited<T>> {
    // Without Promise.resolve() getting an error: TS2322: Type 'T' is not assignable to type 'Awaited'.
    // With "value as Awaited<T>" failing on "require-await": Async function 'fulfilled' has no 'await' expression.
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
 *
 * @rejects {Error} - with the given `reason`.
 */
export async function rejected<T = never>(reason: Error): Promise<Awaited<T>> {
    // With "throw reason" failing on "require-await": Async function 'rejected' has no 'await' expression.
    // eslint-disable-next-line unicorn/no-useless-promise-resolve-reject -- instantiating a Promise.
    return Promise.reject<Awaited<T>>(reason);
}

/**
 * Creates a {@linkcode BiFold} pair of callbacks to wrap a value into a {@linkcode Promise}.
 *
 * @since v0.9.0
 */
export function settled<T>(): BiFold<Resolvable<T>, Error, Promise<Awaited<T>>> {
    return [fulfilled, rejected];
}
