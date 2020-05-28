import { isFunction } from './function';
import { Nullary } from './nullary';

export type Proposition = boolean | Nullary<boolean>;

export function isTrue(proposition: Proposition): boolean {
    if (isFunction(proposition)) {
        return proposition();
    }
    return proposition;
}

export function isFalse(proposition: Proposition): boolean {
    if (isFunction(proposition)) {
        return !proposition();
    }
    return !proposition;
}

export function always(): boolean {
    return true;
}

export function never(): boolean {
    return false;
}
