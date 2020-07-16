export interface ExceptionTokens
    extends Record<string, string> {
}

/**
 * @private
 */
export function exceptionToken(key: string): RegExp {
    return new RegExp(
        `\\{\\{${key.replace(/\$/gu, '\\$')}\\}\\}`,
        'gu',
    );
}
