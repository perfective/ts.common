// eslint-disable-next-line max-classes-per-file -- Result, Success, and Failure are interdependent.
import { isError, isNotError } from '../../error/error/error';
import { Value, valueOf } from '../../function/function/nullary';
import { Unary } from '../../function/function/unary';

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
     * Applies a given {@linkcode map} callback to the {@linkcode Result#value|value} property,
     * when the instance is a {@linkcode Success}.
     */
    public abstract to<U>(
        map: (value: T) => U,
    ): Result<U>;
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
     * Applies a given {@linkcode map} callback to the {@linkcode Success.value|value}.
     *
     * Returns the result of the {@linkcode map} wrapped into {@linkcode Success}.
     */
    public override to<U>(map: (value: T) => U): Success<U> {
        return success(map(this.value));
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
     * Ignores a given {@linkcode map} callback and returns itself.
     */
    public override to<U>(map: (value: T) => U): Failure<U>;

    /**
     * Returns itself.
     */
    public override to<U>(): Failure<U> {
        return this as unknown as Failure<U>;
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
 * Creates a {@linkcode Success} from a given value.
 */
export function success<T>(value: T): Success<T> {
    return new Success(value);
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
