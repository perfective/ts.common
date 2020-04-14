export type Unary<T, U> = (value: T) => U;
export type Bind<T, U> = Unary<T, Identity<U>> | Unary<T, U>;

export class Identity<T> {
    public constructor(
        public readonly value: T,
    ) {
    }

    public then<U>(next: Bind<T, U>): Identity<U> {
        return identityOf(next(this.value));
    }
}

export function take<T>(value: T): Identity<T> {
    return new Identity<T>(value);
}

/**
 * @package
 */
export function identityOf<T>(value: Identity<T> | T): Identity<T> {
    if (value instanceof Identity) {
        return value;
    }
    return take(value);
}
