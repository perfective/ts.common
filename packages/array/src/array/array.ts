export function concatenated<T>(initial: T[], ...arrays: T[][]): T[] {
    return arrays.reduce((result, array) => result.concat(array), initial);
}

export function flatten<T>(arrays: T[][]): T[] {
    return arrays.reduce((result, array) => result.concat(array), []);
}

export function isArray<T, V = unknown>(value: T[] | V): value is T[] {
    return Array.isArray(value);
}

export function isNotArray<T, V = unknown>(value: T[] | V): value is V {
    return !Array.isArray(value);
}

export function isEmpty<T>(array: T[]): boolean {
    return array.length === 0;
}

export function isNotEmpty<T>(array: T[]): boolean {
    return array.length > 0;
}

export function length<T>(array: T[]): number {
    return array.length;
}
