export function recordFromArray(array: string[]): Record<string, number> {
    return array.reduce<Record<string, number>>(indexByValue, {});
}

function indexByValue(record: Record<string, number>, value: string, index: number): Record<string, number> {
    record[value] = index;
    return record;
}
