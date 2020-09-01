export function concatenated<T>(initial: T[], ...arrays: T[][]): T[] {
    return arrays.reduce((result, array) => result.concat(array), initial);
}

export function isArray<T, V = unknown>(value: T[] | V): value is T[] {
    return Array.isArray(value);
}

export function isNotArray<T, V = unknown>(value: T[] | V): value is V {
    return !Array.isArray(value);
}

export function length<T>(array: T[]): number {
    return array.length;
}
