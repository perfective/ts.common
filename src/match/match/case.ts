import { Predicate } from '../../boolean/predicate/predicate';
import { Proposition } from '../../boolean/proposition/proposition';
import { isFunction } from '../../function/function/function';
import { constant, Value } from '../../function/function/nullary';
import { Unary } from '../../function/function/unary';

export interface Case<T, U> {
    readonly condition: Predicate<T>;
    readonly statement: Unary<T, U>;
}

/**
 * @deprecated Since v0.9.0. Use {@linkcode Case} instead.
 */
export type Statement<T, U> = Case<T, U>;

export type CaseEntry<T, U> = [Predicate<T> | Proposition, Unary<T, U> | Value<U>];

/**
 * @deprecated Since v0.9.0. Use {@linkcode CaseEntry} instead.
 */
export type StatementEntry<T, U> = CaseEntry<T, U>;

/**
 * Creates a list of {@linkcode Case|cases} from a list of {@linkcode CaseEntry|entries}.
 */
export function fromEntries<T, U>(entries: CaseEntry<T, U>[]): Case<T, U>[] {
    return entries.map(caseFromEntry);
}

/**
 * Creates a list of {@linkcode Case|cases} from a list of {@linkcode CaseEntry|entries}.
 *
 * @deprecated Since v0.9.0. Use {@linkcode fromEntries} instead.
 */
export function statements<T, U>(entries: CaseEntry<T, U>[]): Case<T, U>[] {
    return fromEntries(entries);
}

/**
 * Creates a {@linkcode Case} from a {@linkcode CaseEntry}.
 */
export function caseFromEntry<T, U>([condition, statement]: CaseEntry<T, U>): Case<T, U> {
    return {
        condition: isFunction(condition) ? condition : constant(condition),
        statement: isFunction(statement) ? statement : constant(statement),
    };
}
