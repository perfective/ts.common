import { isAbsent, isNull, isPresent, isUndefined } from '../../value/value';

export interface Output {
    toString: () => string;
}

/**
 * Output of an optional or nullable value.
 *
 * @see https://tc39.es/ecma262/#sec-tostring
 */
export function output<T extends Output>(value: T | string | null | undefined): string {
    if (isUndefined(value)) {
        return 'undefined';
    }
    if (isNull(value)) {
        return 'null';
    }
    return value.toString();
}

/* eslint-disable @typescript-eslint/no-explicit-any -- check if method is defined */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- check if method is defined */
export function isOutput<T>(value: Output | T): value is Output {
    return isPresent(value) && typeof (value as any).toString === 'function';
}

export function isNotOutput<T>(value: Output | T): value is T {
    return isAbsent(value) || typeof (value as any).toString !== 'function';
}
/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
