// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction<T>(value: Function | T): value is Function {
    return value instanceof Function;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isNotFunction<T>(value: Function | T): value is T {
    return !isFunction(value);
}
