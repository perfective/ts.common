import { isNull } from '../../value/value';
import { isObject } from '../object/predicate';

/**
 * A conditional type for a primitive value.
 *
 * @since v0.4.0
 */
export type InputPrimitive<T> = T extends string | number | boolean | null | undefined
    ? T | string | number | boolean | null | undefined
    : never;

/**
 * An array of input values `T`.
 *
 * @since v0.4.0
 */
export type InputArray<T> = Input<T>[];

/**
 * An input object type.
 *
 * @since v0.4.0
 */
export type InputObject<T> = {
    [P in keyof T]?: Input<T[P]> | null;
};

/**
 * A recursive type that shows that a given value of type `T` has not yet been validated.
 *
 * @since v0.4.0
 */
export type Input<T> = (T extends (infer U)[]
    ? InputArray<U>
    // eslint-disable-next-line @typescript-eslint/no-restricted-types -- conditional type guard
    : T extends object
        ? InputObject<T>
        : InputPrimitive<T>) | null | undefined;

/**
 * Marks a given `value` as an {@linkcode Input}.
 *
 * @since v0.4.0
 */
export function input<T>(value: unknown): Input<T> {
    return value as Input<T>;
}

/**
 * If a given `value` is a string, returns the `value`.
 * Otherwise, returns `undefined`.
 *
 * @since v0.4.0
 */
export function stringInput(input: unknown): string | undefined {
    if (typeof input === 'string') {
        return input;
    }
    return undefined;
}

/**
 * If a given `value` is a number, returns the `value`.
 * Otherwise, returns `undefined`.
 *
 * @since v0.4.0
 */
export function numberInput(input: unknown): number | undefined {
    if (typeof input === 'number') {
        return input;
    }
    return undefined;
}

/**
 * If a given `value` is a boolean, returns the `value`.
 * Otherwise, returns `undefined`.
 *
 * @since v0.4.0
 */
export function booleanInput(input: unknown): boolean | undefined {
    if (typeof input === 'boolean') {
        return input;
    }
    return undefined;
}

/**
 * If a given `value` is an array, returns the `value`.
 * Otherwise, returns `undefined`.
 *
 * @since v0.4.0
 */
export function arrayInput<T>(input: unknown): Input<T>[] | undefined {
    if (Array.isArray(input)) {
        return input as Input<T>[];
    }
    return undefined;
}

/**
 * If a given `value` is a non-array object, returns the `value`.
 * Otherwise, returns `undefined`.
 *
 * @since v0.4.0
 */
export function objectInput<T>(input: unknown): InputObject<T> | undefined {
    if (isObject(input) && !Array.isArray(input)) {
        return input as InputObject<T>;
    }
    return undefined;
}

/**
 * If a given `value` is null, returns the `value`.
 * Otherwise, returns `undefined`.
 *
 * @since v0.4.0
 */
export function nullInput(input: unknown): null | undefined {
    if (isNull(input)) {
        return input;
    }
    return undefined;
}
