export function isNumber<T>(value: number | T): value is number {
    return typeof value === 'number' && !Number.isNaN(value);
}

export function isNotNumber<T>(value: number | T): value is T {
    return typeof value !== 'number' || Number.isNaN(value);
}

export function negative(value: number): number {
    if (value === 0) {
        return 0;
    }
    return -value;
}
