/**
 * A mapping between a token and its string value.
 *
 * @since v0.3.0
 */
export interface Tokens
    extends Record<string, string> {}

/**
 * Creates {@link Tokens} record from a given array of positional tokens,
 * where each token is an index of each value in the given array.
 *
 * If given a {@link Tokens} object returns the given object.
 *
 * @since v0.3.0
 */
export function tokens(tokens: unknown[] | Tokens): Tokens {
    if (Array.isArray(tokens)) {
        return tokens.reduce((tokens: Tokens, value: unknown, i: number): Tokens => {
            tokens[i.toString(10)] = String(value);
            return tokens;
        }, {});
    }
    return tokens;
}

/**
 * Creates a token RegExp from a key.
 *
 * @protected
 *
 * @since v0.3.0
 */
export function tokenKey(key: string): RegExp {
    // eslint-disable-next-line security/detect-non-literal-regexp -- TODO(https://github.com/perfective/ts.common/issues/52)
    return new RegExp(
        `\\{\\{${key.replace(/\$/gu, '\\$')}\\}\\}`,
        'gu',
    );
}
