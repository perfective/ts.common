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

* [`@perfective/common/array`](https://github.com/perfective/ts.common/tree/master/src/array)
  — functions to work with the
  [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) class.
* [`@perfective/common/error`](https://github.com/perfective/ts.common/tree/master/src/error)
  — functions to work with the
  [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
  and related classes.
* [`@perfective/common/fp`](https://github.com/perfective/ts.common/tree/master/src/fp)
  — functions and types for functional programming and logical operations.
* [`@perfective/common/identity`](https://github.com/perfective/ts.common/tree/master/src/identity)
  — [Identity monad](https://en.wikipedia.org/wiki/Monad_(functional_programming)#Identity_monad) implementation.
* [`@perfective/common/match`](https://github.com/perfective/ts.common/tree/master/src/match)
  — functions to support a functional switch-case.
* [`@perfective/common/maybe`](https://github.com/perfective/ts.common/tree/master/src/maybe)
  — [Maybe type](https://en.wikipedia.org/wiki/Option_type) implementation.
* [`@perfective/common/object`](https://github.com/perfective/ts.common/tree/master/src/object)
  — functions to work with the
  [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) class.
* [`@perfective/common/real`](https://github.com/perfective/ts.common/tree/master/src/real)
  — functions and types to work with the real numbers.
* [`@perfective/common/string`](https://github.com/perfective/ts.common/tree/master/src/string)
  — functions to work with the
  [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) class.
* [`@perfective/common/value`](https://github.com/perfective/ts.common/tree/master/src/value)
  — functions to separate generic values from `undefined` and `null`.


## Documentation

Developer documentation is available in the `docs.html` file distributed as a part of this package.


## Versioning

This package starts its versioning from `0.7.0`,
as it continues versioning after the deprecated packages:

* `@perfective/array` (`v0.4.0`);
* `@perfective/error` (`v0.3.0`);
* `@perfective/fp` (`v0.6.0`);
* `@perfective/identity` (`v0.2.0`);
* `@perfective/match` (`v0.3.0`);
* `@perfective/maybe` (`v0.6.0`);
* `@perfective/object` (`v0.4.0`);
* `@perfective/real` (`v0.6.0`);
* `@perfective/string` (`v0.3.0`);
* `@perfective/value` (`v0.3.0`).
