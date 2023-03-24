# Perfective Common for TypeScript

## Installation

```bash
npm install @perfective/common
```

After the installation you can read the full compiled documentation in the `node_modules/@perfective/common/docs.html`.

## Key Features

The `@perfective/common` package facilitates writing highly readable functional code.
It focuses on providing functions to handle ECMAScript types
and to compose functions together easily.

### Maybe monad

The [`@perfective/common/maybe`](https://github.com/perfective/ts.common/tree/main/src/maybe/index.adoc) package
provides a Maybe monad implementation.

It allows you to write and compose functions that accept only present (defined and non-null) values.
It helps avoid additional complexity and noise when handling `null` and `undefined` values.

For example, consider you have the `User` and `Name` types below and want to output a user’s full name.

```typescript
interface User {
    name?: Name;
}

interface Name {
    first: string;
    last: string;
}
```

If you write functions that have to handle `null` and `undefined` values,
then you would have to write something like this:

```typescript
function userNameOutput(user: User | null | undefined): string {
    if (isPresent(user)) {
        const name = fullName(user.name);
        if (isPresent(name)) {
            return name;
        }
    }
    throw new Error('User name is unknown');
}

function fullName(name: Name | null | undefined): string | null {
    if (isPresent(name)) {
        const trimmed = `${name.first} ${name.last}`.trim();
        if (isNotEmpty(trimmed)) {
            return trimmed;
        }
    }
    return null;
}
```

When using the [`Maybe`](https://github.com/perfective/ts.common/tree/main/src/maybe/index.adoc) monad,
you can write simpler and more readable functions:

```typescript
import { panic } from '@perfective/common/error';
import { just, Maybe, maybe } from '@perfective/common/maybe';
import { isNotEmpty, trim } from '@perfective/common/string';

function userNameOutput(user: User | null | undefined): string {
    return maybe(user)
        .pick('name') // <1>
        .onto(fullName) // <2>
        .or(panic('User name is unknown')); // <3>
}

function fullName(name: Name): Maybe<string> {
    return just(`${name.first} ${name.last}`)
        .to(trim) // <4>
        .that(isNotEmpty); // <5>
}
```

1. [`Maybe.pick()`](https://github.com/perfective/ts.common/blob/main/src/maybe/index.adoc#maybepick)
   provides a strictly-typed "optional chaining" of the `Maybe.value` properties.
2. [`Maybe.onto()`](https://github.com/perfective/ts.common/blob/main/src/maybe/index.adoc#maybeonto)
   (flat) maps a `Maybe.value` to another `Maybe`.
3. [`Maybe.or()`](https://github.com/perfective/ts.common/blob/main/src/maybe/index.adoc#maybeor)
   extracts a `value` from the `Maybe` with a given fallback.
   (or allows to throw an error).
4. [`Maybe.that()`](https://github.com/perfective/ts.common/blob/main/src/maybe/index.adoc#maybethat)
   filters a value inside `Maybe`.
5. [`Maybe.to()`](https://github.com/perfective/ts.common/blob/main/src/maybe/index.adoc#maybeto) maps a value
   inside `Maybe` using a given callback.

In addition to these methods,
the [`Maybe`](https://github.com/perfective/ts.common/tree/main/src/maybe/index.adoc) monad also has:
[`Maybe.into()`](https://github.com/perfective/ts.common/blob/main/src/maybe/index.adoc#maybeinto),
[`Maybe.which()`](https://github.com/perfective/ts.common/blob/main/src/maybe/index.adoc#maybewhich),
[`Maybe.when()`](https://github.com/perfective/ts.common/blob/main/src/maybe/index.adoc#maybewhen),
[`Maybe.otherwise()`](https://github.com/perfective/ts.common/blob/main/src/maybe/index.adoc#maybeotherwise),
and [`Maybe.through()`](https://github.com/perfective/ts.common/blob/main/src/maybe/index.adoc#maybethrough) methods.

### Result monad

The [`@perfective/common/result`](https://github.com/perfective/ts.common/blob/main/src/result/index.adoc) package
provides a `Result` monad
(a concrete case of an Either monad).
It allows you to treat errors as part of a function result
and chain processing of such results.

For example,
consider you are writing a function that loads a backend entity based on the user input.

.Example of the provided functions and types.

```typescript
interface EntityRequest {
    entity: string;
    id: number;
}

interface User {
    id: number;
    username: string;
}

/**
 * @throws {Error} If a given input is empty or is not a number.
 */
declare function numberInput(input: string): number;

declare function request(entity: string): (id: number) => EntityRequest;

declare function user(request: EntityRequest): User;
```

Writing an imperative code, you would have:

```typescript
function userOutput(input: string): User {
    let id: number;
    try {
        id = numberInput(input);
    } catch {
        id = 0;
    }
    const userRequest = request('user');
    return user(userRequest(id));
}
```

Using the `Result` your code would be:

```typescript
import { recovery, Result, resultOf } from '@perfective/common/result';

function userOutput(id: string): Result<User> {
    return resultOf(() => numberInput(id))
        .into(recovery(0))
        .to(request('user'))
        .to(user);
}
```

The `Result` [integrates](https://github.com/perfective/ts.common/blob/main/src/result/index.adoc#using-result-with-promise)
with the `Promise` using the `promisedResult()` and `settledResult()` functions.

### Chained Exceptions

The ECMA `Error` class does not store a previous error.
This is inconvenient, as it requires either manually adding a previous error message to a new error.
Or worse, skip providing the previous error altogether.

Chaining previous errors is helpful for debugging.
Especially in async environments, when most of the stack trace is full of useless function calls like `next()`
or on the frontend with packed code and renamed functions.

The [`@perfective/common/error`](https://github.com/perfective/ts.common/tree/main/src/error/index.adoc) package
provides the `Exception` class
to make logging and debugging of productions code easier.
It supports three features:

-   providing a previous error (allows to stack errors);
-   using a message template with string tokens (allows to localize and format messages);
-   storing additional context (simplifies logging and debugging).

.Using the `Exception` class and its constructors.

```
import { causedBy, chained, exception, unknownError } from '@perfective/common/error';

interface FetchRequest {
    method: string;
    url: string;
}

interface User {}

function numberInput(input: string): number {
    const id = Number(input);
    if (Number.isNaN(id)) {
        throw exception('Input {{value}} is not a number', { // <1>
            value: input,
        });
    }
    return id;
}

function userRequest(id: string): FetchRequest {
    try {
        const userId = numberInput(id);
        return {
            method: 'GET',
            url: `user/${userId}`,
        };
    } catch (error: unknown) { // <2>
        throw causedBy(unknownError(error), 'Invalid user id {{id}}', { // <3>
            id,
        });
    }
}

async function userResponse(request: FetchRequest): Promise<User> {
    return fetch(request.url, {
        method: request.method,
    });
}

async function user(id: string): Promise<User> {
    return Promise.resolve(id).then(userRequest).then(userResponse).catch(
        chained('Failed to load user {{id}}', { // <4>
            id,
        }),
    );
}
```

1. Use the `exception()` function to instantiate an initial `Exception` without previous errors.
2. Use the `unknownError()` function to wrap a possible non-`Error` value.
3. When you use a `try-catch` block,
   use the `causedBy()` function to create an `Exception` with a previous error.
4. Use the `chained()` function to create a callback to chain an `Error`
   (for example, in `Promise` or a `Result`).

When you want to output a chained `Exception`,
you can use the `Exception.toString()` method.
For the example above, the output may look like this:

```
Exception: Failed to load user `A`
    - Exception: Invalid user id `A`
    - Exception: Input `A` is not a number
```

If you want to log an `Exception` for debugging purposes, use the `chainedStack()` function.
It will return a similar chain of messages as above,
but each message will also contain a stack trace for each error.

Read more about the functions to handle the built-in JS errors and the `Exception` class in the
[`@perfective/common/error`](https://github.com/perfective/ts.common/tree/main/src/error/index.adoc) package docs.

## Packages

Packages are organized and named around their primary type:

-   [`@perfective/common`](https://github.com/perfective/ts.common/blob/main/src/value/index.adoc)
    — functions and types to handle types (e.g., `TypeGuard` interface), `null`, `undefined`, and `void` values.
-   [`@perfective/common/array`](https://github.com/perfective/ts.common/tree/main/src/array/index.adoc)
    — functions and types for handling
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
    — functions and types for handling the
    [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) class.
-   [`@perfective/common/promise`](https://github.com/perfective/ts.common/tree/main/src/promise/index.adoc)
    — functions and types to handle the
    [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) class.
-   [`@perfective/common/result`](https://github.com/perfective/ts.common/tree/main/src/result/index.adoc)
    — a `Result` monad ([Result type](https://en.wikipedia.org/wiki/Result_type)) implementation.
-   [`@perfective/common/string`](https://github.com/perfective/ts.common/tree/main/src/string/index.adoc)
    — functions and types to handle
    [strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

The packages have full unit test coverage.

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
