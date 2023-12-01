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

**Using the [`Maybe`](https://github.com/perfective/ts.common/tree/main/src/maybe/index.adoc) monad,
you can write simpler and more readable functions**:

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
   provides a strictly typed "optional chaining" of the `Maybe.value` properties.
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

Read more about the `Maybe` monad and other
[`@perfective/common/maybe`](https://github.com/perfective/ts.common/blob/main/src/maybe/index.adoc) functions
in the [package documentation](https://github.com/perfective/ts.common/blob/main/src/maybe/index.adoc).

### Result monad

The [`@perfective/common/result`](https://github.com/perfective/ts.common/tree/main/src/result/index.adoc) package
provides the `Result` monad implementation
(as a concrete case of the Either monad).
It allows developers to increase the reliability of their code by treating errors as valid part of a function output.

A `Result` instance can be either a `Success` or a `Failure`.
If a `Result` is a `Success`, a computation proceeds to the next step.
In case of a `Failure`, all further computations are skipped until the recovery or exit from the computation.

The `Result` monad is similar to the `Maybe` monad,
but unlike `Maybe`, a `Result` contains a reason for its `Failure`.

The `Result` monad is also similar to the `Promise`
(as a `Promise` can either be "resolved" or "rejected").
But, unlike `Promise`, the `Result` chain is synchronous.

For example, consider you have an HTTP endpoint to return user data stored in the database.
The purpose of the endpoint is to map a given (unsafe) user ID input to a `User`.

_Assume you have the following functions_

```typescript
export interface User {
    // User data
}

/** Returns `true` if the active user has admin access. */
declare function hasAdminAccess(): boolean;

/** Builds an SQL query to load a user with a given `id`. */
declare function userByIdQuery(id: number): string;

/** Sends a given `sql` to the database and returns a User. */
declare function userQueryResult(sql: string): Promise<User>;

/** Logs a given error */
declare function logError(error: Error): void;
```

If you write regular imperative code you may have something like this:

```typescript
/** @throws Error if a given id is invalid. */
function validUserId(id: unknown): number {
    if (typeof id !== 'string') {
        throw new TypeError('Input must be a string');
    }

    const userId = decimal(id);
    if (userId === null) {
        throw new Error('Failed to parse user id');
    }
    if (!Number.isInteger(userId) || userId <= 0) {
        throw new Error('Invalid user id');
    }
    return userId;
}

async function userResponseById(id: unknown): Promise<User> {
    try {
        return userForQuery(
            userByIdQuery(
                validUserId(id), // (1)
            ),
        );
    } catch (error: unknown) {
        logError(error as Error);
        throw error as Error;
    }
}
```

1. Note that `validUserId()` indicates that it throws an error only as a JSDoc.
   TypeScript compiler does not check that the code should be wrapped into the `try-catch` block.

**Using the `Result` monad and functions from the `@perfective/common` subpackages you can write the same code as**:

```typescript
import { isNotNull } from '@perfective/common';
import { typeError } from '@perfective/common/error';
import { naught } from '@perfective/common/function';
import { decimal, isNonNegativeInteger } from '@perfective/common/number';
import { rejected } from '@perfective/common/promise';
import { Result, success } from '@perfective/common/result';
import { isString } from '@perfective/common/string';

function validUserId(id: unknown): Result<number> {
    return success(id)
        .which(isString, typeError('Input must be a string')) // (1)
        .to(decimal)
        .which(isNotNull, 'Failed to parse user ID') // (2)
        .that(isNonNegativeInteger, 'Invalid user ID'); // (3)
}

async function userResponseById(id: unknown): Promise<User> {
    return success(id)
        .when(hasAdminAccess, 'Access Denied') // (4)
        .onto(validUserId) // (5)
        .to(userByIdQuery)
        .through(naught, logError) // (6)
        .into(userForQuery, rejected); // (7)
}
```

1. [`Result.which()`](https://github.com/perfective/ts.common/tree/main/src/result/index.adoc#resultwhich)
   applies a type guard and narrows the `Result.value` type.
2. `decimal()` returns `number | null`, so another type guard is required.
3. [`Result.that()`](https://github.com/perfective/ts.common/tree/main/src/result/index.adoc#resultthat)
   checks if the `Success.value` satisfies a given predicate.
4. [`Result.when()`](https://github.com/perfective/ts.common/tree/main/src/result/index.adoc#resultwhen)
   checks an external condition.
5. [`Result.onto()`](https://github.com/perfective/ts.common/tree/main/src/result/index.adoc#resultonto)
   allows a different `Result` object to be returned
   (in this case, the `Result` of the `validUserId()` function).
6. [`Result.through()`](https://github.com/perfective/ts.common/tree/main/src/result/index.adoc#resultthrough)
   runs a given procedure
   (a no-op `naught()` function for the `Success`).
7. [`Result.into()`](https://github.com/perfective/ts.common/tree/main/src/result/index.adoc#resultinto)
   allows the completion (folding) of the `Result` chain computation and switch to a different type.

In addition to the methods used in the example above,
the `Result` monad also provides
[`Result.or()`](https://github.com/perfective/ts.common/tree/main/src/result/index.adoc#resultor) and
[`Result.otherwise()`](https://github.com/perfective/ts.common/tree/main/src/result/index.adoc#resultotherwise) methods.

Read more about the `Result` monad and other
[`@perfective/common/result`](https://github.com/perfective/ts.common/tree/main/src/result/index.adoc) functions in the
[package documentation](https://github.com/perfective/ts.common/tree/main/src/result/index.adoc).

### Chained Exceptions

The ECMA `Error` class does not store a previous error.
This is inconvenient, as it requires either manually adding a previous error message to a new error.
Or worse, skip providing the previous error altogether.

Chaining previous errors is helpful for debugging.
Especially in async environments, when most of the stack trace is full of useless function calls like `next()`
or on the frontend with packed code and renamed functions.

The [`@perfective/common/error`](https://github.com/perfective/ts.common/tree/main/src/error/index.adoc) package
provides the `Exception` class
to make logging and debugging of production code easier.
It supports three features:

-   providing a previous error (allows to stack errors);
-   using a message template with string tokens (allows to localize and format messages);
-   storing additional context (simplifies logging and debugging).

.Using the `Exception` class and its constructors.

```
import { caughtError, causedBy, chained, exception } from '@perfective/common/error';

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
        throw causedBy(caughtError(error), 'Invalid user id {{id}}', { // <3>
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
2. Use the `caughtError()` function to wrap a possible non-`Error` value.
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
[`@perfective/common/error`](https://github.com/perfective/ts.common/tree/main/src/error/index.adoc) package documentation.

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
-   [`@perfective/common/date`](https://github.com/perfective/ts.common/tree/main/src/date/index.adoc)
    — functions and types to handle
    [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) values.
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

## Roadmap

The [`ROADMAP.adoc`](https://github.com/perfective/ts.common/blob/main/ROADMAP.adoc) file describes
how built-in JavaScript objects and methods are covered by the `@perfective/common` package.

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
