import { hasLength } from './length';

export type Ternary<X, Y, Z, V> = (x: X, y: Y, z: Z) => V;

// eslint-disable-next-line @typescript-eslint/ban-types -- generic predicate
export function isTernary<F extends Function>(f: F): boolean {
    return hasLength(3)(f);
}
