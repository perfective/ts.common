/**
 * Voidable() function allows to convert a `void`-able type into a `maybe`-acceptable type.
 *
 * The use of `void` is discouraged,
 * but some 3rd-party packages, like AWS SDK, may use it.
 *
 * @param value - Value to be casted as undefined when it's void.
 */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-void */
export function voidable<T>(value: T | void): T | null | undefined {
    if (value === void 0) {
        return undefined;
    }
    return value;
}
