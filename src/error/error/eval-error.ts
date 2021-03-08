export function evalError(message: string): EvalError {
    return new EvalError(message);
}

export function isEvalError<T>(value: EvalError | T): value is EvalError {
    return value instanceof EvalError;
}

export function isNotEvalError<T>(value: EvalError | T): value is T {
    return !(value instanceof EvalError);
}
