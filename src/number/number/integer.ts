export type Integer = number;

export function isInteger(value: number): value is Integer {
    return Number.isInteger(value);
}

export type SafeInteger = number;

export function isSafeInteger(value: number): value is SafeInteger {
    return Number.isSafeInteger(value);
}

export type NonNegativeInteger = number;

export function isNonNegativeInteger(value: number): value is NonNegativeInteger {
    return value >= 0 && isInteger(value);
}

export type PositiveInteger = number;

export function isPositiveInteger(value: number): value is PositiveInteger {
    return value > 0 && isInteger(value);
}

export type NonPositiveInteger = number;

export function isNonPositiveInteger(value: number): value is NonPositiveInteger {
    return value <= 0 && isInteger(value);
}

export type NegativeInteger = number;

export function isNegativeInteger(value: number): value is NegativeInteger {
    return value < 0 && isInteger(value);
}
