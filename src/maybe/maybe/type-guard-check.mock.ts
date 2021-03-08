export interface TypeGuardCheck<T = number> {
    readonly required: T;
    readonly optional?: T;
    readonly option: T | undefined;
    readonly nullable: T | null;
    readonly maybe: T | null | undefined;
    readonly possible?: T | null | undefined;
}

export const typeGuardCheck: TypeGuardCheck = {
    required: 3.14,
    option: undefined,
    nullable: 0,
    maybe: 2.71,
    possible: null,
};
