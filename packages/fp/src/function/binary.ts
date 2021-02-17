import { hasLength } from './length';

export type Binary<X, Y, V> = (x: X, y: Y) => V;

// eslint-disable-next-line @typescript-eslint/ban-types -- generic predicate
export function isBinary<F extends Function>(f: F): boolean {
    return hasLength(2)(f);
}
