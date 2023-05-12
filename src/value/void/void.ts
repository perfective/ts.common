/**
 * A value that is either of type T or is `void`.
 *
 * The use of `void` is discouraged,
 * but some 3rd-party packages, like AWS SDK, may use it.
 *
 * @since v0.9.0
 */
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type -- special function to handle "void"
export type Voidable<T> = T | void;

/**
 * Casts a given {@linkcode Voidable} value into an optional nullable type.
 *
 * Use this function only if you have a 3rd-party package that returns `void`.
 */
export function voidable<T>(value: Voidable<T>): T | null | undefined {
    // eslint-disable-next-line no-void -- checking for `undefined` to remove `void` from the value type.
    if (value === void 0) {
        return undefined;
    }
    return value;
}
