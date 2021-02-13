# Perfective Maybe Monad

`@perfective/maybe` package provides an [Option type](https://en.wikipedia.org/wiki/Option_type) implementation.
It is inspired by the Haskell
[`Maybe`](https://en.wikibooks.org/wiki/Haskell/Understanding_monads/Maybe) monad,
and is following the [monad laws](https://en.wikipedia.org/wiki/Monad_(functional_programming)#Analysis)
as close as possible given the limitations of JavaScript and TypeScript
(exceptions and solutions are described in the 
[usage documentation](https://github.com/perfective/js/blob/master/packages/maybe/README.adoc)).

## Types and unit functions

* `Maybe<T>`
    * `maybe<T>(value: T | null | undefined): Maybe<T>`
    * `nullable<T>(value: T | null): Maybe<T>`
    * `optional<T>(value: T | undefined): Maybe<T>`
* `Just<T>`
    * `just<T>(value: T): Just<T>`
* `Nothing<T>`
    * `nothing<T>(): Nothing<T>`
    — optimized, returns the same instance.
* `Nil<T>`
    * `nil<T>(): Nil<T>`
    — optimized, returns the same instance.

## Methods

* `Maybe.onto<U>(bind: (value: T) => Maybe<U>): Maybe<U>`
— when a value is present, apply the provided function and return its result;
otherwise return an empty `Maybe`.
    * `Just.onto<U>(bind: (value: T) => Just<Present<U>>): Just<U>`
    - when a value is known to be present (is in `Just`), 
    and the provided function returns `Just` a present value,
    then the new value is guaranteed to be `Just`.
* `Maybe.to<U>(map: (value: T) => U | null | undefined): Maybe<U>`
— when a value is present, apply the provided function and return its result wrapped into `Maybe`;
otherwise return an empty `Maybe`.
    * `Just.to<U>(map: (value: T) => Present<U>): Just<U>`
    — when a value is known to be present (is in `Just`),
    and the provided function returns a present value,
    then the new value is guaranteed to be in `Just`.
* `Maybe.pick<K extends keyof T>(property: Value<K>): Maybe<Present<T[K]>>`
— when a value is present,
return  the value of the given property wrapped in `Maybe`;
otherwise return an empty `Maybe`.
    * `Just.pick<K extends keyof T>(property: Value<K>): T[K] extends Present<T[K]> ? Just<Present<T[K]>> : Maybe<Present<T[K]>>`
    — when a value is `Just`, and the picked property is _required_, returns `Just`;
      otherwise returns `Maybe`.
* `Maybe.that(filter: Predicate<T>): Maybe<T>`
— when a value is present,
and the value matches the given predicate,
return the current `Maybe`;
otherwise return an empty `Maybe`.
* `Maybe.which<U extends T>(filter: TypeGuard<T, U>): Maybe<U>`
— when a value is present,
and the value matches the given type guard,
return the current value as a `Maybe` of the type guarded type;
otherwise return an empty `Maybe`.
* `Maybe.when(condition: Proposition): Maybe<T>`
— when a value is present,
and the given proposition is `true`,
return the current `Maybe`;
otherwise return an empty `Maybe`.
* `Maybe.otherwise(fallback: Value<T | null | undefined>): Maybe<T>`
— when a value is present,
return the value;
otherwise if the given fallback is a function, 
return the result of the fallback function wrapped in `Maybe`;
otherwise return the fallback wrapped in `Maybe`.
    * `Maybe.otherwise(fallback: Value<T>): Just<T>`
    — when the given fallback returns a present value,
    return a `Just`.
* `Maybe.or(fallback: Value<T | null | undefined>): T | null | undefined`
— when a value is present,
return the value;
otherwise, if the given fallback is a function,
return the result of the fallback function;
otherwise, return the fallback value.
    * `Maybe.or(fallback: Value<T>): T`
    * `Maybe.or(fallback: Value<T | null> | null): T | null`
    * `Maybe.or(fallback: Value<T | undefined> | undefined): T | undefined`
* `Maybe.run(procedure: (value: T) => void): Maybe<T>`
— when a value is present,
run the procedure with the value.
Always return the original `Maybe`.
    * `Just.run(procedure: (value: T) => void): Just<T>`
    — if the value is known be in `Just`,
    return the original `Just`.
* `lift<U>(map: (value: T | null | undefined) => U | null | undefined): Maybe<U>`
— apply the given mapping function regardless if value is present or absent,
return the result wrapped in a new `Maybe`.
    
Note: an exact type of "empty `Maybe`" depends on the context, 
and can be eiter `Nil` or `Nothing`.

## Mapping functions

Each method has a corresponding mapping function that can be used in the `Array.prototype.map`
(or any other mapping method or operator).

* `onto<T, U>(bind: (value: T) => Maybe<U>): Unary<Maybe<T>, Maybe<U>>`
* `to<T, U>(map: (value: T) => U | null | undefined): Unary<Maybe<T>, Maybe<U>>`
* `that<T>(filter: Predicate<T>): Unary<Maybe<T>, Maybe<T>>`
* `which<T, U extends T>(filter: TypeGuard<T, U>): Unary<Maybe<T>, Maybe<U>>`
* `when<T>(condition: Proposition): Unary<Maybe<T>, Maybe<T>>`
* `pick<T, K extends keyof T>(property: Value<K>): Unary<Maybe<T>, Maybe<Present<T[K]>>>`
* `otherwise<T>(fallback: Value<T | null | undefined>): Unary<Maybe<T>, Maybe<T>>`
    * `otherwise<T>(fallback: Value<T>): Unary<Maybe<T>, Just<T>>`
* `or<T>(fallback: Value<T | null | undefined>): Unary<Maybe<T>, T | null | undefined>`
    * `or<T>(fallback: Value<T>): Unary<Maybe<T>, T>`
    * `or<T>(fallback: Value<T | null> | null): Unary<Maybe<T>, T | null>`
    * `or<T>(fallback: Value<T | undefined> | undefined): Unary<Maybe<T>, T | undefined>`
* `run<T>(procedure: (value: T) => void): Unary<Maybe<T>, Maybe<T>>`
* `lift<T, U>(map: (value: T | null | undefined) => U | null | undefined): Unary<Maybe<T>, Maybe<U>>`

Read the [usage documentation](https://github.com/perfective/js/blob/master/packages/maybe/README.adoc)
in the repository.
