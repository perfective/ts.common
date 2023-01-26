// eslint-disable-next-line max-classes-per-file -- Result, Success, and Failure are interdependent.
import { isError, isNotError } from '../../error/error/error';
import { Value, valueOf } from '../../function/function/nullary';
import { Unary } from '../../function/function/unary';
import { isDefined } from '../../value/value';

/**
 * A monadic type that represents a result of a function. It can be a successful value or an error value.
 *
 * @see Success
 * @see Failure
 */
export abstract class Result<T> {
    /**
     * Either an {@linkcode Error} for a Failure or any other value for Success.
     *
     * Success value may be an {@linkcode Error} as well.
     */
    public abstract readonly value: T | Error;

    /**
     * Applies a given {@linkcode flatMap} callback to the {@linkcode Result.value|value} property,
     * if the instance is a {@linkcode Success}.
     *
     * Ignores the {@linkcode flatMap} for the Failure.
     *
     * @returns The result of the {@linkcode flatMap}.
     */
    public abstract onto<U>(
        flatMap: (value: T) => Result<U>,
    ): Result<U>;

    /**
     * Applies a given {@linkcode mapValue} callback to the {@linkcode Success.value},
     * when the instance is a {@linkcode Success}.
     *
     * If given a {@linkcode mapError} callback,
     * applies it to the {@linkcode Failure.value} when the instance is a {@linkcode Failure}.
     */
    public abstract to<U>(
        mapValue: (value: T) => U,
        mapError?: (error: Error) => Error,
    ): Result<U>;

    /**
     * Applies a given {@linkcode reduce} callback to the {@linkcode Result.value|value} property.
     *
     * @returns The result of the {@linkcode reduce}.
     */
    public abstract into<U>(reduce: (value: T | Error) => U): U;

    /**
     * Applies a given {@linkcode reduceValue} callback to the {@linkcode Success.value} property.
     * Or applies a given {@linkcode reduceError} callback to the {@linkcode Error.value}.
     *
     * Returns the result of the {@linkcode reduceValue} for a {@linkcode Success}
     * or the result of the {@linkcode reduceError} for a {@linkcode Failure}.
     */
    public abstract into<U>(reduceValue: Unary<T, U>, reduceError: Unary<Error, U>): U;

    /**
     * Applies a given {@linkcode mapError} callback to the {@linkcode Failure.value},
     * when the instance is a {@linkcode Failure}.
     *
     * If the instance is a {@linkcode Success},
     * ignores the given {@linkcode mapError} callback
     * and returns itself.
     */
    public abstract failure(mapError: (error: Error) => Error): Result<T>;

    /**
     * Runs a given {@linkcode valueProcedure} callback with the {@linkcode Success.value}
     * when the instance is a {@linkcode Success}.
     * Runs a given {@linkcode errorProcedure} callback with the {@linkcode Failure.value}
     * when the instance is a {@linkcode Failure}.
     *
     * Returns the original {@linkcode Result} object.
     */
    public abstract run(valueProcedure: (value: T) => void, errorProcedure?: (error: Error) => void): Result<T>;
}

/**
 * An instance of the {@linkcode Result} that represents a successful value.
 */
export class Success<T> extends Result<T> {
    public constructor(
        public readonly value: T,
    ) {
        super();
    }

    /**
     * Applies a given {@linkcode flatMap} callback to the {@linkcode Success.value|value}.
     *
     * @returns The result of the {@linkcode flatMap}.
     */
    public override onto<U>(flatMap: (value: T) => Failure<U>): Failure<U>;

    /**
     * Applies a given {@linkcode flatMap} callback to the {@linkcode Success.value|value}.
     *
     * @returns The result of the {@linkcode flatMap}.
     */
    public override onto<U>(flatMap: (value: T) => Success<U>): Success<U>;

    /**
     * Applies a given {@linkcode flatMap} callback to the {@linkcode Success.value|value}.
     *
     * @returns The result of the {@linkcode flatMap}.
     */
    public override onto<U>(flatMap: (value: T) => Result<U>): Result<U>;

    /**
     * Applies a given {@linkcode flatMap} callback to the {@linkcode Success.value|value}.
     *
     * @returns The result of the {@linkcode flatMap}.
     */
    public override onto<U>(flatMap: (value: T) => Result<U>): Result<U> {
        return flatMap(this.value);
    }

    /**
     * Applies a given {@linkcode mapValue} callback to the {@linkcode Success.value}.
     * Ignores a given {@linkcode mapError} callback.
     *
     * Returns the result of the {@linkcode mapValue} call wrapped into a {@linkcode Success}.
     */
    public override to<U>(mapValue: (value: T) => U, mapError?: (error: Error) => Error): Success<U>;

    /**
     * Applies a given {@linkcode mapValue} callback to the {@linkcode Success.value}.
     *
     * Returns the result of the {@linkcode mapValue} call wrapped into a {@linkcode Success}.
     */
    public override to<U>(mapValue: (value: T) => U): Success<U> {
        return success(mapValue(this.value));
    }

    /**
     * Applies a given {@linkcode reduce} callback to the {@linkcode Success.value|value}.
     * Ignores the {@linkcode reduceError} callback.
     *
     * @returns The result of the {@linkcode reduce}.
     */
    public override into<U>(reduce: (value: T) => U, reduceError?: (value: Error) => U): U;

    /**
     * Applies a given {@linkcode reduce} callback to the {@linkcode Success.value|value}.
     *
     * @returns The result of the {@linkcode reduce}.
     */
    public override into<U>(reduce: (value: T) => U): U {
        return reduce(this.value);
    }

    /**
     * Ignores a given {@linkcode mapError} callback and returns itself.
     */
    public override failure(mapError: (error: Error) => Error): Success<T>;

    /**
     * Returns itself.
     */
    public override failure(): this {
        return this;
    }

    /**
     * Runs a given {@linkcode valueProcedure} callback with the {@linkcode Success.value}.
     * Ignores a given {@linkcode errorProcedure} callback.
     *
     * Returns itself.
     */
    public override run(valueProcedure: (value: T) => void, errorProcedure?: (error: Error) => void): Success<T>;

    /**
     * Runs a given {@linkcode valueProcedure} callback with the {@linkcode Success.value}.
     *
     * Returns itself.
     */
    public override run(valueProcedure: (value: T) => void): this {
        valueProcedure(this.value);
        return this;
    }
}

/**
 * An instance of the {@linkcode Result} that represents an error value.
 */
export class Failure<T> extends Result<T> {
    /**
     * Constructs a {@linkcode Failure} instance.
     *
     * @throws {TypeError} - If a passed {@linkcode Failure.value|value} is not an instance of an {Error}.
     */
    public constructor(
        public readonly value: Error,
    ) {
        super();
        if (isNotError(this.value)) {
            throw new TypeError('The value of `Failure` must be an instance of an `Error`');
        }
    }

    /**
     * Ignores a given {@linkcode flatMap} callback and returns itself.
     */
    public override onto<U>(flatMap: (value: T) => Result<U>): Failure<U>;

    /**
     * Returns itself.
     */
    public override onto<U>(): Result<U> {
        return this as unknown as Failure<U>;
    }

    /**
     * If given a {@linkcode mapError} callback,
     * applies it to the {@linkcode Failure.value}
     * and returns the result wrapped into a {@linkcode Failure}.
     * Returns itself, if a {@linkcode mapError} callback is omitted.
     *
     * Always ignores a given {@linkcode mapValue} callback.
     */
    public override to<U>(mapValue: (value: T) => U, mapError?: (error: Error) => Error): Failure<U> {
        if (isDefined(mapError)) {
            return failure(mapError(this.value));
        }
        return this as unknown as Failure<U>;
    }

    /**
     * Applies a given {@linkcode reduce} callback to the {@linkcode Failure.value} {@linkcode Error}.
     *
     * @returns The result of the {@linkcode reduce} call.
     */
    public override into<U>(reduce: (value: Error) => U): U;

    /**
     * Applies a given {@linkcode reduceError} callback to the {@linkcode Failure.value} {@linkcode Error}.
     * Ignores a given {@linkcode reduceValue} callback.
     *
     * @returns The result of the {@linkcode reduceError} call.
     */
    public override into<U>(reduceValue: Unary<T, U>, reduceError: Unary<Error, U>): U;

    /**
     * When a {@linkcode reduceError} callback is provided,
     * applies it to the {@linkcode Failure.value|value} {@linkcode Error}.
     * Otherwise applies a given {@linkcode reduce} callback to the {@linkcode Failure.value} {@linkcode Error}.
     *
     * @returns The result of the {@linkcode reduceError} or {@linkcode reduce} call.
     */
    public override into<U>(reduceValue: Unary<Error, U> | Unary<T, U>, reduceError?: Unary<Error, U>): U {
        if (isDefined(reduceError)) {
            return reduceError(this.value);
        }
        // When reduceError() argument is not defined, then it can only be a unary method signature.
        return (reduceValue as Unary<T | Error, U>)(this.value);
    }

    /**
     * Applies a given {@linkcode mapError} callback to the {@linkcode Failure.value}.
     *
     * Returns the result of the {@linkcode mapError} call wrapped into a `Failure`.
     */
    public override failure(mapError: (error: Error) => Error): Failure<T> {
        return failure(mapError(this.value));
    }

    /**
     * Runs a given {@linkcode errorProcedure} callback with the {@linkcode Failure.value}.
     * Ignores a given {@linkcode valueProcedure} callback.
     *
     * Returns itself.
     */
    public override run(valueProcedure: (value: T) => void, errorProcedure: (error: Error) => void): this {
        errorProcedure(this.value);
        return this;
    }
}

/**
 * Creates a {@linkcode Failure} from a given error value.
 *
 * Use the {@linkcode success} function if you need to return an {@linkcode Error} as a {@linkcode Success}.
 *
 * @see success()
 */
export function result<T>(value: Error): Failure<T>;

/**
 * Creates a {@linkcode Success} from a given non-error value.
 */
export function result<T>(value: T): Success<T>;

/**
 * Creates a {@linkcode Failure} if the {@linkcode value} is an {@linkcode Error}
 * or a {@linkcode Success} for non-error values.
 */
export function result<T>(value: T | Error): Result<T>;

/**
 * Creates a {@linkcode Failure} if the {@linkcode value} is an {@linkcode Error}
 * or a {@linkcode Success} for non-error values.
 */
export function result<T>(value: T | Error): Result<T> {
    if (isNotError<T>(value)) {
        return success<T>(value);
    }
    return failure<T>(value);
}

/**
 * Creates a function to transform a {@linkcode value} with a given {@linkcode map} callback
 * and return it as a {@linkcode Failure}.
 */
export function resultOf<T, U>(map: (value: T) => Error): Unary<T, Failure<U>>;

/**
 * Creates a function to transform a {@linkcode value} with a given {@linkcode map} callback
 * and return it as a {@linkcode Success}.
 */
export function resultOf<T, U>(map: (value: T) => U): Unary<T, Success<U>>;

/**
 * Creates a function to transform a {@linkcode value} with a given {@linkcode map} callback
 * and return it as a {@linkcode Result}.
 */
export function resultOf<T, U>(map: (value: T) => U | Error): Unary<T, Result<U>>;

/**
 * Creates a function to transform a {@linkcode value} with a given {@linkcode map} callback
 * and return it as a {@linkcode Result}.
 */
export function resultOf<T, U>(map: (value: T) => U | Error): Unary<T, Result<U>> {
    return (value: T): Result<U> => result<U>(map(value));
}

/**
 * Creates a {@linkcode Success} from a given value.
 */
export function success<T>(value: T): Success<T> {
    return new Success(value);
}

/**
 * Creates a function to transform a {@linkcode value} with a given {@linkcode map} callback
 * and return it as a {@linkcode Success}.
 */
export function successOf<T, U>(map: (value: T) => U): Unary<T, Success<U>> {
    return (value: T): Success<U> => success(map(value));
}

/**
 * Creates a {@linkcode Failure} from a given {@linkcode Error} value.
 *
 * @throws {TypeError} If a non-{@linkcode Error} value passed in runtime.
 */
export function failure<T>(error: Error): Failure<T> {
    return new Failure(error);
}

/**
 * Creates a function to transform an {@linkcode value} with a given {@linkcode map} callback
 * and return it as a {@linkcode Failure}.
 */
export function failureOf<T>(map: (value: T) => Error): Unary<T, Failure<T>> {
    return (value: T): Failure<T> => failure(map(value));
}

/**
 * Returns a given {@linkcode value} wrapped into a {@linkcode Success}.
 */
export function recovery<T>(fallback: Value<T>): Unary<T | Error, Success<T>> {
    return (value: T | Error): Success<T> => {
        if (isError(value)) {
            return success(valueOf(fallback));
        }
        return success(value);
    };
}
