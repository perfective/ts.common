import { Output } from '../string/output';

export interface Tokens
    extends Record<string, Output> {
}

export function tokens(tokens: Output[] | Tokens): Tokens {
    if (Array.isArray(tokens)) {
        return tokens.reduce((tokens: Tokens, value: Output, i: number): Tokens => {
            tokens[i.toString(10)] = value;
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
