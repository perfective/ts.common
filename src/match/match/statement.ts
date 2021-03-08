import { isFunction } from '../../fp/function/function';
import { constant, Value } from '../../fp/function/nullary';
import { Predicate } from '../../fp/function/predicate';
import { Proposition } from '../../fp/function/proposition';
import { Unary } from '../../fp/function/unary';

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
