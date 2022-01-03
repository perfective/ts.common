import { is, Predicate } from '../../boolean/predicate/predicate';
import { isFunction } from '../../function/function/function';
import { constant } from '../../function/function/nullary';
import { Unary } from '../../function/function/unary';

import { Statement } from './statement';

class When<T> {
    public constructor(
        private readonly condition: Predicate<T>,
    ) {}

    // eslint-disable-next-line unicorn/no-thenable -- TODO: Try to find a different term
    public then<U>(value: U | Unary<T, U>): Statement<T, U> {
        return {
            condition: this.condition,
            evaluate: isFunction(value) ? value : constant(value),
        };
    }
}

export function when<T>(condition: T | Predicate<T>): When<T> {
    return new When<T>(isFunction(condition) ? condition : is(condition));
}
