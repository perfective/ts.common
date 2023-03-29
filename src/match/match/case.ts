import { Predicate } from '../../boolean/predicate/predicate';
import { Proposition } from '../../boolean/proposition/proposition';
import { isFunction } from '../../function/function/function';
import { constant, Value } from '../../function/function/nullary';
import { Unary } from '../../function/function/unary';

/**
 * @since v0.9.0
 */
export interface Case<T, U> {
    readonly condition: Predicate<T>;
    readonly statement: Unary<T, U>;
}

/**
 * @since v0.9.0
 */
export type CaseEntry<T, U> = [Predicate<T> | Proposition, Unary<T, U> | Value<U>];

/**
 * Creates a list of {@linkcode Case|cases} from a list of {@linkcode CaseEntry|entries}.
 *
 * @since v0.9.0
 */
export function fromEntries<T, U>(entries: CaseEntry<T, U>[]): Case<T, U>[] {
    return entries.map(caseFromEntry);
}

/**
 * Creates a {@linkcode Case} from a {@linkcode CaseEntry}.
 *
 * @since v0.9.0
 */
export function caseFromEntry<T, U>([condition, statement]: CaseEntry<T, U>): Case<T, U> {
    return {
        condition: isFunction(condition) ? condition : constant(condition),
        statement: isFunction(statement) ? statement : constant(statement),
    };
}
