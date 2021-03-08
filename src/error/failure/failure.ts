import { errorOutput } from '../error/error';
import { Exception, isException, unchained } from '../exception/exception';
import { ExceptionMessage } from '../exception/exception-message';

/**
 * Failure type should be used to transform Error objects into a plain transferable record.
 */
export interface Failure {
    readonly name: string;
    readonly message: ExceptionMessage;
    readonly chain: string[];
}

export function failure<E extends Error>(error: E): Failure {
    if (isException(error)) {
        return failureFromException(error);
    }
    return failureFromError(error);
}

export function failureFromError<E extends Error>(error: E): Failure {
    return {
        name: error.name,
        message: {
            template: error.message,
            tokens: {},
        },
        chain: [
            errorOutput(error),
        ],
    };
}

export function failureFromException<E extends Exception>(exception: E): Failure {
    return {
        name: exception.name,
        message: {
            template: exception.template,
            tokens: exception.tokens,
        },
        chain: unchained(exception).map(errorOutput),
    };
}
