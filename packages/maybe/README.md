# Perfective Maybe

`@perfective/maybe` package provides an [Option type](https://en.wikipedia.org/wiki/Option_type) implementation.
It is inspired by the Haskell
[`Maybe`](https://en.wikibooks.org/wiki/Haskell/Understanding_monads/Maybe) monad,
and is following the [monad laws](https://en.wikipedia.org/wiki/Monad_(functional_programming)#Analysis)
as close as possible given the limitations of JavaScript and TypeScript
(exceptions and solutions are described in the 
[usage documentation](https://github.com/perfective/js/blob/master/packages/maybe/README.adoc)).

## Types and unit functions

* `Maybe<T>` is `Just<T>` or `Nothing<T>` (corresponds to `T | null | undefined`):
    * `maybe<T>(value: T | null | undefined): Maybe<T>`
    * `just<T>(value: T): Just<T>`
    * `nothing<T>(): Nothing<T>`
    — returns `Nothing` with `undefined` value.
    * `naught<T>(): Nothing<T>`
    — returns `Nothing` with `null` value.
* `Nullable<T>` is `Solum<T>` or `Nil<T>` (corresponds to `T | null`):
    * `nullable<T>(value: T | null): Nullable<T>`
    * `solum<T>(value: T): Solum<T>`
    * `nil<T>(): Nil<T>`
* `Optional<T>` is `Some<T>` or `None<T>` (corresponds to `T | undefined`):
    * `optional<T>(value: T | undefined): Optional<T>`
    * `some<T>(value: T): Some<T>`
    * `none<T>(): None<T>`

## Methods

Both `Nullable` and `Optional` have the same methods as `Maybe`,
but for their corresponding types `Solum`/`Nil` and `Some`/`None`.
These references are omitted for brevity.

* `Maybe.onto<U>(flatMap: (value: T) => Maybe<U> | Just<U> | Nothing<U>): Maybe<U>`
— when a value is present, 
  apply the provided function and return its result;
  otherwise return an empty `Maybe`.
    * `Just.onto<U>(flatMap: (value: T) => Just<U>): Just<U>`
    * `Just.onto<U>(flatMap: (value: T) => Just<U>): Just<U>`
    * `Just.onto<U>(flatMap: (value: T) => Maybe<U>): Maybe<U>`
    * `Nothing.onto<U>(flatMap: (value: T) => Maybe<U> | Just<U> | Nothing<U>): Nothing<U>`

* `Maybe.to<U>(map: (value: T) => U | null | undefined): Maybe<U>`
— when a value is present, 
  apply the provided function and return its result wrapped into `Maybe`;
  otherwise return `Nothing`.
    * `Just.to<U>(map: (value: T) => Present<U>): Just<U>`
    * `Just.to<U>(map: (value: T) => null | undefined): Nothing<U>`
    * `Just.to<U>(map: (value: T) => U | null | undefined): Maybe<U>`
    * `Nothing.to<U>(map: (value: T) => (U | null | undefined)): Nothing<U>`

* `Maybe.pick<K extends keyof T>(property: Value<K>): Maybe<Present<T[K]>>`
— when a value is present,
  return  the value of the given property wrapped in `Maybe`;
  otherwise return an empty `Maybe`.
    * `Just.pick<K extends keyof T>(property: Value<K>): T[K] extends Present<T[K]> ? Just<T[K]> : Maybe<Present<T[K]>>`
    — when the property is required, return `Just` property value.
    * `Nothing.pick<K extends keyof T>(property: Value<K>): Nothing<Present<T[K]>>`

* `Maybe.that(filter: Predicate<T>): Maybe<T>`
— when a value is present,
and the value matches the given predicate,
return the current `Maybe`;
otherwise return an empty `Maybe`.
    * `Nothing.that(filter: Predicate<T>): Nothing<T>`

* `Maybe.which<U extends T>(filter: TypeGuard<T, U>): Maybe<U>`
— when a value is present,
and the value matches the given type guard,
return the current value as a `Maybe` of the type guarded type;
otherwise return an empty `Maybe`.
    * `Nothing.which<U extends T>(filter: TypeGuard<T, U>): Nothing<U>`

* `Maybe.when(condition: Proposition): Maybe<T>`
— when a value is present,
and the given proposition is `true`,
return the current `Maybe`;
otherwise return an empty `Maybe`.
    * `Nothing.when(condition: Proposition): Nothing<T>`

* `Maybe.otherwise(fallback: Value<T | null | undefined>): Maybe<T>`
— when a value is present,
return the value;
otherwise if the given fallback is a function, 
return the result of the fallback function wrapped in `Maybe`;
otherwise return the fallback wrapped in `Maybe`.
    * `Maybe.otherwise(fallback: Value<T>): Just<T>`
    — when the given fallback returns a present value, return a `Just`.
    * `Just.otherwise(fallback: Value<T | null | undefined>): Just<T>`
    * `Nothing.otherwise(fallback: Value<T>): Just<T>`
    * `Nothing.otherwise(fallback: Value<null | undefined>): Nothing<T>`
    * `Nothing.otherwise(fallback: Value<T | null | undefined>): Maybe<T>`

* `Maybe.or(fallback: Value<T | null | undefined>): T | null | undefined`
— when a value is present,
return the value;
otherwise, if the given fallback is a function,
return the result of the fallback function;
otherwise, return the fallback value.
    * `Maybe.or(fallback: Value<T>): T`
    * `Just.or(fallback: Value<T | null | undefined>): T`
    * `Nothing.or(fallback: Value<T>): T`
    * `Nothing.or(fallback: Value<null>): null`
    * `Nothing.or(fallback: Value<undefined>): undefined`
    * `Nothing.or(fallback: Value<T | null>): T | null`
    * `Nothing.or(fallback: Value<T | undefined>): T | undefined`
    * `Nothing.or(fallback: Value<T | null | undefined>): T | null | undefined`

* `Maybe.run(procedure: (value: T) => void): Maybe<T>`
— when a value is present,
run the procedure with the value.
Always return the original `Maybe`.
    * `Just.run(procedure: (value: T) => void): Just<T>`
    — if the value is known be in `Just`,
    return the original `Just`.
    * `Nothing.run(procedure: (value: T) => void): Nothing<T>`

* `Maybe.lift<U>(map: (value: T | null | undefined) => U | null | undefined): Maybe<U>`
— apply the given mapping function regardless if value is present or absent,
return the result wrapped in a new `Maybe`.
    * `Just.lift<U>(map: (value: T) => U | null | undefined): Maybe<U>`
    — allows to pass a function that accepts only a present argument.
    * `Nothing.lift<U>(map: (value: null | undefined) => U | null | undefined): Maybe<U>`
    

## Mapping functions

Each method has a corresponding mapping function that can be used in the `Array.prototype.map`
(or any other mapping method or operator).

* `onto<T, U>(flatMap: (value: T) => Maybe<U> | Just<U> | Nothing<U>): Unary<Maybe<T>, Maybe<U> | Just<U> | Nothing<U>>`
* `to<T, U>(map: (value: T) => U | null | undefined): Unary<Maybe<T>, Maybe<U>>`
* `pick<T, K extends keyof T>(property: Value<K>): Unary<Maybe<T>, Maybe<Present<T[K]>>>`
* `that<T>(filter: Predicate<T>): Unary<Maybe<T>, Maybe<T>>`
* `which<T, U extends T>(filter: TypeGuard<T, U>): Unary<Maybe<T>, Maybe<U>>`
* `when<T>(condition: Proposition): Unary<Maybe<T>, Maybe<T>>`
* `otherwise<T>(fallback: Value<T | null | undefined>): Unary<Maybe<T>, Maybe<T>>`
    * `otherwise<T>(fallback: Value<T>): Unary<Maybe<T>, Just<T>>`
* `or<T>(fallback: Value<T | null | undefined>): Unary<Maybe<T>, T | null | undefined>`
    * `or<T>(fallback: Value<T>): Unary<Maybe<T>, T>`
* `run<T>(procedure: (value: T) => void): Unary<Maybe<T>, Maybe<T>>`
* `lift<T, U>(map: (value: T | null | undefined) => U | null | undefined): Unary<Maybe<T>, Maybe<U>>`

Read the [usage documentation](https://github.com/perfective/js/blob/master/packages/maybe/README.adoc)
in the repository.
