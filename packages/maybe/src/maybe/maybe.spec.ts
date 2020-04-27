import { panic } from './error';
import {
    Maybe,
    Nullary,
    fallbackTo,
    just,
    maybe,
    maybeOf,
    nil,
    nothing,
    nullable,
    optional,
} from './maybe';
import { Predicate, isDefined, isNotNull, isNull, isPresent, isUndefined } from './value';

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

function split(value: string): Maybe<string[]> {
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
        expect(maybe(3.14))
            .toStrictEqual(just(3.14));
    });

    it('equals nothing() when value is undefined', () => {
        expect(maybe<number>(undefined))
            .toStrictEqual(nothing());
    });

    it('equals nil() when value is null', () => {
        expect(maybe<number>(null))
            .toStrictEqual(nil());
    });
});

describe('optional', () => {
    it('equals just() when value is present', () => {
        expect(optional(3.14))
            .toStrictEqual(just(3.14));
    });

    it('equals nothing() when value is undefined', () => {
        expect(optional<number>())
            .toStrictEqual(nothing());
    });
});

describe('nullable', () => {
    it('equals just() when value is present', () => {
        expect(nullable(3.14))
            .toStrictEqual(just(3.14));
    });

    it('equals nil() when value is null', () => {
        expect(nullable<number>(null))
            .toStrictEqual(nil());
    });
});

describe('just', () => {
    describe('then', () => {
        it('satisfies left identity monad law', () => {
            expect(just(3.14).then(justDecimal))
                .toStrictEqual(justDecimal(3.14));
        });

        it('satisfies right identity monad law', () => {
            expect(just(3.14).then(maybe))
                .toStrictEqual(just(3.14));
        });

        it('satisfies associativity monad law', () => {
            expect(just(3.14).then(x => justDecimal(x).then(split)))
                .toStrictEqual(just(3.14).then(justDecimal).then(split));
        });

        it('wraps non-Maybe values into Maybe', () => {
            expect(just(3.14).then(decimal))
                .toStrictEqual(just('3.14'));
        });
    });

    describe('that', () => {
        it('keeps the value when condition holds', () => {
            expect(just(3.14).that(isGreaterThan(2.71)))
                .toStrictEqual(just(3.14));
        });

        it('filters out the value when condition fails', () => {
            expect(just(3.14).that(isLessThan(2.71)))
                .toStrictEqual(nothing());
        });
    });

    describe('pick', () => {
        it('returns an existing property from an object', () => {
            expect(just<Boxed<number>>({ value: 3.14 }).pick('value'))
                .toStrictEqual(just(3.14));
        });

        it('returns nothing for a missing property from an object', () => {
            expect(just<Boxed<number>>({}).pick('value'))
                .toStrictEqual(nothing());
        });
    });

    describe('index', () => {
        it('returns an existing element from an array', () => {
            expect(maybe([2.71, 3.14]).index(0))
                .toStrictEqual(just(2.71));
            expect(maybe([2.71, 3.14]).index(1))
                .toStrictEqual(just(3.14));
        });

        it('returns nothing for a missing elements from an array', () => {
            expect(maybe([2.71, 3.14]).index(2))
                .toStrictEqual(nothing());
            expect(maybe([2.71, 3.14]).index(-1))
                .toStrictEqual(nothing());
        });
    });

    describe('otherwise', () => {
        it('returns the Maybe value when fallback is constant', () => {
            expect(just(3.14).otherwise(2.71))
                .toStrictEqual(3.14);
        });

        it('returns the Maybe value when fallback is a callback', () => {
            expect(just(3.14).otherwise(constant(2.71)))
                .toStrictEqual(3.14);
        });

        it('does not throw an error', () => {
            expect(() => just(3.14).otherwise(panic('Value is not present')))
                .not.toThrow('Value is not present');
        });
    });

    describe('or', () => {
        it('returns the Maybe value when fallback is constant', () => {
            expect(just(3.14).or(2.71))
                .toStrictEqual(3.14);
        });

        it('returns the Maybe value when fallback is a callback', () => {
            expect(just(3.14).or(constant(2.71)))
                .toStrictEqual(3.14);
        });

        it('returns the Maybe value instead of null', () => {
            expect(just(3.14).or(null))
                .toStrictEqual(3.14);
        });

        it('returns the Maybe value instead of undefined', () => {
            expect(just(3.14).or(undefined))
                .toStrictEqual(3.14);
        });

        it('does not throw an error', () => {
            expect(() => just(3.14).or(panic('Value is not present')))
                .not.toThrow('Value is not present');
        });
    });

    describe('maybe', () => {
        it('passes defined value as is', () => {
            expect(just(3.14).maybe(isPresent))
                .toStrictEqual(just(true));
        });
    });

    describe('optional', () => {
        it('passes defined value as is', () => {
            expect(just(3.14).optional(isPresent))
                .toStrictEqual(just(true));
        });
    });

    describe('nullable', () => {
        it('passes defined value as is', () => {
            expect(just(3.14).nullable(isPresent))
                .toStrictEqual(just(true));
        });
    });
});

describe('nothing', () => {
    describe('then', () => {
        it('satisfies left identity monad law for an undefined value', () => {
            expect(nothing<number>().then(justDecimal))
                .toStrictEqual(nothing());
        });

        it('satisfies right identity monad law', () => {
            expect(nothing<number>().then(maybe))
                .toStrictEqual(nothing());
        });

        it('satisfies associativity monad law', () => {
            expect(nothing<number>().then(x => justDecimal(x).then(split)))
                .toStrictEqual(nothing<number>().then(justDecimal).then(split));
        });

        it('wraps non-Maybe values into Maybe', () => {
            expect(nothing<number>().then<string>(decimal).value)
                .toBeUndefined();
        });
    });

    describe('that', () => {
        it('remains nothing when condition holds', () => {
            expect(nothing<number>().that(isUndefined))
                .toStrictEqual(nothing());
        });

        it('remains nothing when condition fails', () => {
            expect(nothing<number>().that(isDefined))
                .toStrictEqual(nothing());
        });
    });

    describe('pick', () => {
        it('returns nothing for a property from on a missing object', () => {
            expect(nothing<Boxed<number>>().pick('value'))
                .toStrictEqual(nothing());
        });
    });

    describe('index', () => {
        it('returns nothing for a missing elements from an array', () => {
            expect(nothing<number[]>().index(0))
                .toStrictEqual(nothing());
        });
    });

    describe('otherwise', () => {
        it('returns a fallback value when fallback is constant', () => {
            expect(nothing<number>().otherwise(2.71))
                .toStrictEqual(2.71);
        });

        it('returns a result of the fallback callback', () => {
            expect(nothing<number>().otherwise(constant(2.71)))
                .toStrictEqual(2.71);
        });

        it('allows to throw an error', () => {
            expect(() => nothing<number>().otherwise(panic('Value is not present')))
                .toThrow('Value is not present');
        });
    });

    describe('or', () => {
        it('returns a fallback value when fallback is constant', () => {
            expect(nothing().or(2.71))
                .toStrictEqual(2.71);
        });

        it('returns a result of the fallback callback', () => {
            expect(nothing().or(constant(2.71)))
                .toStrictEqual(2.71);
        });

        it('returns undefined', () => {
            expect(nothing<number>().or(undefined))
                .toBeUndefined();
        });

        it('returns null instead of undefined', () => {
            expect(nothing<number>().or(null))
                .toBeNull();
        });

        it('allows to throw an error', () => {
            expect(() => nothing<number>().or(panic('Value is not present')))
                .toThrow('Value is not present');
        });
    });

    describe('maybe', () => {
        it('passes the undefined value', () => {
            expect(nothing<number>().maybe(isUndefined))
                .toStrictEqual(just(true));
        });
    });

    describe('optional', () => {
        it('passes the undefined value', () => {
            expect(nothing<number>().optional(isUndefined))
                .toStrictEqual(just(true));
        });
    });

    describe('nullable', () => {
        it('skips the undefined value', () => {
            expect(nothing<number>().nullable(isUndefined))
                .toStrictEqual(nothing());
        });
    });
});

describe('nil', () => {
    describe('then', () => {
        it('satisfies left identity monad law for an undefined value', () => {
            expect(nil<number>().then(justDecimal))
                .toStrictEqual(nothing());
        });

        it('satisfies right identity monad law', () => {
            expect(nil<number>().then(maybe))
                .toStrictEqual(nothing());
        });

        it('satisfies associativity monad law', () => {
            expect(nil<number>().then(x => justDecimal(x).then(split)))
                .toStrictEqual(nil<number>().then(justDecimal).then(split));
        });

        it('wraps non-Maybe values into Maybe', () => {
            expect(nil<number>().then(decimal))
                .toStrictEqual(nothing());
        });
    });

    describe('that', () => {
        it('remains nil when condition holds', () => {
            expect(nil<number>().that(isNull))
                .toStrictEqual(nil());
        });

        it('remains nil when condition fails', () => {
            expect(nil<number>().that(isNotNull))
                .toStrictEqual(nil());
        });
    });

    describe('pick', () => {
        it('returns nothing for a property from on a missing object', () => {
            expect(nil<Boxed<number>>().pick('value'))
                .toStrictEqual(nothing());
        });
    });

    describe('index', () => {
        it('returns nothing for a missing elements from an array', () => {
            expect(nil<number[]>().index(0))
                .toStrictEqual(nothing());
        });
    });

    describe('otherwise', () => {
        it('returns a fallback value when fallback is a constant', () => {
            expect(nil<number>().otherwise(2.71))
                .toStrictEqual(2.71);
        });

        it('returns a result of the fallback callback', () => {
            expect(nil<number>().otherwise(constant(2.71)))
                .toStrictEqual(2.71);
        });

        it('allows to throw an error', () => {
            expect(() => nil<number>().otherwise(panic('Value is not present')))
                .toThrow('Value is not present');
        });
    });

    describe('or', () => {
        it('returns a fallback value when fallback is a constant', () => {
            expect(nil<number>().or(2.71))
                .toStrictEqual(2.71);
        });

        it('returns a result of the fallback callback', () => {
            expect(nil<number>().or(constant(2.71)))
                .toStrictEqual(2.71);
        });

        it('returns undefined instead of null', () => {
            expect(nil<number>().or(undefined))
                .toBeUndefined();
        });

        it('returns null', () => {
            expect(nil<number>().or(null))
                .toBeNull();
        });

        it('allows to throw an error', () => {
            expect(() => nil<number>().or(panic('Value is not present')))
                .toThrow('Value is not present');
        });
    });

    describe('maybe', () => {
        it('passes the null value', () => {
            expect(nil<number>().maybe(isNull))
                .toStrictEqual(just(true));
        });
    });

    describe('optional', () => {
        it('skips the null value', () => {
            expect(nil<number>().optional(isNull))
                .toStrictEqual(nothing());
        });
    });

    describe('nullable', () => {
        it('passes the null value', () => {
            expect(nil<number>().nullable(isNull))
                .toStrictEqual(just(true));
        });
    });
});

describe('maybeOf', () => {
    it('returns Maybe<T> when value is not Maybe', () => {
        expect(maybeOf(3.14))
            .toStrictEqual(maybe(3.14));
    });

    it('returns Maybe<T> when value is Maybe', () => {
        expect(maybeOf(maybe(3.14)))
            .toStrictEqual(maybe(3.14));
    });
});

describe('fallbackTo', () => {
    it('returns constant when value is constant', () => {
        expect(fallbackTo(3.14))
            .toStrictEqual(3.14);
    });

    it('returns result of the fallback callback', () => {
        expect(fallbackTo(constant(3.14)))
            .toStrictEqual(3.14);
    });
});
