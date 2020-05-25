/**
 * Voidable() function allows to convert a `void`-able type into a `maybe`-acceptable type.
 *
 * The use of `void` is discouraged,
 * but some 3rd-party packages, like AWS SDK, may use it.
 *
 * @param value - Value to be casted as undefined when it's void.
 */
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export function voidable<T>(value: T | void): T | null | undefined {
    // eslint-disable-next-line no-void
    if (value === void 0) {
        return undefined;
    }
    return value;
}
