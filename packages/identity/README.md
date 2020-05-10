# Identity Monad

`@perfective/identity` provides an `Identity` class which implements an identity monad.
`Identity` class satisfies the three monad laws
and provides the `onto()` method as a bind operator.
Its instance can be instantiated with the `identity()` or `take()` unit functions.
These functions are virtually the same,
and picking either of them can be based on code style.

Read the [full documentation](https://github.com/perfective/js/blob/master/packages/identity/README.adoc) 
in the repository.
