# Perfective Real Numbers

The `@perfective/real` package declares types and functions to work with real numbers,
including the JavaScript 
[`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) class.

Read the [full documentation](https://github.com/perfective/js/blob/master/packages/real) 
on the Github.

## Number

* Type guards:
    * `isNumber<T>(value: number | T): value is number`
    * `isNotNumber<T>(value: number | T): value is T`
* Unit functions:
    * `negative(value: number): number`
* `Number` methods:
    * `exponential(fraction: Digits): Unary<number, string>`
    * `fixed(fraction: Digits): Unary<number, string>`
    * `precision(precision: Precision): Unary<number, string>`
* Arithmetic functions:
    * `sum(augend: number, addend: number): number`
    * `difference(minuend: number, subtrahend: number): number`
    * `product(multiplier: number, multiplicand: number): number`
    * `quotient(dividend: number, divisor: number): number`
    * `remainder(dividend: number, divisor: number): number`
* Set functions:
    * `maximum(values: readonly number[]): number | null`
    * `minimum(values: readonly number[]): number | null`

## Integer

* Nominal types (aliases of `number`):
    * `Integer`
    * `SafeInteger`
    * `PositiveInteger`
    * `NonNegativeInteger`
    * `NonPositiveInteger`
    * `NegativeInteger`
* Predicates:
    * `isInteger(value: number): boolean`
    * `isSafeInteger(value: number): boolean`
    * `isNonNegativeInteger(value: number): boolean`
    * `isPositiveInteger(value: number): boolean`
    * `isNonPositiveInteger(value: number): boolean`
    * `isNegativeInteger(value: number): boolean`

## Natural

* Types:
    * `Natural` — a nominal type based on the `number` type.
* Type Guards:
    * `isNatural<T>(value: number | T): value is Natural`.


## Base (Radix)

The `parseFloat()`, `parseInt()`, and `Number.prototype.toString()` functions are combined
into polymorphic shortcuts for readability:

* Decimal (radix = 10):
    * `decimal(value: number): string`
    * `decimal(value: string): number | null`
* Binary (radix = 2):
    * `binary(value: Integer): string`
    * `binary(value: string): Integer | null`
* Octal (radix = 8):
    * `octal(value: Integer): string`
    * `octal(value: string): Integer | null`
* Hexadecimal (radix = 16):
    * `hexadecimal(value: Integer): string`
    * `hexadecimal(value: string): Integer | null`

## Order

* Predicates:
    * `isEqualTo(value: number): Predicate<number>`
    * `isNotEqualTo(value: number): Predicate<number>`
    * `isGreaterThan(value: number): Predicate<number>`
    * `isGreaterThanOrEqualTo(value: number): Predicate<number>`
    * `isLessThan(value: number): Predicate<number>`
    * `isLessThanOrEqualTo(value: number): Predicate<number>`
* Sorting:
    * `ascending(a: number, b: number): number`
    * `descending(a: number, b: number): number`

## Interval

* Types:
    * `Interval` represents an interval from `Interval.min` to `Interval.max`.
* Unit functions:
    * `interval(min: number, max: number): Interval | null`
    * `intervalFromPair(pair: readonly [number, number]): Interval | null`
    * `intervalFromValues(values: number[]): Interval | null`
    * `intervalFromNullable(min: number | null, max: number | null): Interval | null`
* Predicates:
    * `isInInterval(interval: Interval): Predicate<number>`
    * `isInOpenInterval(interval: Interval): Predicate<number>`
    * `isInLeftOpenInterval(interval: Interval): Predicate<number>`
    * `isInRightOpenInterval(interval: Interval): Predicate<number>`

## Enum

* Types:
    * `Enum<T extends number | string>` — a record generated based on the `enum` keyword;
    * `Member<T extends number | string>` — key of an enum.
* Functions:
    * `members<T extends number | string, E extends Enum<T>>(value: E): Member<T>[]`
    — returns a list of `enum` keys.


## Bitmasks

* Types:
    * `Flags<T extends number = number>` — an `enum` with `number` values;
    * `Flag<T extends Flags>` — a key of a `Flags` enum.
    * `Bitmask<T extends Flags | number = number>` — a combination of bits.
* Unit function:
    * `bitmask<T extends Flags | number = number>(flags: Bitmask<T>[]): Bitmask`
    — creates a bitmask by raising all given flags.
* Predicates:
    * `isFlagOn<T extends Flags | number>(bitmask: Bitmask<T>, flag: Bitmask<T>): boolean`
    — returns true when given flags are raised on a bitmask.
    * `hasFlagOn<T extends Flags | number>(flag: Bitmask<T>): Unary<Bitmask<T>, boolean>`
    — creates a curried version of the hasRaised() function.
* Other:
    * `raisedFlags<T extends number>(type: object, bitmask: Bitmask<T>): Member<T>[]`
    — returns flags that are raised on the given bitmask.
