export interface Tokens
    extends Record<string, string> {
}

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
 */
export function tokenKey(key: string): RegExp {
    return new RegExp(
        `\\{\\{${key.replace(/\$/gu, '\\$')}\\}\\}`,
        'gu',
    );
}
