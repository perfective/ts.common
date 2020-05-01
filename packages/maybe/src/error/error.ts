import { Nullary } from '../maybe/maybe';
import { isDefined } from '../value/value';

export function isError(error: Error | string): error is Error {
    return error instanceof Error;
}

export function throws<E extends Error>(error?: E | string): never {
    if (isDefined(error) && isError(error)) {
        // @typescript-eslint/no-throw-literal rule fails without type casting
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw error;
    }
    throw new Error(error);
}

export function panic<E extends Error>(error?: E | string): Nullary<never> {
    return (): never => throws(error);
}
