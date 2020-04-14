type Predicate<T> = (value: T) => boolean;

export function isEqualTo(value: number): Predicate<number> {
    return (variable: number): boolean => variable === value;
}

export function isNotEqualTo(value: number): Predicate<number> {
    return (variable: number): boolean => variable !== value;
}

export function isGreaterThan(value: number): Predicate<number> {
    return (variable: number): boolean => variable > value;
}

export function isGreaterThanOrEqualTo(value: number): Predicate<number> {
    return (variable: number): boolean => variable >= value;
}

export function isLessThan(value: number): Predicate<number> {
    return (variable: number): boolean => variable < value;
}

export function isLessThanOrEqualTo(value: number): Predicate<number> {
    return (variable: number): boolean => variable <= value;
}

export function isInInterval(from: number, to: number): Predicate<number> {
    return (variable: number): boolean => from <= variable && variable <= to;
}

export function isInOpenInterval(from: number, to: number): Predicate<number> {
    return (variable: number): boolean => from < variable && variable < to;
}

export function isInOpenFromInterval(from: number, to: number): Predicate<number> {
    return (variable: number): boolean => from < variable && variable <= to;
}

export function isInOpenToInterval(from: number, to: number): Predicate<number> {
    return (variable: number): boolean => from <= variable && variable < to;
}
