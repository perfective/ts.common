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
 */
export type Executor<T, E extends Error = Error> = (resolve: Resolve<T>, reject: Reject<E>) => void;

/**
 * Creates a new {@linkcode Promise} with a given {@linkcode executor} callback.
 */
export async function promise<T, E extends Error = Error>(executor: Executor<T, E>): Promise<T> {
    return new Promise<T>(executor);
}
