import { Unary } from '../function/unary';

/**
 * A pair of unary callbacks to map both arguments (T1 and T2) of a function into the same type U.
 *
 * @since v0.9.0
 */
export type BiFold<T1, T2, U> = [Unary<T1, U>, Unary<T2, U>];
