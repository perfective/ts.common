export interface ExceptionContext extends Record<string, string> {
}

export function exceptionMessage(template: string, context: ExceptionContext): string {
    return Object.keys(context)
        .reduce((message, key) => message.replace(token(key), `\`${context[key]}\``), template);
}

function token(key: string): RegExp {
    return new RegExp(`\\{\\{${key}\\}\\}`, 'gu');
}
