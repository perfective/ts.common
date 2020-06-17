export type Defined<T> = T extends undefined ? never : T;
export type NotNull<T> = T extends null ? never : T;
export type Present<T> = T extends null | undefined ? never : T;
export type Absent<T> = T extends null | undefined ? T : never;
