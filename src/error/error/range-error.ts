export function rangeError(message: string): RangeError {
    return new RangeError(message);
}

export function isRangeError<T>(value: RangeError | T): value is RangeError {
    return value instanceof RangeError;
}

export function isNotRangeError<T>(value: RangeError | T): value is T {
    return !(value instanceof RangeError);
}
