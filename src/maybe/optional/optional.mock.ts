import { safeDecimalOutput } from '../maybe/maybe.mock';

import { None, none, Optional, optional, Some, some } from './optional';

export interface Boxed<T> {
    readonly value?: T | undefined;
}

/**
 * Allows to test values that may be absent without compiler narrowing it down automatically.
 */
export function fallbackOptional<T>(input: T | undefined): T | undefined {
    return input;
}

export function optionalNumber(input: number | undefined): number | undefined {
    return input;
}

export function optionalDecimalOutput(input: number | null | undefined): Optional<string> {
    return optional(safeDecimalOutput(input));
}

export function someDecimalOutput(input: number | null): Some<string> {
    return some(safeDecimalOutput(input));
}

export function noneDecimalOutput(): None<string> {
    return none();
}
