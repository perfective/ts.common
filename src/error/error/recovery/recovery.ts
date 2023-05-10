/**
 * A function that handles a given {@linkcode Error} and returns a recovery value.
 *
 * @since v0.10.0
 */
export type Recovery<T> = (error: Error) => T;
