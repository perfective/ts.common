export interface Boxed<T> {
    readonly value?: T | undefined;
}

/**
 * Allows to test values that may be absent without compiler narrowing it down automatically.
 */
export function fallbackOptional<T>(input: T | undefined): T | undefined {
    return input;
}
