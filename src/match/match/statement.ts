import { Predicate } from '../../boolean/predicate/predicate';
import { Proposition } from '../../boolean/proposition/proposition';
import { isFunction } from '../../function/function/function';
import { constant, Value } from '../../function/function/nullary';
import { Unary } from '../../function/function/unary';

export interface Statement<T, U> {
    readonly condition: Predicate<T>;
    readonly evaluate: Unary<T, U>;
}

export type StatementEntry<T, U> = [Predicate<T> | Proposition, Unary<T, U> | Value<U>];

export function statements<T, U>(entries: StatementEntry<T, U>[]): Statement<T, U>[] {
    return entries.map(([condition, evaluate]) => ({
        condition: isFunction(condition) ? condition : constant(condition),
        evaluate: isFunction(evaluate) ? evaluate : constant(evaluate),
    }));
}
