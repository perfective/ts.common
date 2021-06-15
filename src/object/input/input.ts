import { isNull } from '../../value/value/value';
import { isObject } from '../object/predicate';

export type InputPrimitive<T> = T extends string | number | boolean | null | undefined
    ? T | string | number | boolean | null | undefined
    : never;

export type InputArray<T> = Input<T>[];

export type InputObject<T> = {
    [P in keyof T]?: Input<T[P]> | null;
};

export type Input<T> = (T extends (infer U)[]
    ? InputArray<U>
    // eslint-disable-next-line @typescript-eslint/ban-types -- conditional type guard
    : T extends object
        ? InputObject<T>
        : InputPrimitive<T>) | null | undefined;

export function input<T>(input: unknown): Input<T> {
    return input as Input<T>;
}

export function stringInput(input: unknown): string | undefined {
    if (typeof input === 'string') {
        return input;
    }
    return undefined;
}

export function numberInput(input: unknown): number | undefined {
    if (typeof input === 'number') {
        return input;
    }
    return undefined;
}

export function booleanInput(input: unknown): boolean | undefined {
    if (typeof input === 'boolean') {
        return input;
    }
    return undefined;
}

export function arrayInput<T>(input: unknown): Input<T>[] | undefined {
    if (Array.isArray(input)) {
        return input as Input<T>[];
    }
    return undefined;
}

export function objectInput<T>(input: unknown): InputObject<T> | undefined {
    if (isObject(input) && !Array.isArray(input)) {
        return input as InputObject<T>;
    }
    return undefined;
}

export function nullInput(input: unknown): null | undefined {
    if (isNull(input)) {
        return input;
    }
    return undefined;
}
