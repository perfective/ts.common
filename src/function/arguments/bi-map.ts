import { Unary } from '../function/unary';

/**
 * A pair of callbacks to map both arguments of a given function at the same time.
 */
export type BiMap<T1, U1, T2, U2> = [Unary<T1, U1>, Unary<T2, U2>];
