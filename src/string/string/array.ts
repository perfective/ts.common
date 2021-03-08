export function lines(value: string): string[] {
    return value.split(/\r\n|\n\r|\n/gu);
}
