export function isFirstOccurrence<T>(value: T, index: number, array: T[]): boolean {
    return array.indexOf(value) === index;
}

export function isLastOccurrence<T>(value: T, index: number, array: T[]): boolean {
    return array.lastIndexOf(value) === index;
}
