import { tokenKey, Tokens, tokens as prepared } from './tokens';

/**
 * Represents a template with tokens that can be turned into a string.
 *
 * @since v0.3.0
 */
export interface Format {
    readonly template: string;
    readonly tokens: Tokens;
}

/**
 * Creates a {@link Format} record with the given `template` and `tokens`.
 *
 * @since v0.3.0
 */
export function format(template: string, tokens: Tokens | unknown[] = {}): Format {
    return {
        template,
        tokens: prepared(tokens),
    };
}

/**
 * Replaces {@link Format.tokens} in the {@link Format.template} and returns the resulting string.
 *
 * Each token is wrapped in the double curly braces.
 * For example, a template with a token `{{foo}}` will be replaced by the string value of the token `foo`.
 *
 * @since v0.3.0
 */
export function formatted(input: Format): string {
    return Object.entries(input.tokens)
        .reduce((formatted, [key, value]) => formatted.replace(
            tokenKey(key),
            value,
        ), input.template);
}
