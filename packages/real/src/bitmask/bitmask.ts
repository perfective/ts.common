import { Enum } from '../enum/enum';

export type Bitmask<T extends Enum<number> | number = number> = T extends Enum<number> ? T[keyof T] : number;
