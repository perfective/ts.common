import { Predicate, Unary } from '@perfective/fp';

export interface Statement<T, U> {
    readonly condition: Predicate<T>;
    readonly evaluate: Unary<T, U>;
}
