import { isFunction } from '../../fp/function/function';
import { constant } from '../../fp/function/nullary';
import { is, Predicate } from '../../fp/function/predicate';
import { Unary } from '../../fp/function/unary';

import { Statement } from './statement';

class When<T> {
    public constructor(
        private readonly condition: Predicate<T>,
    ) {}

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
