import { Unary } from '@perfective/fp';

export type Digits = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
| 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

export type Precision = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
| 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;

export function exponential(fraction: Digits): Unary<number, string> {
    return (value: number): string => value.toExponential(fraction);
}

export function fixed(fraction: Digits): Unary<number, string> {
    return (value: number): string => value.toFixed(fraction);
}

export function precision(precision: Precision): Unary<number, string> {
    return (value: number): string => value.toPrecision(precision);
}
