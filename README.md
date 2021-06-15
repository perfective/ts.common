# Perfective Common for TypeScript

The code provided by this project relies on the strict [TypeScript](http://typescriptlang.org) compiler checks.
Use of these packages in the regular JS projects may produce unexpected behavior and is undocumented.
For example,
a function that declares an argument as required relies on strict TSC `null` checks
and does not check value for `null` additionally.

## Installation

```bash
npm install @perfective/common
```

## Features

-   [`@perfective/common/array`](https://github.com/perfective/ts.common/tree/main/src/array/index.adoc)
    — functions to work with the
    [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) class.
-   [`@perfective/common/boolean`](https://github.com/perfective/ts.common/tree/main/src/boolean/index.adoc)
    — functions to work with the
    [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) values.
-   [`@perfective/common/error`](https://github.com/perfective/ts.common/tree/main/src/error/index.adoc)
    — functions to work with the
    [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    and related classes.
-   [`@perfective/common/function`](https://github.com/perfective/ts.common/tree/main/src/function/index.adoc)
    — functions and types for functional programming and logical operations.
-   [`@perfective/common/match`](https://github.com/perfective/ts.common/tree/main/src/match/index.adoc)
    — functions to support a functional switch-case.
-   [`@perfective/common/maybe`](https://github.com/perfective/ts.common/tree/main/src/maybe/index.adoc)
    — [Maybe type](https://en.wikipedia.org/wiki/Option_type) implementation.
-   [`@perfective/common/number`](https://github.com/perfective/ts.common/tree/main/src/number/index.adoc)
    — functions and types to work with the real numbers.
-   [`@perfective/common/object`](https://github.com/perfective/ts.common/tree/main/src/object/index.adoc)
    — functions to work with the
    [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) class.
-   [`@perfective/common/string`](https://github.com/perfective/ts.common/tree/main/src/string/index.adoc)
    — functions to work with the
    [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) class.

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
