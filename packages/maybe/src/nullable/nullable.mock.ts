export interface Boxed<T> {
    readonly value: T | null;
}

/**
 * Allows to test values that may be absent without compiler narrowing it down automatically.
 */
export function fallback<T>(input: T | null): T | null {
    return input;
}
