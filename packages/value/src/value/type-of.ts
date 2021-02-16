import { isNull } from './type-guard';

type EcmaTypeOf = 'undefined' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'object';

/**
 * JavaScript types returned by the `typeof` operator plus "null" and "array".
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
 */
export type TypeOf = EcmaTypeOf | 'null' | 'array';

export function typeOf<T>(value: T | null | undefined): TypeOf {
    if (isNull(value)) {
        return 'null';
    }
    if (Array.isArray(value)) {
        return 'array';
    }
    return typeof value;
}
