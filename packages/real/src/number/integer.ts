export type Integer = number;

export function isInteger(value: number): boolean {
    return Number.isInteger(value);
}

export function isNonNegativeInteger(value: number): boolean {
    return value >= 0 && isInteger(value);
}

export function isPositiveInteger(value: number): boolean {
    return value > 0 && isInteger(value);
}

export function isNonPositiveInteger(value: number): boolean {
    return value <= 0 && isInteger(value);
}

export function isNegativeInteger(value: number): boolean {
    return value < 0 && isInteger(value);
}
