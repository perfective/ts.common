# Error

The `@perfective/error` package helps organize exceptions and error handling.
It defines an `Exception`, based on the JS
[`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) class
that supports localizable error messages and error chaining;
and provides functions to handle error stack output.

Read the [full documentation](https://github.com/perfective/js/blob/master/packages/error/README.adoc) 
in the repository.

* `Exception`:
    * `Exception.toString()`
    — outputs the stack of all error messages.
    * `exception(message: string, tokens: ExceptionTokens = {}, context: ExceptionContext = {}): Exception`
    — creates an `Exception` without a previous error.
    * `causedBy(previous: Error, message: string, tokens: ExceptionTokens = {}, context: ExceptionContext = {}): Exception`
    — creates an `Exception` with a previous error.
    * `unknownError(error: unknown): Error | Exception`
    — returns a passed `Error` or creates a new `Literal error` `Exception`.
    * `isException<T>(value: Exception | T): value is Exception`
    — returns `true` when value is an `Exception`.
    * `isNotException<T>(value: Exception | T): value is T`
    — returns `true` when value is not an `Exception`.
    * `chainStack(error: Error): string`
    — outputs the stack of all errors with their stack trace.
    * `fault(error: Error): Error`
    — returns the first error in the chain.
* `ExceptionMessage`:
    * `exceptionMessage(template: string, tokens?: ExceptionTokens): ExceptionMessage`
    — creates an `ExceptionMessage` with an empty tokens object if the argument not provided.
    * `exceptionMessageOutput(message: ExceptionMessage): string`
    — creates a string to output an `ExceptionMessage`.
* Throwing errors:
    * `throws<E extends Error>(error: E): never` 
    — throws a provided error.
    * `throws<E extends Error>(message: string, context: ExceptionContext = {}): never`
    — creates and throws an `Exception` with the given `message` and `context`.
    * `panic<E extends Error>(error: E): () => never`
    — creates a function that throws a provided error.
    * `panic<E extends Error>(message: string, context: ExceptionContext = {}): () => never`
    — creates a function that throws an `Exception` with the given `message` and `context`.
    * `rethrows(previous: Error, message: string, context: ExceptionContext = {}): never`
    — creates and throws an exception with the given `message`, `context`, and `previous` error.
    * `rethrow(message: string, context: ExceptionContext = {}): (previous: Error) => never`
    — creates a function that throws an exception with the given `message`, `context`, 
    and `previous` error.
* [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error):
    * `error(message?: string): Error` 
    — instantiates a new `Error`.
    * `isError<T>(value: Error | T): value is Error` 
    — returns `true` when the value is an instance of `Error`.
    * `isNotError<T>(value: Error | T): value is T` 
    — returns `true` when the value is not an instance of `Error`.
* [`EvalError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/EvalError):
    * `evalError(message?: string): EvalError` 
    — instantiates a new `EvalError`.
    * `isEvalError<T>(value: EvalError | T): value is EvalError` 
    — returns `true` when the value is an instance of `EvalError`.
    * `isNotEvalError<T>(value: EvalError | T): value is T` 
    — returns `true` when the value is not an instance of `EvalError`.
* [`RangeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError):
    * `rangeError(message?: string): RangeError` 
    — instantiates a new `RangeError`.
    * `isRangeError<T>(value: RangeError | T): value is RangeError` 
    — returns `true` when the value is an instance of `RangeError`.
    * `isNotRangeError<T>(value: RangeError | T): value is T` 
    — returns `true` when the value is not an instance of `RangeError`.
* [`ReferenceError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError):
    * `referenceError(message?: string): ReferenceError` 
    — instantiates a new `ReferenceError`.
    * `isReferenceError<T>(value: ReferenceError | T): value is ReferenceError` 
    — returns `true` when the value is an instance of `ReferenceError`.
    * `isNotReferenceError<T>(value: ReferenceError | T): value is T` 
    — returns `true` when the value is not an instance of `ReferenceError`.
* [`SyntaxError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError):
    * `syntaxError(message?: string): SyntaxError` 
    — instantiates a new `SyntaxError`.
    * `isSyntaxError<T>(value: SyntaxError | T): value is SyntaxError` 
    — returns `true` when the value is an instance of `SyntaxError`.
    * `isNotSyntaxError<T>(value: SyntaxError | T): value is T` 
    — returns `true` when the value is not an instance of `SyntaxError`.
* [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError):
    * `typeError(message?: string): TypeError` 
    — instantiates a new `TypeError`.
    * `isTypeError<T>(value: TypeError | T): value is TypeError` 
    — returns `true` when the value is an instance of `TypeError`.
    * `isNotTypeError<T>(value: TypeError | T): value is T` 
    — returns `true` when the value is not an instance of `TypeError`.
