/**
 * A map of `Exception` tokens and their (string) values.
 *
 * @since v0.2.0
 */
export interface ExceptionTokens
    extends Record<string, string> {}

/**
 * Creates a {@linkcode RegExp} to replace a given `token`.
 *
 * @since v0.2.0
 */
export function exceptionToken(token: string): RegExp {
    // eslint-disable-next-line security/detect-non-literal-regexp -- TODO(https://github.com/perfective/ts.common/issues/52)
    return new RegExp(
        `\\{\\{${token.replace(/\$/gu, '\\$')}\\}\\}`,
        'gu',
    );
}
