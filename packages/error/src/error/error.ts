export function error(message: string): Error {
    return new Error(message);
}

export function isError<T>(value: Error | T): value is Error {
    return value instanceof Error;
}

export function isNotError<T>(value: Error | T): value is T {
    return !(value instanceof Error);
}

/**
 * Returns the same string as Error.toString() on Node.js
 */
export function errorOutput(error: Error): string {
    return `${error.name}: ${error.message}`.replace(/: $/u, '');
}

export function stack(error: Error): string {
    // eslint-disable-next-line no-void -- check for "undefined"
    if (error.stack !== void 0) {
        return error.stack;
    }
    return [error.message, 'at <unknown>'].join('\n    ');
}
