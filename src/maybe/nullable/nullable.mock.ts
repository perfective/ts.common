import { safeDecimalOutput } from '../maybe/maybe.mock';

import { Nil, nil, Nullable, nullable, Only, only } from './nullable';

export interface Boxed<T> {
    readonly value: T | null;
}

/**
 * Allows to test values that may be absent without compiler narrowing it down automatically.
 */
export function fallbackNullable<T>(input: T | null): T | null {
    return input;
}

export function nullableNumber(input: number | null): number | null {
    return input;
}

export function nullableDecimalOutput(input: number | null | undefined): Nullable<string> {
    return nullable(input).to(safeDecimalOutput);
}

export function onlyDecimalOutput(input: number | undefined): Only<string> {
    return only(safeDecimalOutput(input));
}

export function nilDecimalOutput(): Nil<string> {
    return nil();
}
