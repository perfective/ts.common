import { fail } from './error';
import {
    Maybe,
    Nullary,
    Predicate,
    fallbackTo,
    just,
    maybe,
    maybeOf,
    nil,
    nothing,
    nullable,
    optional,
} from './maybe';
import { isDefined, isNotNull, isNull, isPresent, isUndefined } from './value';

function isGreaterThan(value: number): Predicate<number> {
    return (input: number): boolean => input > value;
}

function isLessThan(value: number): Predicate<number> {
    return (input: number): boolean => input < value;
}

function decimal(value: number): string {
    return value.toString(10);
}

function justDecimal(value: number): Maybe<string> {
    return just(value).then(decimal);
}

function split(value: string): Maybe<Array<string>> {
    return just(value.split('.'));
}

function constant<T>(value: T): Nullary<T> {
    return (): T => value;
}

interface Boxed<T> {
    value?: T;
}

describe('maybe', () => {
    it('equals just() when value is present', () => {
        expect(maybe(3.14)).toEqual(just(3.14));
    });

    it('equals none() when value is undefined', () => {
        expect(maybe<number>()).toEqual(nothing());
    });

    it('equals nil() when value is null', () => {
        expect(maybe<number>(null)).toEqual(nil());
    });
});

describe('optional', () => {
    it('equals just() when value is present', () => {
        expect(optional(3.14)).toEqual(just(3.14));
    });

    it('equals none() when value is undefined', () => {
        expect(optional<number>()).toEqual(nothing());
    });
});

describe('nullable', () => {
    it('equals just() when value is present', () => {
        expect(nullable(3.14)).toEqual(just(3.14));
    });

    it('equals nil() when value is null', () => {
        expect(nullable<number>(null)).toEqual(nil());
    });
});

describe('just', () => {
    describe('then', () => {
        it('satisfies left identity monad law', () => {
            expect(just(3.14).then(justDecimal))
                .toEqual(justDecimal(3.14));
        });

        it('satisfies right identity monad law', () => {
            expect(just(3.14).then(maybe))
                .toEqual(just(3.14));
        });

        it('satisfies associativity monad law', () => {
            expect(just(3.14).then(x => justDecimal(x).then(split)))
                .toEqual(just(3.14).then(justDecimal).then(split));
        });

        it('wraps non-Maybe values into Maybe', () => {
            expect(just(3.14).then(decimal))
                .toEqual(just('3.14'));
        });
    });

    describe('that', () => {
        it('keeps the value when condition holds', () => {
            expect(just(3.14).that(isGreaterThan(2.71)))
                .toEqual(just(3.14));
        });

        it('filters out the value when condition fails', () => {
            expect(just(3.14).that(isLessThan(2.71)))
                .toEqual(nothing());
        });
    });

    describe('pick', () => {
        it('returns an existing property from an object', () => {
            expect(just<Boxed<number>>({ value: 3.14 }).pick('value'))
                .toEqual(just(3.14));
        });

        it('returns none for a missing property from an object', () => {
            expect(just<Boxed<number>>({}).pick('value'))
                .toEqual(nothing());
        });
    });

    describe('otherwise', () => {
        it('returns the Maybe value when fallback is constant', () => {
            expect(just(3.14).otherwise(2.71))
                .toEqual(3.14);
        });

        it('returns the Maybe value when fallback is a callback', () => {
            expect(just(3.14).otherwise(constant(2.71)))
                .toEqual(3.14);
        });

        it('does not throw an error', () => {
            expect(() => just(3.14).otherwise(fail('Value is not present')))
                .not.toThrowError('Value is not present');
        });
    });

    describe('or', () => {
        it('returns the Maybe value instead of null', () => {
            expect(just(3.14).or(null))
                .toEqual(3.14);
        });

        it('returns the Maybe value instead of undefined', () => {
            expect(just(3.14).or(undefined))
                .toEqual(3.14);
        });
    });

    describe('maybe', () => {
        it('passes defined value as is', () => {
            expect(just(3.14).maybe(isPresent))
                .toEqual(just(true));
        });
    });

    describe('optional', () => {
        it('passes defined value as is', () => {
            expect(just(3.14).optional(isPresent))
                .toEqual(just(true));
        });
    });

    describe('nullable', () => {
        it('passes defined value as is', () => {
            expect(just(3.14).nullable(isPresent))
                .toEqual(just(true));
        });
    });
});

describe('nothing', () => {
    describe('then', () => {
        it('satisfies left identity monad law for an undefined value', () => {
            expect(nothing<number>().then(justDecimal))
                .toEqual(nothing());
        });

        it('satisfies right identity monad law', () => {
            expect(nothing<number>().then(maybe))
                .toEqual(nothing());
        });

        it('satisfies associativity monad law', () => {
            expect(nothing<number>().then(x => justDecimal(x).then(split)))
                .toEqual(maybe<number>().then(justDecimal).then(split));
        });

        it('wraps non-Maybe values into Maybe', () => {
            expect(nothing<number>().then<string>(decimal).value)
                .toBeUndefined();
        });
    });

    describe('that', () => {
        it('remains none when condition holds', () => {
            expect(nothing<number>().that(isUndefined).value)
                .toBeUndefined();
        });

        it('keeps none when condition fails', () => {
            expect(nothing<number>().that(isDefined).value)
                .toBeUndefined();
        });
    });

    describe('pick', () => {
        it('returns none for a property from on a missing object', () => {
            expect(nothing<Boxed<number>>().pick('value'))
                .toEqual(nothing());
        });
    });

    describe('otherwise', () => {
        it('returns a fallback value when fallback is constant', () => {
            expect(nothing<number>().otherwise(2.71))
                .toEqual(2.71);
        });

        it('returns a result of the fallback callback', () => {
            expect(nothing<number>().otherwise(constant(2.71)))
                .toEqual(2.71);
        });

        it('allows to throw an error', () => {
            expect(() => nothing<number>().otherwise(fail('Value is not present')))
                .toThrowError('Value is not present');
        });
    });

    describe('or', () => {
        it('returns undefined', () => {
            expect(nothing<number>().or(undefined))
                .toBeUndefined();
        });

        it('returns null instead of undefined', () => {
            expect(nothing<number>().or(null))
                .toBeNull();
        });
    });

    describe('maybe', () => {
        it('passes the undefined value', () => {
            expect(nothing<number>().maybe(isUndefined))
                .toEqual(just(true));
        });
    });

    describe('optional', () => {
        it('passes the undefined value', () => {
            expect(nothing<number>().optional(isUndefined))
                .toEqual(just(true));
        });
    });

    describe('nullable', () => {
        it('skips the undefined value', () => {
            expect(nothing<number>().nullable(isUndefined))
                .toEqual(nothing());
        });
    });
});

describe('nil', () => {
    describe('then', () => {
        it('satisfies left identity monad law for an undefined value', () => {
            expect(nil<number>().then(justDecimal))
                .toEqual(nothing());
        });

        it('satisfies right identity monad law', () => {
            expect(nil<number>().then(maybe))
                .toEqual(nothing());
        });

        it('satisfies associativity monad law', () => {
            expect(nil<number>().then(x => justDecimal(x).then(split)))
                .toEqual(nil<number>().then(justDecimal).then(split));
        });

        it('wraps non-Maybe values into Maybe', () => {
            expect(nil<number>().then(decimal))
                .toEqual(nothing());
        });
    });

    describe('that', () => {
        it('remains none when condition holds', () => {
            expect(nil<number>().that(isNull))
                .toEqual(nothing());
        });

        it('keeps none when condition fails', () => {
            expect(nil<number>().that(isNotNull))
                .toEqual(nothing());
        });
    });

    describe('pick', () => {
        it('returns none for a property from on a missing object', () => {
            expect(nil<Boxed<number>>().pick('value'))
                .toEqual(nothing());
        });
    });

    describe('otherwise', () => {
        it('returns a fallback value when fallback is a constant', () => {
            expect(nil<number>().otherwise(2.71))
                .toEqual(2.71);
        });

        it('returns a result of the fallback callback', () => {
            expect(nil<number>().otherwise(constant(2.71)))
                .toEqual(2.71);
        });

        it('allows to throw an error', () => {
            expect(() => nil<number>().otherwise(fail('Value is not present')))
                .toThrowError('Value is not present');
        });
    });

    describe('or', () => {
        it('returns undefined instead of null', () => {
            expect(nil<number>().or(undefined))
                .toBeUndefined();
        });

        it('returns null', () => {
            expect(nil<number>().or(null))
                .toBeNull();
        });
    });

    describe('maybe', () => {
        it('passes the null value', () => {
            expect(nil<number>().maybe(isNull))
                .toEqual(just(true));
        });
    });

    describe('optional', () => {
        it('skips the null value', () => {
            expect(nil<number>().optional(isNull))
                .toEqual(nothing());
        });
    });

    describe('nullable', () => {
        it('passes the null value', () => {
            expect(nil<number>().nullable(isNull))
                .toEqual(just(true));
        });
    });
});

describe('maybeOf', () => {
    it('returns Maybe<T> when value is not Maybe', () => {
        expect(maybeOf(3.14))
            .toEqual(maybe(3.14));
    });

    it('returns Maybe<T> when value is Maybe', () => {
        expect(maybeOf(maybe(3.14)))
            .toEqual(maybe(3.14));
    });
});

describe('fallbackTo', () => {
    it('returns constant when value is constant', () => {
        expect(fallbackTo(3.14))
            .toEqual(3.14);
    });

    it('returns result of the fallback callback', () => {
        expect(fallbackTo(constant(3.14)))
            .toEqual(3.14);
    });
});
