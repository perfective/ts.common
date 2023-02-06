# Perfective Common for TypeScript

Read the [full README](https://github.com/perfective/ts.common/#readme)
in the repository.

## Installation

```bash
npm install @perfective/common
```

## Features

While JavaScript supports the object-oriented paradigm,
the functional programming style allows writing more readable code in JS.
Hence, all provided data types (interfaces) are immutable,
and classes are used only to build fluent method chains
(considering methods as infix operators).

One of the base patterns used is to provide a constructor function named after each class
to discourage the use of the `new` operator
(for readability and consistency with the method chains).
Classes should only be used in types declaration.
All non-abstract classes should be considered final even TypeScript does not provide a `final` keyword.

Packages are organized and named around their primary type:

-   [`@perfective/common`](https://github.com/perfective/ts.common/blob/main/src/value/index.adoc)
    — functions and types to handle types (e.g., `TypeGuard` interface), `null`, `undefined`, and `void` values.
-   [`@perfective/common/array`](https://github.com/perfective/ts.common/tree/main/src/array/index.adoc)
    — functions and types to handle
    [arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
-   [`@perfective/common/boolean`](https://github.com/perfective/ts.common/tree/main/src/boolean/index.adoc)
    — functions and types to handle
    [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) values.
-   [`@perfective/common/error`](https://github.com/perfective/ts.common/tree/main/src/error/index.adoc)
    — functions and types to handle
    [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    and related classes.
-   [`@perfective/common/function`](https://github.com/perfective/ts.common/tree/main/src/function/index.adoc)
    — functions and types for functional programming.
-   [`@perfective/common/match`](https://github.com/perfective/ts.common/tree/main/src/match/index.adoc)
    — functions and types for a functional style `switch-case`.
-   [`@perfective/common/maybe`](https://github.com/perfective/ts.common/tree/main/src/maybe/index.adoc)
    — a `Maybe` monad ([Option type](https://en.wikipedia.org/wiki/Option_type)) implementation.
-   [`@perfective/common/number`](https://github.com/perfective/ts.common/tree/main/src/number/index.adoc)
    — functions and types to handle
    [numbers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).
-   [`@perfective/common/object`](https://github.com/perfective/ts.common/tree/main/src/object/index.adoc)
    — functions and types to handle the
    [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) class.
-   [`@perfective/common/promise`](https://github.com/perfective/ts.common/tree/main/src/number/index.adoc)
    — functions and types to handle the
    [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) class.
-   [`@perfective/common/result`](https://github.com/perfective/ts.common/tree/main/src/result/index.adoc)
    — a `Result` monad ([Result type](https://en.wikipedia.org/wiki/Result_type)) implementation.
-   [`@perfective/common/string`](https://github.com/perfective/ts.common/tree/main/src/string/index.adoc)
    — functions and types to handle
    [strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

The packages have full unit tests coverage.

The code provided by this project relies on the strict [TypeScript](https://www.typescriptlang.org) compiler checks.
Use of these packages in the regular JS projects may produce unexpected behavior and is undocumented.
For example,
a function that declares an argument as required relies on strict TSC `null` checks
and does not check value for `null` additionally.

## Documentation

Developer documentation is available in the `docs.html` file distributed as a part of this package.

## Versioning

This package starts its versioning from `0.7.0`,
as it continues versioning after the deprecated packages:

-   `@perfective/array` (`v0.4.0`);
-   `@perfective/error` (`v0.3.0`);
-   `@perfective/fp` (`v0.6.0`);
-   `@perfective/identity` (`v0.2.0`);
-   `@perfective/match` (`v0.3.0`);
-   `@perfective/maybe` (`v0.6.0`);
-   `@perfective/object` (`v0.4.0`);
-   `@perfective/real` (`v0.6.0`);
-   `@perfective/string` (`v0.3.0`);
-   `@perfective/value` (`v0.3.0`).
