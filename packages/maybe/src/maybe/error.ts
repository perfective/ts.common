import { Nullary } from './maybe';

export function panic<E extends Error>(error?: E | string): Nullary<never> {
    // Arrow-body-style does not recognize immediate throw
    // eslint-disable-next-line arrow-body-style
    return (): never => {
        if (error instanceof Error) {
            // @typescript-eslint/no-throw-literal rule fails without type casting
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            throw error as Error;
        }
        throw new Error(error);
    };
}
