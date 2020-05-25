export function referenceError(message?: string): ReferenceError {
    return new ReferenceError(message);
}

export function isReferenceError<T>(value: ReferenceError | T): value is ReferenceError {
    return value instanceof ReferenceError;
}

export function isNotReferenceError<T>(value: ReferenceError | T): value is T {
    return !(value instanceof ReferenceError);
}
