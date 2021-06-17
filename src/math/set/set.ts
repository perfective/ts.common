import { isNumber } from '../../number/number/number';

export function maximum(values: readonly number[]): number | null {
    const numbers: number[] = values.filter(isNumber);
    if (numbers.length === 0) {
        return null;
    }
    return Math.max(...numbers);
}

export function minimum(values: readonly number[]): number | null {
    const numbers: number[] = values.filter(isNumber);
    if (numbers.length === 0) {
        return null;
    }
    return Math.min(...numbers);
}
