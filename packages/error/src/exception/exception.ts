import { errorOutput, stack } from '../error/error';
import { throws } from '../panic/panic';

import { ExceptionContext, exceptionMessage } from './exception-context';

// eslint-disable-next-line unicorn/custom-error-definition -- base class for user-defined errors
export class Exception
    extends Error {
    public readonly name: string = 'Exception';
    public readonly template: string;

    public constructor(
        message: string,
        public readonly context: ExceptionContext,
        public readonly previous: Error | null,
    ) {
        super(exceptionMessage(message, context));
        this.template = message;
    }

    public toString(): string {
        return chain(this)
            .map(errorOutput)
            .join('\n\t- ');
    }
}

export function exception(
    message: string,
    context: ExceptionContext = {},
): Exception {
    return new Exception(message, context, null);
}

export function causedBy(
    previous: Error,
    message: string,
    context: ExceptionContext = {},
): Exception {
    return new Exception(message, context, previous);
}

export function rethrows(previous: Error, message: string, context: ExceptionContext = {}): never {
    throw new Exception(message, context, previous);
}

export function rethrow(
    message: string,
    context: ExceptionContext = {},
): (previous: Error) => never {
    return (error: Error): never => throws(causedBy(error, message, context));
}

export function isException<T>(value: Exception | T): value is Exception {
    return value instanceof Exception;
}

export function isNotException<T>(value: Exception | T): value is T {
    return !(
        value instanceof Exception
    );
}

export function chainStack(error: Error): string {
    return chain(error)
        .map(stack)
        .join('\nCaused by: ');
}

export function fault(error: Error): Error {
    const errors = chain(error);
    return errors[errors.length - 1];
}

function chain(error: Error): Error[] {
    if (isException(error) && error.previous !== null) {
        return [error as Error].concat(chain(error.previous));
    }
    return [error];
}
