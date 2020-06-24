export type TypeGuard<T, V extends T> = (value: T) => value is V;
