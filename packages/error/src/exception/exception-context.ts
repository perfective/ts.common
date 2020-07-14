export interface ExceptionContext
    extends Record<string, unknown> {
}

export function exceptionMessage(template: string, context: ExceptionContext): string {
    return Object.keys(context)
        .reduce((message, key) => message.replace(token(key), output(context, key)), template);
}

function token(key: string): RegExp {
    return new RegExp(`\\{\\{${key}\\}\\}`, 'gu');
}

function output(context: ExceptionContext, key: string): string {
    const value = context[key];
    if (typeof value === 'string') {
        return `\`${value}\``;
    }
    return `{{${key}}}`;
}
