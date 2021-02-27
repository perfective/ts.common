export interface Option<T, N extends null | undefined> {
    readonly value: T | N;
}
