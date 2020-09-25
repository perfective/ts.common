# Match

The `@perfective/match` package provides functions and types for the pattern matching.

* `match<T>(value: T | Nullary<T>): Match<T>`
    * `Match.that<U>(...statements: Statement<T, U>[]): Maybe<U>`
    * `Match.to<U>(statements: Statement<T, U>[]): Maybe<U>`
    — applies the given value to the `Statement.condition` predicate until the first one match,
    returns the result of applying the value to the `Statement.evaluate` function;
    when match is not found, returns `Nothing`.
* `when<T>(condition: T | Predicate<T>): When<T>`
— `Statement<T, U>` builder;
    * `then<U>(value: U | Unary<T, U>): Statement<T, U>`

Read the [full documentation](https://github.com/perfective/js/blob/master/packages/match/README.adoc) 
in the repository.
