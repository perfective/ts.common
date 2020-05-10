import { panic } from '../error/error';
import {
    absentProperty,
    definedProperty,
    notNullProperty,
    nullProperty,
    presentProperty,
    undefinedProperty,
} from '../value/property';
import { Predicate, isDefined, isNotNull, isNull, isPresent, isUndefined } from '../value/value';

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
    return just(value).to(decimal);
}

function split(value: string): Maybe<string[]> {
    return just(value.split('.'));
}

function constant<T>(value: T): Nullary<T> {
    return (): T => value;
}

interface Boxed<T> {
    readonly value?: T | null | undefined;
}

type Matrix = readonly (readonly (number | null | undefined)[])[];

interface TypeGuardCheck<T> {
    readonly required: T;
    readonly optional?: T;
    readonly option: T | undefined;
    readonly nullable: T | null;
    readonly maybe: T | null | undefined;
    readonly possible?: T | null | undefined;
}

const check: TypeGuardCheck<number> = {
    required: 3.14,
    option: undefined,
    nullable: 0,
    maybe: 2.71,
    possible: null,
};

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
        expect(optional<number>(undefined))
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
    describe('value', () => {
        it('is a required value', () => {
            expect(just<number>(3.14).value)
                .toStrictEqual(3.14);
        });
    });

    describe('onto', () => {
        it('satisfies left identity monad law', () => {
            expect(just(3.14).onto(justDecimal))
                .toStrictEqual(justDecimal(3.14));
        });

        it('satisfies right identity monad law', () => {
            expect(just(3.14).onto(maybe))
                .toStrictEqual(just(3.14));
        });

        it('satisfies associativity monad law', () => {
            expect(just(3.14).onto(x => justDecimal(x).onto(split)))
                .toStrictEqual(just(3.14).onto(justDecimal).onto(split));
        });
    });

    describe('to', () => {
        it('returns Just next value when the bind function returns a present value', () => {
            expect(just(3.14).to(decimal))
                .toStrictEqual(just(decimal(3.14)));
        });

        it('returns Nothing when the bind function returns undefined', () => {
            expect(just(3.14).to(() => undefined))
                .toStrictEqual(nothing());
        });

        it('returns Nil when the bind function returns null', () => {
            expect(just(3.14).to(() => null))
                .toStrictEqual(nil());
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

    describe('with', () => {
        it('returns just() when value passes the type guard', () => {
            expect(just(check).with(definedProperty('required')))
                .toStrictEqual(just(check));
            expect(just(check).with(undefinedProperty('optional')))
                .toStrictEqual(just(check));
            expect(just(check).with(notNullProperty('nullable')))
                .toStrictEqual(just(check));
            expect(just(check).with(nullProperty('possible')))
                .toStrictEqual(just(check));
            expect(just(check).with(presentProperty('maybe')))
                .toStrictEqual(just(check));
            expect(just(check).with(absentProperty('option')))
                .toStrictEqual(just(check));
        });

        it('returns nothing() when value fails the type guard', () => {
            expect(just(check).with(undefinedProperty('required')))
                .toStrictEqual(nothing());
            expect(just(check).with(definedProperty('optional')))
                .toStrictEqual(nothing());
            expect(just(check).with(nullProperty('nullable')))
                .toStrictEqual(nothing());
            expect(just(check).with(notNullProperty('possible')))
                .toStrictEqual(nothing());
            expect(just(check).with(absentProperty('maybe')))
                .toStrictEqual(nothing());
            expect(just(check).with(presentProperty('option')))
                .toStrictEqual(nothing());
        });

        it('combines checked properties', () => {
            expect(
                just(check)
                    .with(definedProperty('required'))
                    .with(definedProperty('option'))
                    .to(v => `${v.required.toString(10)}:${v.option.toString(10)}`),
            ).toStrictEqual(
                just(check)
                    .with(definedProperty('required', 'option'))
                    .to(v => `${v.required.toString(10)}:${v.option.toString(10)}`),
            );
        });
    });

    describe('when', () => {
        it('keeps the value when an outside condition holds', () => {
            expect(just(3.14).when(true))
                .toStrictEqual(just(3.14));
            expect(just(3.14).when(() => true))
                .toStrictEqual(just(3.14));
        });

        it('filters out the value when an outside condition fails', () => {
            expect(just(3.14).when(false))
                .toStrictEqual(nothing());
            expect(just(3.14).when(() => false))
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

        it('is an equivalent of the then() chain', () => {
            const boxed: Boxed<Boxed<number>> = {
                value: {
                    value: 3.14,
                },
            };
            expect(
                just(boxed)
                    .pick('value')
                    .pick('value')
                    .to(v => v.toString(10)),
            ).toStrictEqual(
                just(boxed)
                    .to(b => b.value)
                    .to(v => v.value)
                    .to(v => v.toString(10)),
            );
        });
    });

    describe('index', () => {
        it('returns an existing element from an array', () => {
            expect(just([2.71, 3.14]).index(0))
                .toStrictEqual(just(2.71));
            expect(just([2.71, 3.14]).index(1))
                .toStrictEqual(just(3.14));
        });

        it('returns nothing for a missing elements from an array', () => {
            expect(just([2.71, 3.14]).index(2))
                .toStrictEqual(nothing());
            expect(just([2.71, 3.14]).index(-1))
                .toStrictEqual(nothing());
        });

        it('is an equivalent of the then() chain', () => {
            const matrix: Matrix = [[undefined, 3.14], [2.71, null]];
            expect(
                just(matrix)
                    .index(0)
                    .index(1)
                    .to(v => v.toString(10)),
            ).toStrictEqual(
                just(matrix)
                    .to(m => m[0])
                    .to(m => m[1])
                    .to(v => v.toString(10)),
            );
        });
    });

    describe('otherwise', () => {
        it('returns the Maybe value when fallback is constant', () => {
            expect(just(3.14).otherwise(2.71))
                .toStrictEqual(just(3.14));
        });

        it('returns the Maybe value when fallback is a callback', () => {
            expect(just(3.14).otherwise(constant(2.71)))
                .toStrictEqual(just(3.14));
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

        it('is interchangeable with otherwise().value', () => {
            expect(just(3.14).or(2.71))
                .toStrictEqual(just(3.14).otherwise(2.71).value);
        });
    });

    describe('lift', () => {
        it('applies the function to the plain monadic value', () => {
            expect(just(3.14).lift(isPresent))
                .toStrictEqual(just(true));
        });
    });
});

describe('nothing', () => {
    describe('value', () => {
        it('is an undefined value', () => {
            expect(nothing<number>().value)
                .toBeUndefined();
        });
    });

    describe('onto', () => {
        it('satisfies left identity monad law for an undefined value', () => {
            expect(nothing<number>().onto(justDecimal))
                .toStrictEqual(nothing());
        });

        it('satisfies right identity monad law', () => {
            expect(nothing<number>().onto(maybe))
                .toStrictEqual(nothing());
        });

        it('satisfies associativity monad law', () => {
            expect(nothing<number>().onto(x => justDecimal(x).onto(split)))
                .toStrictEqual(nothing<number>().onto(justDecimal).onto(split));
        });
    });

    describe('to', () => {
        it('skips the mapping function', () => {
            expect(nothing<number>().to<string>(decimal))
                .toStrictEqual(nothing());
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

    describe('with', () => {
        it('remains nothing() after value is checked by the type guard', () => {
            expect(nothing<TypeGuardCheck<number>>().with(presentProperty('maybe')))
                .toStrictEqual(nothing());
        });
    });

    describe('when', () => {
        it('remains nothing when an outside condition holds', () => {
            expect(nothing().when(true))
                .toStrictEqual(nothing());
            expect(nothing().when(() => true))
                .toStrictEqual(nothing());
        });

        it('remains nothing when an outside condition fails', () => {
            expect(nothing().when(false))
                .toStrictEqual(nothing());
            expect(nothing().when(() => false))
                .toStrictEqual(nothing());
        });
    });

    describe('pick', () => {
        it('is an equivalent of the then() chain', () => {
            expect(
                nothing<Boxed<Boxed<number>>>()
                    .pick('value')
                    .pick('value')
                    .to(v => v.toString(10)),
            ).toStrictEqual(
                nothing<Boxed<Boxed<number>>>()
                    .to(b => b.value)
                    .to(v => v.value)
                    .to(v => v.toString(10)),
            );
        });
    });

    describe('index', () => {
        it('returns nothing for a missing elements from an array', () => {
            expect(nothing<number[]>().index(0))
                .toStrictEqual(nothing());
        });

        it('is an equivalent of the then() chain', () => {
            expect(
                nothing<Matrix>()
                    .index(0)
                    .index(1)
                    .to(v => v.toString(10)),
            ).toStrictEqual(
                nothing<Matrix>()
                    .to(m => m[0])
                    .to(m => m[1])
                    .to(v => v.toString(10)),
            );
        });
    });

    describe('otherwise', () => {
        it('returns a fallback value when fallback is constant', () => {
            expect(nothing<number>().otherwise(2.71))
                .toStrictEqual(just(2.71));
        });

        it('returns a result of the fallback callback', () => {
            expect(nothing<number>().otherwise(constant(2.71)))
                .toStrictEqual(just(2.71));
        });

        it('allows to throw an error', () => {
            expect(() => nothing<number>().otherwise(panic('Value is not present')))
                .toThrow('Value is not present');
        });
    });

    describe('or', () => {
        it('returns a fallback value when fallback is constant', () => {
            expect(nothing<number>().or(2.71))
                .toStrictEqual(2.71);
        });

        it('returns a result of the fallback callback', () => {
            expect(nothing<number>().or(constant(2.71)))
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

        it('is interchangeable with otherwise().value', () => {
            expect(nothing<number>().or(2.71))
                .toStrictEqual(nothing<number>().otherwise(2.71).value);
        });
    });

    describe('lift', () => {
        it('applies the function to the plain monadic value', () => {
            expect(nothing().lift(isUndefined))
                .toStrictEqual(just(true));
        });
    });
});

describe('nil', () => {
    describe('value', () => {
        it('is a null value', () => {
            expect(nil<number>().value)
                .toBeNull();
        });
    });

    describe('onto', () => {
        it('satisfies left identity monad law for an undefined value', () => {
            expect(nil<number>().onto(justDecimal))
                .toStrictEqual(nil());
        });

        it('satisfies right identity monad law', () => {
            expect(nil<number>().onto(maybe))
                .toStrictEqual(nil());
        });

        it('satisfies associativity monad law', () => {
            expect(nil<number>().onto(x => justDecimal(x).onto(split)))
                .toStrictEqual(nil<number>().onto(justDecimal).onto(split));
        });
    });

    describe('to', () => {
        it('skips the mapping function', () => {
            expect(nil<number>().to<string>(decimal))
                .toStrictEqual(nil());
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

    describe('with', () => {
        it('remains nothing() after value is checked by the type guard', () => {
            expect(nil<TypeGuardCheck<number>>().with(presentProperty('maybe')))
                .toStrictEqual(nil());
        });
    });

    describe('when', () => {
        it('remains nil when an outside condition holds', () => {
            expect(nil().when(true))
                .toStrictEqual(nil());
            expect(nil().when(() => true))
                .toStrictEqual(nil());
        });

        it('remains nil when an outside condition fails', () => {
            expect(nil().when(false))
                .toStrictEqual(nil());
            expect(nil().when(() => false))
                .toStrictEqual(nil());
        });
    });

    describe('pick', () => {
        it('returns nothing for a property from on a missing object', () => {
            expect(
                nil<Boxed<Boxed<number>>>()
                    .pick('value')
                    .pick('value')
                    .to(v => v.toString(10)),
            ).toStrictEqual(
                nil<Boxed<Boxed<number>>>()
                    .to(b => b.value)
                    .to(v => v.value)
                    .to(v => v.toString(10)),
            );
        });
    });

    describe('index', () => {
        it('returns nothing for a missing elements from an array', () => {
            expect(nil<number[]>().index(0))
                .toStrictEqual(nil());
        });

        it('is an equivalent of the then() chain', () => {
            expect(
                nil<Matrix>()
                    .index(0)
                    .index(1)
                    .to(v => v.toString(10)),
            ).toStrictEqual(
                nil<Matrix>()
                    .to(m => m[0])
                    .to(m => m[1])
                    .to(v => v.toString(10)),
            );
        });
    });

    describe('otherwise', () => {
        it('returns a fallback value when fallback is a constant', () => {
            expect(nil<number>().otherwise(2.71))
                .toStrictEqual(just(2.71));
        });

        it('returns a result of the fallback callback', () => {
            expect(nil<number>().otherwise(constant(2.71)))
                .toStrictEqual(just(2.71));
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

        it('is interchangeable with otherwise().value', () => {
            expect(nil<number>().or(2.71))
                .toStrictEqual(nil<number>().otherwise(2.71).value);
        });
    });

    describe('lift', () => {
        it('applies the function to the plain monadic value', () => {
            expect(nil().lift(isNull))
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
