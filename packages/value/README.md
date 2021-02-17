# Value

The `@perfective/value` package provides functions to work with `undefined` and `null` values
and utility types
(similar to the TS [`NonNullable<T>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullablet)
to describe some of such values.

* Utility types:
    * `type Defined<T> = T extends undefined ? never : T`;
    * `type Undefined<T> = T extends undefined ? T : never`;
    * `type NotNull<T> = T extends null ? never : T`;
    * `type Null<T> = T extends null ? T : never`;
    * `type Present<T> = T extends null | undefined ? never : T`
    — same as `NonNullable<T>`, but is used in the project for consistency with the type guards;
    * `type Absent<T> = T extends null | undefined ? T : never`.
* Type Guards:
    * `isDefined<T>(value: T | undefined): value is T`;
    * `isUndefined<T>(value: T | undefined): value is undefined`;
    * `isNotNull<T>(value: T | null): value is T`;
    * `isNull<T>(value: T | null): value is null`;
    * `isPresent<T>(value: T | null | undefined): value is T`;
    * `isAbsent<T>(value: T | null | undefined): value is null | undefined`.
* `typeof` types and functions:
    * `EcmaType`
    — is one of `undefined`, `boolean`, `number`, `bigint`, `string`, `symbol`, `function`, or `object`.
    * `TsType`
    — is one of `EcmaType` or `null`, `array`, and `unknown`.
    * `TypeOf<T>`
    — a conditional type that returns `TsType` dynamically.
    * `typeOf<T>(value: T | null | undefined): TypeOf<T> & TsType`.
    * `isTypeOf<T>(type: TypeOf): (value: T | null | undefined) => boolean`;
    * `isNotTypeOf<T>(type: TypeOf): (value: T | null | undefined) => boolean`.
* Handling `void`:
    * `voidable<T>(value: T | void): T | null | undefined`.


[Full documentation](https://github.com/perfective/js/blob/master/packages/value/README.adoc) 
is available in the repository.
