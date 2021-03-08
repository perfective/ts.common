import { exceptionToken, ExceptionTokens } from './exception-tokens';

export interface ExceptionMessage {
    readonly template: string;
    readonly tokens: ExceptionTokens;
}

export function exceptionMessage(template: string, tokens?: ExceptionTokens): ExceptionMessage {
    return {
        template,
        tokens: tokens ?? {},
    };
}

export function exceptionMessageOutput(message: ExceptionMessage): string {
    return Object.keys(message.tokens).reduce(
        (template, key) => template.replace(exceptionToken(key), `\`${message.tokens[key]}\``),
        message.template,
    );
}
