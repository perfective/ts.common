import { is, Predicate } from '../../boolean/predicate/predicate';
import { isFunction } from '../../function/function/function';
import { constant } from '../../function/function/nullary';
import { Unary } from '../../function/function/unary';

import { Case } from './case';

/**
 * A builder class for a {@linkcode Case}.
 */
class When<T> {
    public constructor(
        private readonly condition: Predicate<T>,
    ) {}

    /**
     * Creates a statement with a {@linkcode When.condition|condition} and a given {@linkcode value}.
     *
     * @since v0.9.0
     */
    public to<U>(value: U | Unary<T, U>): Case<T, U> {
        return {
            condition: this.condition,
            statement: isFunction(value) ? value : constant(value),
        };
    }
}

export function when<T>(condition: T | Predicate<T>): When<T> {
    return new When<T>(isFunction(condition) ? condition : is(condition));
}
