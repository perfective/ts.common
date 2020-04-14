import { Integer } from './integer';

export function decimal(value: number): string;
export function decimal(value: string): number;
export function decimal(value: number | string): string | number {
    if (typeof value === 'string') {
        return parseFloat(value);
    }
    return value.toString(10);
}

export function binary(value: Integer): string;
export function binary(value: string): number;
export function binary(value: Integer | string): string | Integer {
    return base(2, value);
}

export function octal(value: Integer): string;
export function octal(value: string): number;
export function octal(value: Integer | string): string | Integer {
    return base(8, value);
}

export function hexadecimal(value: Integer): string;
export function hexadecimal(value: string): number;
export function hexadecimal(value: Integer | string): string | Integer {
    return base(16, value);
}

type Base = 2 | 8 | 16;

function base(base: Base, value: Integer | string): string | Integer {
    if (typeof value === 'string') {
        return parseInt(value, base);
    }
    return Math.floor(value).toString(base);
}
