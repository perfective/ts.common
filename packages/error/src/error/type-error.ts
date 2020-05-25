export function typeError(message?: string): TypeError {
    return new TypeError(message);
}

export function isTypeError<T>(value: TypeError | T): value is TypeError {
    return value instanceof TypeError;
}

export function isNotTypeError<T>(value: TypeError | T): value is T {
    return !(value instanceof TypeError);
}
