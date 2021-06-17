import { decimal } from '../../number/number/base';

export type Enum<T extends number | string> = Record<string, T>;

export type Member<T extends number | string> = keyof Enum<T>;

export function members<T extends number | string, E extends Enum<T>>(value: E): Member<T>[] {
    return Object.keys(value)
        .filter(key => decimal(key) === null);
}
