import { isNull, isUndefined } from '@perfective/value';

export interface Output {
    toString: () => string;
}

/**
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
