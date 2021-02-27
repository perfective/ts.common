export interface Boxed<T> {
    readonly value?: T | null | undefined;
}

/**
 * Allows to test values that may be absent without compiler narrowing it down automatically.
 */
export function fallbackMaybe<T>(input: T | null | undefined): T | null | undefined {
    return input;
}
