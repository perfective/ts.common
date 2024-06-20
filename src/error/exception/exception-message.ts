import { exceptionToken, ExceptionTokens } from './exception-tokens';

/**
 * A tokenized exception message.
 *
 * @since v0.2.0
 */
export interface ExceptionMessage {
    /**
     * A template of the error message.
     * May contain tokens wrapped in double curly braces (i.e. {{ }}).
     * Token values should be provided in the {@linkcode ExceptionMessage.tokens} property.
     *
     * @example 'Invalid user id {{uid}}'
     */
    readonly template: string;

    /**
     * A map of tokens used in the {@linkcode ExceptionMessage.template} and their (string) values.
     */
    readonly tokens: ExceptionTokens;
}

/**
 * Creates an {@linkcode ExceptionMessage} with a given `template` and optional `tokens`.
 *
 * @since v0.2.0
 */
export function exceptionMessage(template: string, tokens: ExceptionTokens = {}): ExceptionMessage {
    return {
        template,
        tokens,
    };
}

/**
 * Inlines tokens into the template of a given {@linkcode ExceptionMessage}.
 * Returns the final string.
 *
 * @since v0.2.0
 */
export function exceptionMessageOutput(message: ExceptionMessage): string {
    return Object.keys(message.tokens).reduce(
        // eslint-disable-next-line security/detect-object-injection -- reading property only
        (template, key) => template.replace(exceptionToken(key), `\`${message.tokens[key]}\``),
        message.template,
    );
}
