import { isAbsent, isNull, isUndefined } from '../../value/value';

import { Just, just, Maybe, maybe, nil, Nothing, nothing } from './maybe';

export interface Boxed<T> {
    readonly value?: T | null | undefined;
}

/**
 * Allows to test values that may be absent without compiler narrowing it down automatically.
 */
export function unsafe<T>(input: T | null | undefined): T | null | undefined {
    return input;
}

export function unsafeNumber(input: number | null | undefined): number | null | undefined {
    return input;
}

export function absentNumber(input: number | null | undefined): null | undefined {
    if (isAbsent(input)) {
        return input;
    }
    return null;
}

export function splitComma(input: string): string[] {
    return input.split(',');
}

export function unsafeDecimalOutput(input: number): string | null | undefined {
    return strictDecimalOutput(input);
}

export function safeDecimalOutput(input: number | null | undefined): string {
    if (isUndefined(input)) {
        return 'undefined';
    }
    if (isNull(input)) {
        return 'null';
    }
    return strictDecimalOutput(input);
}

export function strictDecimalOutput(input: number): string {
    return input.toString(10);
}

export function strictDecimalSplitComma(input: number): string[] {
    return strictDecimalOutput(input).split(',');
}

export function maybeDecimalOutput(input: number | null | undefined): Maybe<string> {
    return maybe(input).to(strictDecimalOutput);
}

export function justDecimalOutput(input: number): Just<string> {
    return just(strictDecimalOutput(input));
}

export function nilDecimalOutput(): Nothing<string> {
    return nil();
}

export function nothingDecimalOutput(): Nothing<string> {
    return nothing();
}

export function optionalNumber(input: number | undefined): number | undefined {
    return input;
}

export function nullableNumber(input: number | null): number | null {
    return input;
}
