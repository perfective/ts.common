export function isFunction<T>(value: Function | T): value is Function {
    return value instanceof Function;
}

export function isNotFunction<T>(value: Function | T): value is T {
    return !isFunction(value);
}
