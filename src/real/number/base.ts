import { Integer } from './integer';
import { isNumber } from './number';

export function decimal(value: number): string;
export function decimal(value: string): number | null;
export function decimal(value: number | string): string | number | null {
    if (typeof value === 'string') {
        const float: number = Number.parseFloat(value);
        return isNumber(float) ? float : null;
    }
    return value.toString(10);
}

export function binary(value: Integer): string;
export function binary(value: string): Integer | null;
export function binary(value: Integer | string): string | Integer | null {
    return base(2, value);
}

export function octal(value: Integer): string;
export function octal(value: string): Integer | null;
export function octal(value: Integer | string): string | Integer | null {
    return base(8, value);
}

export function hexadecimal(value: Integer): string;
export function hexadecimal(value: string): Integer | null;
export function hexadecimal(value: Integer | string): string | Integer | null {
    return base(16, value);
}

type Base = 2 | 8 | 16;

function base(base: Base, value: Integer | string): string | Integer | null {
    if (typeof value === 'string') {
        const integer: number = Number.parseInt(value, base);
        return isNumber(integer) ? integer : null;
    }
    return Math.floor(value).toString(base);
}
