import { errorOutput } from '../error/error';
import { Exception, isException, unchained } from '../exception/exception';
import { ExceptionMessage } from '../exception/exception-message';

/**
 * Failure type should be used to transform Error objects into a plain transferable record.
 *
 * @since v0.3.0
 */
export interface Failure {
    readonly name: string;
    readonly message: ExceptionMessage;
    readonly chain: string[];
}

/**
 * Creates a {@linkcode Failure} from a given {@linkcode Error}.
 * When given an {@linkcode Exception}, unpacks its chain of previous {@linkcode Error|errors}.
 * Otherwise, {@linkcode Failure.chain} will have only the given `error`.
 *
 * @since v0.3.0
 */
export function failure(error: Error): Failure {
    if (isException(error)) {
        return failureFromException(error);
    }
    return failureFromError(error);
}

function failureFromError(error: Error): Failure {
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

function failureFromException(exception: Exception): Failure {
    return {
        name: exception.name,
        message: {
            template: exception.template,
            tokens: exception.tokens,
        },
        chain: unchained(exception).map(errorOutput),
    };
}
