export function concatenated<T>(initial: T[], ...arrays: T[][]): T[] {
    return arrays.reduce((result, array) => result.concat(array), initial);
}

export function length<T>(array: T[]): number {
    return array.length;
}
