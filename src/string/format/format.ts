import { tokenKey, Tokens, tokens as prepared } from './tokens';

export interface Format {
    readonly template: string;
    readonly tokens: Tokens;
}

export function format(template: string, tokens: Tokens | unknown[] = {}): Format {
    return {
        template,
        tokens: prepared(tokens),
    };
}

export function formatted(input: Format): string {
    return Object.entries(input.tokens)
        .reduce((formatted, [key, value]) => formatted.replace(
            tokenKey(key),
            String(value),
        ), input.template);
}
