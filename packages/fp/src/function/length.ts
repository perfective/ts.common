export interface Length {
    length: number;
}

export function length<L extends Length>(value: L): number {
    return value.length;
}

export function hasLength<L extends Length>(length: number): (value: L) => boolean {
    return (value: L): boolean => value.length === length;
}

export function isEmpty<L extends Length>(value: L): boolean {
    return value.length <= 0;
}

export function isNotEmpty<L extends Length>(value: L): boolean {
    return value.length > 0;
}

export function toShortest<T extends Length>(shortest: T, value: T): T {
    return shortest.length < value.length ? shortest : value;
}

export function toLongest<T extends Length>(longest: T, array: T): T {
    return longest.length > array.length ? longest : array;
}
