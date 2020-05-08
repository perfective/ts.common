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
}

export function identity<T>(value: T): Identity<T> {
    return new Identity<T>(value);
}

export function take<T>(value: T): Identity<T> {
    return new Identity<T>(value);
}
