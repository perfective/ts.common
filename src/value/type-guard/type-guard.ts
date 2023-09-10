/**
 * A type guard function definition.
 *
 * @since v0.1.3
 */
export type TypeGuard<T, V extends T> = (value: T) => value is V;
