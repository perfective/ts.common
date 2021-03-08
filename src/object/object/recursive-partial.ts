/**
 * @see https://stackoverflow.com/questions/41980195/recursive-partialt-in-typescript
 */
export type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        // eslint-disable-next-line @typescript-eslint/ban-types -- using object type for correct type determination
        : (T[P] extends object ? RecursivePartial<T[P]> : T[P]);
};
