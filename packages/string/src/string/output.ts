export interface Output {
    toString: () => string;
}

export function output<T extends Output>(value: T | string): string {
    return value.toString();
}
