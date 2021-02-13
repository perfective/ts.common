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

* Types:
    * `Integer` — a nominal type based on the `number` type.
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

