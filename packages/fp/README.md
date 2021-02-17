# Perfective Functional Programming

The `@perfective/fp` package provides types and functions for the functional programming style
as well as logical types and functions (predicates and propositions).
As functions with more than three arguments are considered a code smell,
this package only declares the `Nullary`, `Unary`, `Binary`, and `Ternary` types.
The functions of higher arity is unlikely to be added to the package.

Read the [full documentation](https://github.com/perfective/js/blob/master/packages/fp/README.adoc) 
in the repository.

## Type Guards

* `TypeGuard<T, V extends T> = (value: T) => value is V`
— a function type to check if the value is of a certain type:
    * `isFunction<T>(value: Function | T): value is Function`
    * `isNotFunction<T>(value: Function | T): value is T`
* `Instance<T> = new(...args: any[]) => T`
— definition for a type reference:
    * `isInstanceOf<T, V = unknown>(type: Instance<T>): (value: T | V) => value is T`
    * `isNotInstanceOf<T, V = unknown>(type: Instance<T>): (value: T | V) => value is V`

## Nullary functions

* `Nullary<T>`
— a function without arguments:
    * `isNullary<F extends Function>(f: F): boolean`
      — returns `true` when function accepts no arguments
      (does not count a variadic argument).
    * `constant<T>(value: T): Nullary<T>`
    — creates a function that returns the given value.
    * `empty(): Nullary<void>`
    — creates a function that always returns `void` (`undefined`).
* `Value<T> = T | Nullary<T>`
— represent a value, or a function that returns a value
(e.g. for lazy evaluation).
    * `valueOf<T>(value: Value<T>): T`
    — evaluates the given value.

## Unary functions

* `Unary<X, V>`
— a function with one argument:
    * `isUnary<F extends Function>(f: F): boolean`
      — returns `true` when function accepts only one argument
      (does not count a variadic argument).
    * `value<T>(): Unary<T, T>`
— creates a function that returns its argument.

## Binary functions

* `Binary<X, Y, V>`
— a function with two arguments (`X` and `Y`):
    * `isBinary<F extends Function>(f: F): boolean`
      — returns `true` when function accepts exactly two arguments
      (does not count a variadic argument).

## Ternary functions

* `Ternary<X, Y, Z, V>`
— a function with three arguments (`X`, `Y`, and `Z`):
    * `isTernary<F extends Function>(f: F): boolean`
      — returns `true` when function accepts exactly three arguments
      (does not count a variadic argument).

## Logic types and functions

* `Proposition = Value<boolean>`:
    * `isTrue(proposition: Proposition): boolean`
    * `isFalse(proposition: Proposition): boolean`
* `Predicate<T> = (value: T) => boolean`
— a predicate on type T:
    * `is<T>(input: T): Predicate<T>`
    — creates a predicate that is `true` when its argument is the same as the `input`.
    * `isNot<T>(input: T): Predicate<T>`
    — creates a predicate that is `true` when its argument is not the same as the `input`.
    * `negated(value: Proposition): boolean`
    — negates the given proposition value.
    * `not<T>(predicate: Predicate<T>): Predicate<T>`
    — creates a predicate that negates the given predicate.
    * `all<T>(...predicates: Predicate<T>[]): Predicate<T>`
    — creates a predicate that is `true` when all predicates are `true` (logical `AND`).
    * `either<T>(...predicates: Predicate<T>[]): Predicate<T>`
    — creates a predicate that is `true` when at least one predicate is `true` (logical `OR`).
    * `neither<T>(...predicates: Predicate<T>[]): Predicate<T>`
    — creates a predicate that is `true` when none of the predicates is `true`.
    * `atLeast<T>(minimum: number, ...predicates: Predicate<T>[]): Predicate<T>`
    — creates a predicate that is `true` when at least the `minimum` number of predicates are `true`.
    * `atMost<T>(maximum: number, ...predicates: Predicate<T>[]): Predicate<T>`
    — creates a predicate that is `true` when at most the `maximum` number of predicates are `true`.
    * `exactly<T>(count: number, ...predicates: Predicate<T>[]): Predicate<T>`
    — creates a predicate that is `true` when exact `count` of predicates are `true`.

## Length

`Length` type defines a kind of objects that have "length" (arrays, strings, etc).

* Unit functions:
    * `length<L extends Length>(value: L): number`
* Predicates:
    * `hasLength<L extends Length>(length: number): (value: L) => boolean`
    * `isNotEmpty<L extends Length>(value: L): boolean`
    * `isEmpty<L extends Length>(value: L): boolean`
* Reducers:
    * `toShortest<T extends Length>(shortest: T, value: T): T`
    * `toLongest<T extends Length>(longest: T, array: T): T`
