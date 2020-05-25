import { isError } from '../error/error';

export function throws<E extends Error>(error?: E | string): never {
    // eslint-disable-next-line no-void
    if (error !== void 0 && isError(error)) {
        // @typescript-eslint/no-throw-literal rule fails without type casting
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw error;
    }
    throw new Error(error);
}

export function panic<E extends Error>(error?: E | string): () => never {
    return (): never => throws(error);
}
