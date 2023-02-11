// eslint-disable-next-line max-classes-per-file -- Result, Success, and Failure are interdependent.
import { isError, isNotError } from '../../error/error/error';
import { unknownError } from '../../error/exception/exception';
import { Nullary, Value, valueOf } from '../../function/function/nullary';
import { Unary } from '../../function/function/unary';
import { isDefined } from '../../value/value';

import { BiMapResult } from './bimap';

/**
 * A monadic type that represents a result of a function. It can be a successful value or an error value.
 *
 * @see Success
 * @see Failure
 *
 * @since v0.9.0
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
     *
     * @since v0.9.0
     */
    public abstract onto<U>(
        flatMap: (value: T) => Result<U>,
    ): Result<U>;

    /**
     * If the instance is a {@linkcode Success},
     * applies the first callback of a given {@linkcode biMap} pair to the {@linkcode Success.value}
     * and returns its result wrapped into a {@linkcode Success}.
     *
     * Otherwise, applies the second callback of a given {@linkcode biMap} pair to the {@linkcode Failure.value}
     * and returns its result wrapped into a {@linkcode Failure}.
     *
     * @since v0.9.0
     */
    public abstract to<U>(biMap: BiMapResult<T, U>): Result<U>;

    /**
     * Applies a given {@linkcode mapValue} callback to the {@linkcode Success.value},
     * when the instance is a {@linkcode Success}.
     *
     * If given a {@linkcode mapError} callback,
     * applies it to the {@linkcode Failure.value} when the instance is a {@linkcode Failure}.
     *
     * @since v0.9.0
     */
    public abstract to<U>(mapValue: Unary<T, U>, mapError?: Unary<Error, Error>): Result<U>;

    /**
     * Applies a given {@linkcode reduce} callback to the {@linkcode Result.value|value} property.
     *
     * @returns The result of the {@linkcode reduce}.
     *
     * @since v0.9.0
     */
    public abstract into<U>(reduce: (value: T | Error) => U): U;

    /**
     * Applies a given {@linkcode reduceValue} callback to the {@linkcode Success.value} property.
     * Or applies a given {@linkcode reduceError} callback to the {@linkcode Error.value}.
     *
     * Returns the result of the {@linkcode reduceValue} for a {@linkcode Success}
     * or the result of the {@linkcode reduceError} for a {@linkcode Failure}.
     *
     * @since v0.9.0
     */
    public abstract into<U>(reduceValue: Unary<T, U>, reduceError: Unary<Error, U>): U;

    /**
     * Applies a given {@linkcode mapError} callback to the {@linkcode Failure.value},
     * when the instance is a {@linkcode Failure}.
     *
     * If the instance is a {@linkcode Success},
     * ignores the given {@linkcode mapError} callback
     * and returns itself.
     *
     * @since v0.9.0
     */
    public abstract failure(mapError: (error: Error) => Error): Result<T>;

    /**
     * Runs a given {@linkcode valueProcedure} callback with the {@linkcode Success.value}
     * when the instance is a {@linkcode Success}.
     * Runs a given {@linkcode errorProcedure} callback with the {@linkcode Failure.value}
     * when the instance is a {@linkcode Failure}.
     *
     * Returns the original {@linkcode Result} object.
     *
     * @since v0.9.0
     */
    public abstract run(valueProcedure: (value: T) => void, errorProcedure?: (error: Error) => void): Result<T>;
}

/**
 * An instance of the {@linkcode Result} that represents a successful value.
 *
 * @since v0.9.0
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
     *
     * @since v0.9.0
     */
    public override onto<U>(flatMap: (value: T) => Failure<U>): Failure<U>;

    /**
     * Applies a given {@linkcode flatMap} callback to the {@linkcode Success.value|value}.
     *
     * @returns The result of the {@linkcode flatMap}.
     *
     * @since v0.9.0
     */
    public override onto<U>(flatMap: (value: T) => Success<U>): Success<U>;

    /**
     * Applies a given {@linkcode flatMap} callback to the {@linkcode Success.value|value}.
     *
     * @returns The result of the {@linkcode flatMap}.
     *
     * @since v0.9.0
     */
    public override onto<U>(flatMap: (value: T) => Result<U>): Result<U>;

    /**
     * Applies a given {@linkcode flatMap} callback to the {@linkcode Success.value|value}.
     *
     * @returns The result of the {@linkcode flatMap}.
     *
     * @since v0.9.0
     */
    public override onto<U>(flatMap: (value: T) => Result<U>): Result<U> {
        return flatMap(this.value);
    }

    /**
     * Applies the first callback of a given {@linkcode biMap} pair to the {@linkcode Success.value}
     * and returns its result wrapped into a {@linkcode Success}.
     *
     * @since v0.9.0
     */
    public override to<U>(biMap: BiMapResult<T, U>): Success<U>;

    /**
     * Applies a given {@linkcode mapValue} callback to the {@linkcode Success.value}.
     * Ignores a given {@linkcode mapError} callback.
     *
     * Returns the result of the {@linkcode mapValue} call wrapped into a {@linkcode Success}.
     *
     * @since v0.9.0
     */
    public override to<U>(mapValue: Unary<T, U>, mapError?: Unary<Error, Error>): Success<U>;

    public override to<U>(args: Unary<T, U> | BiMapResult<T, U>): Success<U> {
        const mapValue = Array.isArray(args) ? args[0] : args;
        return success(mapValue(this.value));
    }

    /**
     * Applies a given {@linkcode reduce} callback to the {@linkcode Success.value|value}.
     * Ignores the {@linkcode reduceError} callback.
     *
     * @returns The result of the {@linkcode reduce}.
     *
     * @since v0.9.0
     */
    public override into<U>(reduce: (value: T) => U, reduceError?: (value: Error) => U): U;

    /**
     * Applies a given {@linkcode reduce} callback to the {@linkcode Success.value|value}.
     *
     * @returns The result of the {@linkcode reduce}.
     *
     * @since v0.9.0
     */
    public override into<U>(reduce: (value: T) => U): U {
        return reduce(this.value);
    }

    /**
     * Ignores a given {@linkcode mapError} callback and returns itself.
     *
     * @since v0.9.0
     */
    public override failure(mapError: (error: Error) => Error): Success<T>;

    /**
     * Returns itself.
     *
     * @since v0.9.0
     */
    public override failure(): this {
        return this;
    }

    /**
     * Runs a given {@linkcode valueProcedure} callback with the {@linkcode Success.value}.
     * Ignores a given {@linkcode errorProcedure} callback.
     *
     * Returns itself.
     *
     * @since v0.9.0
     */
    public override run(valueProcedure: (value: T) => void, errorProcedure?: (error: Error) => void): Success<T>;

    /**
     * Runs a given {@linkcode valueProcedure} callback with the {@linkcode Success.value}.
     *
     * Returns itself.
     *
     * @since v0.9.0
     */
    public override run(valueProcedure: (value: T) => void): this {
        valueProcedure(this.value);
        return this;
    }
}

/**
 * An instance of the {@linkcode Result} that represents an error value.
 *
 * @since v0.9.0
 */
export class Failure<T> extends Result<T> {
    /**
     * Constructs a {@linkcode Failure} instance.
     *
     * @throws {TypeError} - If a passed {@linkcode Failure.value|value} is not an instance of an {Error}.
     *
     * @since v0.9.0
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
     *
     * @since v0.9.0
     */
    public override onto<U>(flatMap: (value: T) => Result<U>): Failure<U>;

    /**
     * Returns itself.
     *
     * @since v0.9.0
     */
    public override onto<U>(): Result<U> {
        return this as unknown as Failure<U>;
    }

    /**
     * Applies the second callback of a given {@linkcode BiMapResult} pair to the {@linkcode Failure.value}
     * and returns its result wrapped into a {@linkcode Failure}.
     *
     * @since v0.9.0
     */
    public override to<U>(biMap: BiMapResult<T, U>): Failure<U>;

    /**
     * If given a {@linkcode mapError} callback,
     * applies it to the {@linkcode Failure.value}
     * and returns the result wrapped into a {@linkcode Failure}.
     * Returns itself, if a {@linkcode mapError} callback is omitted.
     *
     * Always ignores a given {@linkcode mapValue} callback.
     *
     * @since v0.9.0
     */
    public override to<U>(mapValue: Unary<T, U>, mapError?: Unary<Error, Error>): Failure<U>;

    public override to<U>(
        first: Unary<T, U> | BiMapResult<T, U>,
        second?: Unary<Error, Error>,
    ): Failure<U> {
        const mapError = Array.isArray(first) ? first[1] : second;
        if (isDefined(mapError)) {
            return failure(mapError(this.value));
        }
        return this as unknown as Failure<U>;
    }

    /**
     * Applies a given {@linkcode reduce} callback to the {@linkcode Failure.value} {@linkcode Error}.
     *
     * @returns The result of the {@linkcode reduce} call.
     *
     * @since v0.9.0
     */
    public override into<U>(reduce: (value: Error) => U): U;

    /**
     * Applies a given {@linkcode reduceError} callback to the {@linkcode Failure.value} {@linkcode Error}.
     * Ignores a given {@linkcode reduceValue} callback.
     *
     * @returns The result of the {@linkcode reduceError} call.
     *
     * @since v0.9.0
     */
    public override into<U>(reduceValue: Unary<T, U>, reduceError: Unary<Error, U>): U;

    /**
     * When a {@linkcode reduceError} callback is provided,
     * applies it to the {@linkcode Failure.value|value} {@linkcode Error}.
     * Otherwise applies a given {@linkcode reduce} callback to the {@linkcode Failure.value} {@linkcode Error}.
     *
     * @returns The result of the {@linkcode reduceError} or {@linkcode reduce} call.
     *
     * @since v0.9.0
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
     *
     * @since v0.9.0
     */
    public override failure(mapError: (error: Error) => Error): Failure<T> {
        return failure(mapError(this.value));
    }

    /**
     * Runs a given {@linkcode errorProcedure} callback with the {@linkcode Failure.value}.
     * Ignores a given {@linkcode valueProcedure} callback.
     *
     * Returns itself.
     *
     * @since v0.9.0
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
 *
 * @since v0.9.0
 */
export function result<T>(value: Error): Failure<T>;

/**
 * Creates a {@linkcode Success} from a given non-error value.
 *
 * @since v0.9.0
 */
export function result<T>(value: T): Success<T>;

/**
 * Creates a {@linkcode Failure} if the {@linkcode value} is an {@linkcode Error}
 * or a {@linkcode Success} for non-error values.
 *
 * @since v0.9.0
 */
export function result<T>(value: T | Error): Result<T>;

/**
 * Creates a {@linkcode Failure} if the {@linkcode value} is an {@linkcode Error}
 * or a {@linkcode Success} for non-error values.
 *
 * @since v0.9.0
 */
export function result<T>(value: T | Error): Result<T> {
    if (isNotError<T>(value)) {
        return success<T>(value);
    }
    return failure<T>(value);
}

/**
 * Calls a given {@linkcode callback} in a try-catch block.
 *
 * If the {@linkcode callback} call throws an error,
 * catches that error and returns it as a {@linkcode Failure}.
 * Otherwise, returns a result of the {@linkcode callback} wrapped into a {@linkcode Success}.
 *
 * Use this function to wrap up legacy functions that throw errors into a {@linkcode Result}.
 *
 * @since v0.9.0
 */
export function resultOf<T>(callback: Nullary<T>): Result<T> {
    try {
        return success(callback());
    }
    catch (error: unknown) {
        return failure(unknownError(error));
    }
}

/**
 * Creates a function to transform a {@linkcode value} with a given {@linkcode map} callback
 * and return it as a {@linkcode Failure}.
 *
 * @since v0.9.0
 */
export function resultFrom<T, U>(map: (value: T) => Error): Unary<T, Failure<U>>;

/**
 * Creates a function to transform a {@linkcode value} with a given {@linkcode map} callback
 * and return it as a {@linkcode Success}.
 *
 * @since v0.9.0
 */
export function resultFrom<T, U>(map: (value: T) => U): Unary<T, Success<U>>;

/**
 * Creates a function to transform a {@linkcode value} with a given {@linkcode map} callback
 * and return it as a {@linkcode Result}.
 *
 * @since v0.9.0
 */
export function resultFrom<T, U>(map: (value: T) => U | Error): Unary<T, Result<U>>;

/**
 * Creates a function to transform a {@linkcode value} with a given {@linkcode map} callback
 * and return it as a {@linkcode Result}.
 *
 * @since v0.9.0
 */
export function resultFrom<T, U>(map: (value: T) => U | Error): Unary<T, Result<U>> {
    return (value: T): Result<U> => result<U>(map(value));
}

/**
 * Creates a {@linkcode Success} from a given value.
 *
 * @since v0.9.0
 */
export function success<T>(value: T): Success<T> {
    return new Success(value);
}

/**
 * Creates a function to transform a {@linkcode value} with a given {@linkcode map} callback
 * and return it as a {@linkcode Success}.
 *
 * @since v0.9.0
 */
export function successFrom<T, U>(map: (value: T) => U): Unary<T, Success<U>> {
    return (value: T): Success<U> => success(map(value));
}

/**
 * Creates a {@linkcode Failure} from a given {@linkcode Error} value.
 *
 * @throws {TypeError} If a non-{@linkcode Error} value passed in runtime.
 *
 * @since v0.9.0
 */
export function failure<T>(error: Error): Failure<T> {
    return new Failure(error);
}

/**
 * Creates a function to transform an {@linkcode value} with a given {@linkcode map} callback
 * and return it as a {@linkcode Failure}.
 *
 * @since v0.9.0
 */
export function failureFrom<T>(map: (value: T) => Error): Unary<T, Failure<T>> {
    return (value: T): Failure<T> => failure(map(value));
}

/**
 * Returns a given {@linkcode value} wrapped into a {@linkcode Success}.
 *
 * @since v0.9.0
 */
export function recovery<T>(fallback: Value<T>): Unary<T | Error, Success<T>> {
    return (value: T | Error): Success<T> => {
        if (isError(value)) {
            return success(valueOf(fallback));
        }
        return success(value);
    };
}
