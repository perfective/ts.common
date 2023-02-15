import { BiFold } from '../../function/arguments/bi-fold';
import { BiMap } from '../../function/arguments/bi-map';
import { same, Unary, UnaryVoid } from '../../function/function/unary';

/**
 * A {@linkcode BiMap} type specific for the {@linkcode Result} bifunctor.
 *
 * @since v0.9.0
 */
export type BiMapResult<T, U> = BiMap<T, U, Error, Error>;

/**
 * Creates a {@linkcode BiMapResult} pair
 * with a given {@linkcode map} callback as the first element
 * and an identity function as the second element.
 *
 * @since v0.9.0
 */
export function successWith<T, U>(map: Unary<T, U>): BiMapResult<T, U> {
    return [map, same];
}

/**
 * Creates a {@linkcode BiMapResult} pair
 * with a given {@linkcode map} callback as the second element
 * and an identity function as the first element.
 *
 * @since v0.9.0
 */
export function failureWith<T>(map: Unary<Error, Error>): BiMapResult<T, T> {
    return [same, map];
}

/**
 * A {@linkcode BiFold} type specific to the {@linkcode Result} type.
 *
 * @since v0.9.0
 */
export type BiFoldResult<T, U> = BiFold<T, Error, U>;

/**
 * A pair of unary procedures for the {@linkcode Result.through} method.
 *
 * @since v0.9.0
 */
export type BiVoidResult<T> = [UnaryVoid<T>, UnaryVoid<Error>];
