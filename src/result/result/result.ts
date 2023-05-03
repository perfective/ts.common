// eslint-disable-next-line max-classes-per-file -- Result, Success, and Failure are interdependent.
import { Predicate } from '../../boolean/predicate/predicate';
import { Proposition } from '../../boolean/proposition/proposition';
import { isError, isNotError } from '../../error/error/error';
import { exception, unknownError } from '../../error/exception/exception';
import { Nullary, Value, valueOf } from '../../function/function/nullary';
import { Unary, UnaryVoid } from '../../function/function/unary';
import { TypeGuard } from '../../value/type-guard/type-guard';
import { defined, isDefined } from '../../value/value';

import { BiFoldResult, BiMapResult, BiVoidResult } from './arguments';

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
     * If the instance is a {@linkcode Success},
     * applies the first callback of a given {@linkcode maps} pair to the {@linkcode Success.value}
     * and returns its result wrapped into a {@linkcode Success}.
     *
     * Otherwise, applies the second callback of a given {@linkcode maps} pair to the {@linkcode Failure.value}
     * and returns its result wrapped into a {@linkcode Failure}.
     *
     * @since v0.9.0
     */
    public abstract to<U>(maps: BiMapResult<T, U>): Result<U>;

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
     * If the instance is a {@linkcode Success},
     * applies the first callback of a given {@linkcode fold} pair to the {@linkcode Success.value}
     * and returns the result.
     *
     * If the instance is a {@linkcode Failure},
     * applies the second callback of a given {@linkcode fold} pair to the {@linkcode Failure.value}
     * and returns the result.
     *
     * @since v0.9.0
     */
    public abstract into<U>(fold: BiFoldResult<T, U>): U;

    /**
     * When the instance is a {@linkcode Success},
     * returns itself if the {@linkcode Success.value} satisfies a given {@linkcode filter}.
     * Otherwise, returns a {@linkcode Failure} with a given {@linkcode error}.
     *
     * When the instance is a {@linkcode Failure}, returns itself.
     *
     * @since v0.10.0
     */
    public abstract that(filter: Predicate<T>, error: Value<Error>): Result<T>;

    /**
     * When the instance is a {@linkcode Success},
     * returns itself if the {@linkcode Success.value} satisfies a given {@linkcode filter}.
     * Otherwise, returns a {@linkcode Failure} with an {@linkcode Exception} with a given {@linkcode message}
     * and the {@linkcode Success.value} as a message `{{value}}` token and context property.
     *
     * When the instance is a {@linkcode Failure}, returns itself.
     *
     * @since v0.10.0
     */
    public abstract that(filter: Predicate<T>, message: Value<string>): Result<T>;

    /**
     * When the instance is a {@linkcode Success},
     * returns itself with the type narrowed down by the {@linkcode typeGuard},
     * if the {@linkcode Success.value|value} satisfies a given {@linkcode typeGuard}.
     * Otherwise, returns a {@linkcode Failure} with a given {@linkcode error}.
     *
     * When the instance is a {@linkcode Failure}, returns itself.
     *
     * @since v0.10.0
     */
    public abstract which<U extends T>(typeGuard: TypeGuard<T, U>, error: Value<Error>): Result<U>;

    /**
     * When the instance is a {@linkcode Success},
     * returns itself with the type narrowed down by the {@linkcode typeGuard},
     * if the {@linkcode Success.value|value} satisfies a given {@linkcode typeGuard}
     * Otherwise, returns a {@linkcode Failure} with an {@linkcode Exception} created with a given {@linkcode message}
     * and the {@linkcode Success.value} as a message `{{value}}` token and context property.
     *
     * When the instance is a {@linkcode Failure}, returns itself.
     *
     * @since v0.10.0
     */
    public abstract which<U extends T>(typeGuard: TypeGuard<T, U>, message: Value<string>): Result<U>;

    /**
     * When the instance is a {@linkcode Success},
     * returns itself if the {@linkcode condition} is `true`.
     * Otherwise, returns a {@linkcode Failure} with a given {@linkcode error}.
     *
     * When the instance is a {@linkcode Failure}, returns itself.
     *
     * @since v0.10.0
     */
    public abstract when(condition: Proposition, error: Value<Error>): Result<T>;

    /**
     * When the instance is a {@linkcode Success},
     * returns itself if the {@linkcode condition} is `true`.
     * Otherwise, returns a {@linkcode Failure} with an {@linkcode Exception} created with a given {@linkcode message}.
     *
     * When the instance is a {@linkcode Failure}, returns itself.
     *
     * @since v0.10.0
     */
    public abstract when(condition: Proposition, message: Value<string>): Result<T>;

    /**
     * Executes a given {@linkcode valueProcedure} callback with the {@linkcode Success.value}
     * when the instance is a {@linkcode Success}.
     * Executes a given {@linkcode errorProcedure} callback with the {@linkcode Failure.value}
     * when the instance is a {@linkcode Failure}.
     *
     * Returns the original {@linkcode Result} object.
     *
     * @since v0.9.0
     */
    public abstract through(valueProcedure: UnaryVoid<T>, errorProcedure?: UnaryVoid<Error>): this;

    /**
     * If the instance is a {@linkcode Success},
     * executes the first callback of a given {@linkcode procedures} pair with the {@linkcode Success.value}.
     *
     * If the instance is a {@linkcode Failure},
     * executes the second callback of a given {@linkcode procedures} pair with the {@linkcode Failure.value}.
     *
     * Returns the original {@linkcode Result} object.
     *
     * @since v0.9.0
     */
    public abstract through(procedures: BiVoidResult<T>): this;
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
     * Applies a given {@linkcode mapValue} callback to the {@linkcode Success.value}.
     * Ignores a given {@linkcode mapError} callback.
     *
     * Returns the result of the {@linkcode mapValue} call wrapped into a {@linkcode Success}.
     *
     * @since v0.9.0
     */
    public override to<U>(mapValue: Unary<T, U>, mapError?: Unary<Error, Error>): Success<U>;

    /**
     * Applies the first callback of a given {@linkcode maps} pair to the {@linkcode Success.value}
     * and returns its result wrapped into a {@linkcode Success}.
     *
     * @since v0.9.0
     */
    public override to<U>(maps: BiMapResult<T, U>): Success<U>;

    public override to<U>(first: Unary<T, U> | BiMapResult<T, U>): Success<U> {
        const mapValue = Array.isArray(first) ? first[0] : first;
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
    public override into<U>(reduceValue: Unary<T, U>, reduceError?: Unary<Error, U>): U;

    /**
     * Applies the first callback of a given {@linkcode fold} pair to the {@linkcode Success.value}
     * and returns the result.
     *
     * @since v0.9.0
     */
    public override into<U>(fold: BiFoldResult<T, U>): U;

    public override into<U>(first: Unary<T, U> | BiFoldResult<T, U>): U {
        const reduce = Array.isArray(first) ? first[0] : first;
        return reduce(this.value);
    }

    /**
     * If the {@linkcode Success.value|value} satisfies a given {@linkcode filter} returns itself.
     * Otherwise, returns a {@linkcode Failure} with a given {@linkcode error}.
     *
     * @since v0.10.0
     */
    public override that(filter: Predicate<T>, error: Value<Error>): Result<T>;

    /**
     * If the {@linkcode Success.value|value} satisfies a given {@linkcode filter} returns itself.
     * Otherwise, returns a {@linkcode Failure} with an {@linkcode Exception} created with a given {@linkcode message}
     * and the {@linkcode Success.value} as a message `{{value}}` token and context property.
     *
     * @since v0.10.0
     */
    public override that(filter: Predicate<T>, message: Value<string>): Result<T>;

    public override that(first: Predicate<T>, second: Value<Error> | Value<string>): this | Failure<T> {
        if (first(this.value)) {
            return this;
        }
        const error = valueOf(second);
        if (isError(error)) {
            return failure(error);
        }
        return failure(exception(error, {
            value: String(this.value),
        }, {
            value: this.value,
        }));
    }

    /**
     * If the {@linkcode Success.value|value} satisfies a given {@linkcode typeGuard}
     * returns itself but with the type narrowed down by the {@linkcode typeGuard}.
     * Otherwise, returns a {@linkcode Failure} with a given {@linkcode error}.
     *
     * @since v0.10.0
     */
    public override which<U extends T>(typeGuard: TypeGuard<T, U>, error: Value<Error>): Result<U>;

    /**
     * If the {@linkcode Success.value|value} satisfies a given {@linkcode typeGuard}
     * returns itself but with the type narrowed down by the {@linkcode typeGuard}.
     * Otherwise, returns a {@linkcode Failure} with an {@linkcode Exception} created with a given {@linkcode message}
     * and the {@linkcode Success.value} as a message `{{value}}` token and context property.
     *
     * @since v0.10.0
     */
    public override which<U extends T>(typeGuard: TypeGuard<T, U>, message: Value<string>): Result<U>;

    public override which<U extends T>(first: TypeGuard<T, U>, second: Value<Error> | Value<string>): Result<U> {
        if (first(this.value)) {
            // When condition is true, this.value is of type U extends T.
            // Return it as is instead of passing it through just(this.value).
            return this as unknown as Result<U>;
        }
        const error = valueOf(second);
        if (isError(error)) {
            return failure(error);
        }
        return failure(exception(error, {
            value: String(this.value),
        }, {
            value: this.value,
        }));
    }

    /**
     * If the {@linkcode condition} is `true`, returns itself.
     * Otherwise, returns a {@linkcode Failure} with a given {@linkcode error}.
     *
     * @since v0.10.0
     */
    public override when(condition: Proposition, error: Value<Error>): Result<T>;

    /**
     * If the {@linkcode condition} is `true`, returns itself.
     * Otherwise, returns a {@linkcode Failure} with an {@linkcode Exception} created with a given {@linkcode message}.
     *
     * @since v0.10.0
     */
    public override when(condition: Proposition, message: Value<string>): Result<T>;

    public override when(first: Proposition, second: Value<Error> | Value<string>): Result<T> {
        if (valueOf(first)) {
            return this;
        }
        const error = valueOf(second);
        if (isError(error)) {
            return failure(error);
        }
        return failure(exception(error));
    }

    /**
     * Executes a given {@linkcode valueProcedure} callback with the {@linkcode Success.value}.
     * Ignores a given {@linkcode errorProcedure} callback.
     *
     * Returns the original {@linkcode Success} object.
     *
     * @since v0.9.0
     */
    public override through(valueProcedure: UnaryVoid<T>, errorProcedure?: UnaryVoid<Error>): this;

    /**
     * Executes the first callback of a given {@linkcode procedures} pair with the {@linkcode Success.value}.
     * Returns the original {@linkcode Success} object.
     *
     * @since v0.9.0
     */
    public override through(procedures: BiVoidResult<T>): this;

    public override through(first: UnaryVoid<T> | BiVoidResult<T>): this {
        const procedure = Array.isArray(first) ? first[0] : first;
        procedure(this.value);
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

    /**
     * Applies the second callback of a given {@linkcode maps} pair to the {@linkcode Failure.value}
     * and returns its result wrapped into a {@linkcode Failure}.
     *
     * @since v0.9.0
     */
    public override to<U>(maps: BiMapResult<T, U>): Failure<U>;

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
     * Applies a given {@linkcode reduceError} callback to the {@linkcode Failure.value} {@linkcode Error}.
     * Ignores a given {@linkcode reduceValue} callback.
     *
     * @returns The result of the {@linkcode reduceError} call.
     *
     * @since v0.9.0
     */
    public override into<U>(reduceValue: Unary<T, U>, reduceError: Unary<Error, U>): U;

    /**
     * Applies the second callback of a given {@linkcode fold} pair to the {@linkcode Failure.value}
     * and returns the result.
     *
     * @since v0.9.0
     */
    public override into<U>(fold: BiFoldResult<T, U>): U;

    public override into<U>(
        first: Unary<T, U> | BiFoldResult<T, U>,
        second?: Unary<Error, U>,
    ): U {
        const reduceError = Array.isArray(first) ? first[1] : defined(second);
        return reduceError(this.value);
    }

    /**
     * Ignores both arguments and returns itself.
     *
     * @since v0.10.0
     */
    public override that(filter: Predicate<T>, error: Value<Error>): Failure<T>;

    /**
     * Ignores both arguments and returns itself.
     *
     * @since v0.10.0
     */
    public override that(filter: Predicate<T>, message: Value<string>): Failure<T>;

    public override that(): this {
        return this;
    }

    /**
     * Ignores both arguments and returns itself.
     *
     * @since v0.10.0
     */
    public override which<U extends T>(typeGuard: TypeGuard<T, U>, error: Value<Error>): Failure<U>;

    /**
     * Ignores both arguments and returns itself.
     *
     * @since v0.10.0
     */
    public override which<U extends T>(typeGuard: TypeGuard<T, U>, message: Value<string>): Failure<U>;

    public override which(): this {
        return this;
    }

    /**
     * Ignores both arguments and returns itself.
     *
     * @since v0.10.0
     */
    public override when(condition: Proposition, error: Value<Error>): Failure<T>;

    /**
     * Ignores both arguments and returns itself.
     *
     * @since v0.10.0
     */
    public override when(condition: Proposition, message: Value<string>): Failure<T>;

    public override when(): this {
        return this;
    }

    /**
     * Executes a given {@linkcode errorProcedure} callback with the {@linkcode Failure.value}.
     * Ignores a given {@linkcode valueProcedure} callback.
     *
     * Returns itself.
     *
     * @since v0.9.0
     */
    public override through(valueProcedure: UnaryVoid<T>, errorProcedure: UnaryVoid<Error>): this;

    /**
     * Executes the second callback of a given {@linkcode procedures} pair with the {@linkcode Failure.value}.
     *
     * Returns the original {@linkcode Failure} object.
     *
     * @since v0.9.0
     */
    public override through(procedures: BiVoidResult<T>): this;

    public override through(
        first: UnaryVoid<T> | BiVoidResult<T>,
        second?: UnaryVoid<Error>,
    ): this {
        // If the first argument is not an array, then the second argument must be present due to the method signature.
        const procedure = Array.isArray(first) ? first[1] : defined(second);
        procedure(this.value);
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
 * Returns a pair of unary callbacks to fold a given value into a {@linkcode Success}.
 *
 * The first callback returns a given value as a {@linkcode Success}.
 * The second callback ignores a given value
 * and returns a given {@linkcode fallback} value as a {@linkcode Success}.
 *
 * Use this function with the {@linkcode Result.into} method to recover from a {@linkcode Failure}.
 *
 * @since v0.9.0
 */
export function recovery<T>(fallback: Value<T>): BiFoldResult<T, Success<T>> {
    return [success, (): Success<T> => success(valueOf(fallback))];
}

/**
 * Returns true if a given value is a {@linkcode Result}.
 *
 * @since v0.9.0
 */
export function isResult<T, U>(value: Result<T> | U): value is Result<T> {
    return value instanceof Result;
}

/**
 * Returns true if a given value is not a {@linkcode Result}.
 *
 * @since v0.9.0
 */
export function isNotResult<T, U>(value: Result<T> | U): value is U {
    return !(value instanceof Result);
}

/**
 * Returns true if a given value is a {@linkcode Success}.
 *
 * @since v0.9.0
 */
export function isSuccess<T, U>(value: Success<T> | U): value is Success<T> {
    return value instanceof Success;
}

/**
 * Returns true if a given value is not a {@linkcode Success}.
 *
 * @since v0.9.0
 */
export function isNotSuccess<T, U>(value: Success<T> | U): value is U {
    return !(value instanceof Success);
}

/**
 * Returns true if a given value is a {@linkcode Failure}.
 *
 * @since v0.9.0
 */
export function isFailure<T, U>(value: Failure<T> | U): value is Failure<T> {
    return value instanceof Failure;
}

/**
 * Returns true if a given value is not a {@linkcode Failure}.
 *
 * @since v0.9.0
 */
export function isNotFailure<T, U>(value: Failure<T> | U): value is U {
    return !(value instanceof Failure);
}
