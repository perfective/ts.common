import { isArray } from '../../array/array/array';
import { Nullary, Value, valueOf } from '../../function/function/nullary';
import { Maybe, maybe, nothing } from '../../maybe/maybe/maybe';

import { Case } from './case';

/**
 * Provides pattern-matching functionality.
 *
 * @since v0.1.0
 */
export class Match<T> {
    public constructor(

        /**
         * The value to be matches against different conditions.
         */
        public readonly value: Value<T>,
    ) {}

    /**
     * Finds the first case with a matching {@linkcode Case.condition}
     * and applies the {@linkcode Case.statement} to the {@linkcode Match.value}.
     *
     * @since v0.9.0
     */
    public cases<U>(...cases: Case<T, U>[]): Maybe<U>;

    /**
     * Finds the first case with a matching {@linkcode Case.condition}
     * and applies the {@linkcode Case.statement} to the {@linkcode Match.value}.
     *
     * @since v0.9.0
     */
    public cases<U>(cases: Case<T, U>[]): Maybe<U>;

    public cases<U>(first: Case<T, U>[] | Case<T, U>, ...rest: Case<T, U>[]): Maybe<U> {
        const value: T = valueOf(this.value);
        for (const caseValue of concatenate(first, ...rest)) {
            if (caseValue.condition(value)) {
                return maybe(caseValue.statement(value));
            }
        }
        return nothing() as Maybe<U>;
    }
}

/**
 * Creates a list of cases for the {@linkcode Match.cases} method input.
 *
 * @internal
 */
function concatenate<T, U>(first: Case<T, U>[] | Case<T, U>, ...rest: Case<T, U>[]): Case<T, U>[] {
    return isArray(first) ? first : [first].concat(rest).filter(Boolean);
}

/**
 * Creates an object to match a given `value`.
 *
 * @since v0.1.0
 */
export function match<T>(value: T | Nullary<T>): Match<T> {
    return new Match<T>(value);
}
