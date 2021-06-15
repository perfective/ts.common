import { Nullary, Value, valueOf } from '../../function/function/nullary';
import { Maybe, maybe, nothing } from '../../maybe/maybe/maybe';

import { Statement } from './statement';

export class Match<T> {
    public constructor(
        public readonly value: Value<T>,
    ) {}

    public that<U>(...statements: Statement<T, U>[]): Maybe<U> {
        const value: T = valueOf(this.value);
        for (const statement of statements) {
            if (statement.condition(value)) {
                return maybe(statement.evaluate(value));
            }
        }
        return nothing();
    }

    public to<U>(statements: Statement<T, U>[]): Maybe<U> {
        return this.that(...statements);
    }
}

export function match<T>(value: T | Nullary<T>): Match<T> {
    return new Match<T>(value);
}
