export class Identity<T> {
    public constructor(
        public readonly value: T,
    ) {
    }

    public onto<U>(bind: (value: T) => Identity<U>): Identity<U> {
        return bind(this.value);
    }

    public to<U>(map: (value: T) => U): Identity<U> {
        return take(map(this.value));
    }

    public run(procedure: (value: T) => void): Identity<T> {
        procedure(this.value);
        return this;
    }
}

export function identity<T>(value: T): Identity<T> {
    return new Identity<T>(value);
}

export function take<T>(value: T): Identity<T> {
    return new Identity<T>(value);
}

export function isIdentity<I = unknown, T = unknown>(value: Identity<I> | T): value is Identity<I> {
    return value instanceof Identity;
}
