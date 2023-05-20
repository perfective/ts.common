/**
 * Additional arbitrary data for an `Exception` that may be useful for logging or debugging.
 *
 * @since v0.2.0
 */
export interface ExceptionContext
    extends Record<string, unknown> {
}
