export function error(message: string): Error {
    return new Error(message);
}

export function isError<T>(value: Error | T): value is Error {
    return value instanceof Error;
}

export function isNotError<T>(value: Error | T): value is T {
    return !(value instanceof Error);
}
