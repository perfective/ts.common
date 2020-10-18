import { Value, valueOf } from './nullary';

export type Proposition = Value<boolean>;

export function isTrue(proposition: Proposition): boolean {
    return valueOf(proposition);
}

export function isFalse(proposition: Proposition): boolean {
    return !valueOf(proposition);
}
