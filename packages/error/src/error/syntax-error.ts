export function syntaxError(message?: string): SyntaxError {
    return new SyntaxError(message);
}

export function isSyntaxError<T>(value: SyntaxError | T): value is SyntaxError {
    return value instanceof SyntaxError;
}

export function isNotSyntaxError<T>(value: SyntaxError | T): value is T {
    return !(value instanceof SyntaxError);
}
