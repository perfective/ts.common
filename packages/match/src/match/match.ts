import { Nullary, fallbackTo } from '@perfective/fp';
import { Maybe, just, nothing } from '@perfective/maybe';

import { Statement } from './statement';

export class Match<T> {
    public constructor(
        public readonly value: T | Nullary<T>,
    ) {
    }

    public that<U>(...statements: Statement<T, U>[]): Maybe<U> {
        const value = fallbackTo(this.value);
        for (const statement of statements) {
            if (statement.condition(value)) {
                return just(statement.evaluate(value));
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
