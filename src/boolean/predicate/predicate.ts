import { Unary } from '../../function/function/unary';
import { isFalse, isTrue } from '../proposition/proposition';

export type Predicate<T> = (value: T) => boolean;

export function is<T>(input: T): Predicate<T> {
    return (value: T): boolean => value === input;
}

export function isNot<T>(input: T): Predicate<T> {
    return (value: T): boolean => value !== input;
}

export function not<T>(predicate: Predicate<T>): Predicate<T> {
    return (value: T): boolean => !predicate(value);
}

export function all<T>(...predicates: Predicate<T>[]): Predicate<T> {
    return (value: T): boolean => predicates.map(bool(value)).filter(isFalse).length === 0;
}

export function either<T>(...predicates: Predicate<T>[]): Predicate<T> {
    return (value: T): boolean => predicates.map(bool(value)).some(isTrue);
}

export function neither<T>(...predicates: Predicate<T>[]): Predicate<T> {
    return (value: T): boolean => predicates.map(bool(value)).filter(isTrue).length === 0;
}

export function atLeast<T>(minimum: number, ...predicates: Predicate<T>[]): Predicate<T> {
    return (value: T): boolean => predicates.map(bool(value)).filter(isTrue).length >= minimum;
}

export function atMost<T>(maximum: number, ...predicates: Predicate<T>[]): Predicate<T> {
    return (value: T): boolean => predicates.map(bool(value)).filter(isTrue).length <= maximum;
}

export function exactly<T>(count: number, ...predicates: Predicate<T>[]): Predicate<T> {
    return (value: T): boolean => predicates.map(bool(value)).filter(isTrue).length === count;
}

function bool<T>(value: T): Unary<Predicate<T>, boolean> {
    return (predicate: Predicate<T>): boolean => predicate(value);
}
