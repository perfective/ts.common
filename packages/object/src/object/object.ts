export function isObject<T>(value: T | null): boolean {
    return value !== null
        && typeof value === 'object';
}
