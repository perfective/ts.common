import { Unary } from '../../function/function/unary';

export type Element<A> = A extends readonly (infer T)[] ? T : undefined;

export function head<T>(array: T[]): T | undefined {
    return array[0];
}

export function tail<T>(array: T[]): T[] {
    return array.slice(1);
}

export function end<T>(array: T[]): T | undefined {
    return array[array.length - 1];
}

export function init<T>(array: T[]): T[] {
    if (array.length === 0) {
        return [];
    }
    return array.slice(0, -1);
}

export function element<T>(index: number): Unary<T[], T | undefined> {
    return (array: T[]): T | undefined => array[index];
}

export function first<T>(count: number = 1): Unary<T[], T[]> {
    return (array: T[]): T[] => array.slice(0, count);
}

export function last<T>(count: number = 1): Unary<T[], T[]> {
    return (array: T[]): T[] => array.slice(-count);
}

export function append<T>(element: T): Unary<T[], T[]> {
    return (array: T[]): T[] => [
        ...array,
        element,
    ];
}

export function prepend<T>(element: T): Unary<T[], T[]> {
    return (array: T[]): T[] => [
        element,
        ...array,
    ];
}

export function insert<T>(index: number, element: T): Unary<T[], T[]> {
    return (array: T[]): T[] => [
        ...array.slice(0, index),
        element,
        ...array.slice(index),
    ];
}

export function insertInto<T>(array: T[], index: number): Unary<T, T[]> {
    return (element: T): T[] => insert(index, element)(array);
}

export function replace<T>(index: number, element: T): Unary<T[], T[]> {
    return (array: T[]): T[] => [
        ...array.slice(0, index),
        element,
        ...array.slice(index + 1),
    ];
}

export function remove<T>(index: number): Unary<T[], T[]> {
    return (array: T[]): T[] => [
        ...array.slice(0, index),
        ...array.slice(index + 1),
    ];
}
