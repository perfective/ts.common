/**
 * A map of `Exception` tokens and their (string) values.
 *
 * @since v0.2.0
 */
export interface ExceptionTokens
    extends Record<string, string> {
}

/**
 * Creates a {@linkcode RegExp} to replace a given `token`.
 *
 * @since v0.2.0
 */
export function exceptionToken(token: string): RegExp {
    return new RegExp(
        `\\{\\{${token.replace(/\$/gu, '\\$')}\\}\\}`,
        'gu',
    );
}
