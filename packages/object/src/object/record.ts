export function recordFromArray(array: string[]): Record<string, number> {
    return array.reduce<Record<string, number>>(indexByValue, {});
}

function indexByValue(record: Record<string, number>, value: string, index: number): Record<string, number> {
    record[value] = index;
    return record;
}

export type Entry<T = unknown> = [string, T];

/**
 * Creates an plain object from an array of pairs (entries).
 *
 * This function is an inverse for Object.entries().
 *
 * @see Object.entries()
 */
export function recordFromEntries(entries: Entry[]): Record<string, unknown> {
    return entries.reduce(toRecordFromEntries, {});
}

/**
 * Reducer to build a record from entries.
 */
export function toRecordFromEntries(record: Record<string, unknown>, value: Entry): Record<string, unknown> {
    record[value[0]] = value[1];
    return record;
}
