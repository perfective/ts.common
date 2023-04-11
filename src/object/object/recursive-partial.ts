/**
 * A generic type that recursively marks all properties of a given type `T` as optional.
 *
 * @see Partial
 * @see https://stackoverflow.com/questions/41980195/recursive-partialt-in-typescript
 *
 * @since v0.3.0
 */
export type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        // eslint-disable-next-line @typescript-eslint/ban-types -- using object type for correct type determination
        : (T[P] extends object ? RecursivePartial<T[P]> : T[P]);
};
