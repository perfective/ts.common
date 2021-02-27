import { constant, Nullary } from '@perfective/fp';
import { hasAbsentProperty, hasPresentProperty } from '@perfective/object';
import { decimal, isGreaterThan, isLessThan } from '@perfective/real';
import { isPresent } from '@perfective/value';

import { Just, just, Maybe, maybe, naught, Nothing, nothing } from './maybe';
import { fallback } from './maybe.mock';
import { typeGuardCheck } from './type-guard-check.mock';

function maybeDecimal(value: number | null | undefined): Maybe<string> {
    return maybe(value).to<string>(decimal);
}

function maybeSplit(value: string | null | undefined): Maybe<string[]> {
    return maybe(value).to(v => v.split('.'));
}

describe(maybe, () => {
    describe('relations to three monad laws', () => {
        it('is a left-identity for Maybe.onto() as the "bind" operator', () => {
            // Left-identity: unit(a) >>= \x -> f(x) <=> f(a)
            expect(maybe(3.14).onto(maybeDecimal))
                .toStrictEqual(maybeDecimal(3.14));
            expect(maybe(null).onto(maybeDecimal))
                .toStrictEqual(maybeDecimal(null));
            expect(maybe(undefined).onto(maybeDecimal))
                .toStrictEqual(maybeDecimal(undefined));
        });

        it('is a right-identity for Maybe.onto() as the "bind" operator', () => {
            // Right-identity: ma >>= x -> unit(x) <=> ma
            expect(maybeDecimal(3.14).onto(maybe))
                .toStrictEqual(maybeDecimal(3.14));
            expect(maybeDecimal(null).onto(maybe))
                .toStrictEqual(maybeDecimal(null));
            expect(maybeDecimal(undefined).onto(maybe))
                .toStrictEqual(maybeDecimal(undefined));
        });

        it('has essentially associative Maybe.onto() as the "bind" operator', () => {
            // Associativity: ma >>= \x -> (f(x) >>= \y -> g(y)) <=> (ma >>= \x -> f(x) >>= \y -> g(y)
            expect(maybe(3.14).onto(x => maybeDecimal(x).onto(maybeSplit)))
                .toStrictEqual(maybe(3.14).onto(maybeDecimal).onto(maybeSplit));
            expect(maybe(null).onto(x => maybeDecimal(x).onto(maybeSplit)))
                .toStrictEqual(maybe(null).onto(maybeDecimal).onto(maybeSplit));
            expect(maybe(undefined).onto(x => maybeDecimal(x).onto(maybeSplit)))
                .toStrictEqual(maybe(undefined).onto(maybeDecimal).onto(maybeSplit));
        });
    });

    describe('when the value maybe be present or absent', () => {
        it('must be assigned to Maybe<T>', () => {
            const output: Maybe<number> = maybe(fallback(0));

            expect(output).toStrictEqual(just(0));
        });
    });

    describe('when the value is present', () => {
        it('creates Just<T> when value is present', () => {
            expect(maybe(3.14))
                .toStrictEqual(just(3.14));
        });

        it('cannot be assigned to Just<T>', () => {
            // TS2322: Type 'Maybe<number>' is not assignable to type 'Just<number>'.
            // @ts-expect-error -- Maybe can be Nothing
            const output: Just<number> = maybe(0);

            expect(output).toStrictEqual(just(0));
        });
    });

    describe('when the value is null', () => {
        it('returns the memoized "naught" Nothing<T>', () => {
            expect(maybe<number>(null))
                .toBe(naught());
        });

        it('cannot be assigned to Nothing<T>', () => {
            // TS2322: Type 'Maybe<number>' is not assignable to type 'Nothing<number>'.
            // @ts-expect-error -- Maybe can be Just.
            const output: Nothing<number> = maybe(null);

            expect(output).toBe(naught());
        });
    });

    describe('when the value is undefined', () => {
        it('returns the memoized "nothing" Nothing<T>', () => {
            expect(maybe<number>(undefined))
                .toBe(nothing());
        });

        it('cannot be assigned to Nothing<T>', () => {
            // TS2322: Type 'Maybe<number>' is not assignable to type 'Nothing<number>'.
            // @ts-expect-error -- Maybe can be Just.
            const output: Nothing<number> = maybe(undefined);

            expect(output).toBe(nothing());
        });
    });
});

describe(Maybe, () => {
    describe('value', () => {
        it('is an optional property and cannot be assigned to the value type', () => {
            // TS2322: Type 'number | null | undefined' is not assignable to type 'number'.
            // @ts-expect-error -- Maybe.value has to be assigned to "number | null | undefined".
            const value: number = maybe<number>(3.14).value;

            expect(value).toStrictEqual(3.14);
        });
    });

    describe('onto', () => {
        describe('when the "flatMap" function returns Maybe', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<string> = maybe(3.14).onto(constant(maybe('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe<string>' is not assignable to type 'Just<string>'.
                // @ts-expect-error -- Maybe.onto() returns either Just or Nothing.
                const output: Just<string> = maybe(3.14).onto(constant(maybe('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe<string>' is not assignable to type 'Nothing<string>'.
                // @ts-expect-error -- Maybe.onto() returns either Just or Nothing.
                const output: Nothing<string> = maybe(3.14).onto(constant(maybe('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });
        });

        describe('when the "flatMap" function returns Just', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<string> = maybe(3.14).onto(constant(just('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- Maybe.onto() returns either Just or Nothing.
                const output: Just<string> = maybe(3.14).onto(constant(just('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                // @ts-expect-error -- Maybe.onto() returns either Just or Nothing.
                const output: Nothing<string> = maybe(3.14).onto(constant(just('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });
        });

        describe('when the "flatMap" function returns Nothing(null)', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<string> = maybe(3.14).onto(constant(naught<string>()));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- Maybe.onto() returns either Just or Nothing.
                const output: Just<string> = maybe(3.14).onto(constant(naught<string>()));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                // @ts-expect-error -- Maybe.onto() returns either Just or Nothing.
                const output: Nothing<string> = maybe(3.14).onto(constant(naught<string>()));

                expect(output).toBe(naught());
            });
        });

        describe('when the "flatMap" function returns Nothing(undefined)', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<string> = maybe(3.14).onto(constant(nothing<string>()));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- Maybe.onto() returns either Just or Nothing
                const output: Just<string> = maybe(3.14).onto(constant(nothing<string>()));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- Maybe.onto() returns either Just or Nothing
                const output: Nothing<string> = maybe(3.14).onto(constant(nothing<string>()));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('to', () => {
        describe('when the "map" function returns a present or absent value', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<string> = maybe(3.14).to(constant(fallback('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- Maybe.to() returns either Just or Nothing.
                const output: Just<string> = maybe(3.14).to(constant(fallback('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                // @ts-expect-error -- Maybe.to() returns either Just or Nothing.
                const output: Nothing<string> = maybe(3.14).to(constant(fallback('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });
        });

        describe('when the "map" function returns a present value', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<string> = maybe(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- Maybe.to() returns either Just or Nothing.
                const output: Just<string> = maybe(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                // @ts-expect-error -- Maybe.to() returns either Just or Nothing.
                const output: Nothing<string> = maybe(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(just('3.14'));
            });
        });

        describe('when the "map" function returns null', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<string> = maybe(3.14).to<string>(constant(null));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- Maybe.to() returns either Just or Nothing.
                const output: Just<string> = maybe(3.14).to<string>(constant(null));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                // @ts-expect-error -- Maybe.to() returns either Just or Nothing.
                const output: Nothing<string> = maybe(3.14).to<string>(constant(null));

                expect(output).toBe(naught());
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<string> = maybe(3.14).to<string>(constant(undefined));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- Maybe.to() returns either Just or Nothing.
                const output: Just<string> = maybe(3.14).to<string>(constant(undefined));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- Maybe returns either Just or Nothing.
                const output: Nothing<string> = maybe(3.14).to<string>(constant(undefined));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('pick', () => {
        describe('when the property is required', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<number> = maybe(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- Maybe.pick() may not have a value to pick from.
                const output: Just<number> = maybe(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                // @ts-expect-error -- Maybe.pick() may not have a value to pick from.
                const output: Nothing<number> = maybe(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(just(3.14));
            });
        });

        describe('when the property can be absent', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<number> = maybe(typeGuardCheck).pick('possible');

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- Maybe.pick() may not have a value to pick from.
                const output: Just<number> = maybe(typeGuardCheck).pick('possible');

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- Maybe.pick() may not have a value to pick from.
                const output: Nothing<number> = maybe(typeGuardCheck).pick('possible');

                expect(output).toBe(naught());
            });
        });
    });

    describe('that', () => {
        describe('when the "filter" condition is true', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<number> = maybe(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                // @ts-expect-error -- Maybe.that() may return Nothing.
                const output: Just<number> = maybe(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- Maybe.that() may return Just.
                const output: Nothing<number> = maybe(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(just(3.14));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<number> = maybe(3.14).that(isLessThan(2.71));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- Maybe.that() may return Nothing.
                const output: Just<number> = maybe(3.14).that(isLessThan(2.71));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                // @ts-expect-error -- Maybe.that() may return Just.
                const output: Nothing<number> = maybe(3.14).that(isLessThan(2.71));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('which', () => {
        describe('when the "filter" type guard is true', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe<string>('3.14').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- Maybe.which() may return Nothing.
                const output: Just<string> = maybe<string>('3.14').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assign to Nothing', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                // @ts-expect-error -- Maybe.which() may return Just.
                const output: Nothing<string> = maybe<string>('3.14').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(just('3.14'));
            });
        });

        describe('when the "filter" type guard is false', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe<string>('3.14').which(hasAbsentProperty('length'));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- Maybe.which() may return Nothing.
                const output: Just<string> = maybe<string>('3.14').which(hasAbsentProperty('length'));

                expect(output).toBe(nothing());
            });

            it('cannot be assign to Nothing', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                // @ts-expect-error -- Maybe.which() may return Just.
                const output: Nothing<string> = maybe<string>('3.14').which(hasAbsentProperty('length'));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('when', () => {
        describe('when the "condition" is true', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<number> = maybe(3.14).when(constant(true));

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- Maybe.when() may return Nothing.
                const output: Just<number> = maybe(3.14).when(constant(true));

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                // @ts-expect-error -- Maybe.when() may return Just.
                const output: Nothing<number> = maybe(3.14).when(constant(true));

                expect(output).toStrictEqual(just(3.14));
            });
        });

        describe('when the "condition" is false', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<number> = maybe(3.14).when(constant(false));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- Maybe.when() may return Nothing.
                const output: Just<number> = maybe(3.14).when(constant(false));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                // @ts-expect-error -- Maybe.when() may return Just.
                const output: Nothing<number> = maybe(3.14).when(constant(false));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('otherwise', () => {
        describe('when the "fallback" is a present value', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = maybe<number>(undefined).otherwise(2.71);

                expect(output).toStrictEqual(just(2.71));
            });

            it('returns Just value', () => {
                const output: Just<number> = maybe<number>(undefined).otherwise(2.71);

                expect(output).toStrictEqual(just(2.71));
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Just<number>' is not assignable to type 'Nothing<number>'.
                // @ts-expect-error -- Maybe.otherwise() is always present if the fallback is present.
                const output: Nothing<number> = maybe<number>(undefined).otherwise(2.71);

                expect(output).toStrictEqual(just(2.71));
            });
        });

        describe('when the "fallback" function returns a present value', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = maybe<number>(null).otherwise(constant(2.71));

                expect(output).toStrictEqual(just(2.71));
            });

            it('returns Just value', () => {
                const output: Just<number> = maybe<number>(null).otherwise(constant(2.71));

                expect(output).toStrictEqual(just(2.71));
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Just<number>' is not assignable to type 'Nothing<number>'.
                // @ts-expect-error -- Maybe.otherwise() is always present if the fallback is present.
                const output: Nothing<number> = maybe<number>(null).otherwise(constant(2.71));

                expect(output).toStrictEqual(just(2.71));
            });
        });

        describe('when the "fallback" is null', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe<number>(undefined).otherwise(null);

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- When Maybe is present then Maybe.otherwise() returns Just.
                const output: Just<number> = maybe<number>(undefined).otherwise(null);

                expect(output).toBe(naught());
            });

            it('cannot be assigned to null', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                // @ts-expect-error -- When Maybe is present then Maybe.otherwise() returns Just.
                const output: Nothing<number> = maybe<number>(undefined).otherwise(null);

                expect(output).toBe(naught());
            });
        });

        describe('when the "fallback" returns null', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe<number>(undefined).otherwise(constant(null));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- When Maybe is present then Maybe.otherwise() returns Just.
                const output: Just<number> = maybe<number>(undefined).otherwise(constant(null));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to null', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                // @ts-expect-error -- When Maybe is present then Maybe.otherwise() returns Just.
                const output: Nothing<number> = maybe<number>(undefined).otherwise(constant(null));

                expect(output).toBe(naught());
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe<number>(null).otherwise(undefined);

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- When Maybe is present then Maybe.otherwise() returns Just.
                const output: Just<number> = maybe<number>(null).otherwise(undefined);

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to undefined', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                // @ts-expect-error -- When Maybe is present then Maybe.otherwise() returns Just.
                const output: Nothing<number> = maybe<number>(null).otherwise(undefined);

                expect(output).toBe(nothing());
            });
        });

        describe('wen the "fallback" returns undefined', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe<number>(null).otherwise(constant(undefined));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Just'.
                // @ts-expect-error -- When Maybe is present then Maybe.otherwise() returns Just.
                const output: Just<number> = maybe<number>(null).otherwise(constant(undefined));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to undefined', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                // @ts-expect-error -- When Maybe is present then Maybe.otherwise() returns Just.
                const output: Nothing<number> = maybe<number>(null).otherwise(constant(undefined));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('or', () => {
        describe('when the "fallback" is a present value', () => {
            it('can be assigned to the value type', () => {
                const output: number = maybe<number>(null).or(2.71);

                expect(output).toStrictEqual(2.71);
            });

            it('cannot be assigned to the null type', () => {
                // TS2322: Type 'number' is not assignable to type 'null'.
                // @ts-expect-error -- Maybe.or() always returns the given fallback value.
                const output: null = maybe<number>(null).or(2.71);

                expect(output).toStrictEqual(2.71);
            });

            it('cannot be assigned to the undefined type', () => {
                // TS2322: Type 'number' is not assignable to type 'undefined'.
                // @ts-expect-error -- Maybe.or() always returns the given fallback value.
                const output: undefined = maybe<number>(null).or(2.71);

                expect(output).toStrictEqual(2.71);
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to the value type', () => {
                const output: number = maybe<number>(undefined).or(constant(2.71));

                expect(output).toStrictEqual(2.71);
            });

            it('cannot be assigned to the null type', () => {
                // TS2322: Type 'number' is not assignable to type 'null'.
                // @ts-expect-error -- Maybe.or() always returns the given fallback value.
                const output: null = maybe<number>(undefined).or(constant(2.71));

                expect(output).toStrictEqual(2.71);
            });

            it('cannot be assigned to the undefined type', () => {
                // TS2322: Type 'number' is not assignable to type 'undefined'.
                // @ts-expect-error -- Maybe.or() always returns the given fallback value.
                const output: undefined = maybe<number>(undefined).or(constant(2.71));

                expect(output).toStrictEqual(2.71);
            });
        });

        describe('when the "fallback" may be an absent value', () => {
            it('must be assigned to the union of the value type, null, and undefined', () => {
                const output: number | null | undefined = maybe<number>(null).or(fallback(2.71));

                expect(output).toStrictEqual(2.71);
            });

            it('cannot be assigned to the value type', () => {
                // TS2322: Type 'number | null | undefined' is not assignable to type 'number'.
                // @ts-expect-error -- fallback() may also return null or undefined
                const output: number = maybe<number>(null).or(fallback(2.71));

                expect(output).toStrictEqual(2.71);
            });

            it('cannot be assigned to the union of the value type and null', () => {
                // TS2322: Type 'number | null | undefined' is not assignable to type 'number | null'.
                // @ts-expect-error -- fallback() may also return undefined
                const output: number | null = maybe<number>(null).or(fallback(2.71));

                expect(output).toStrictEqual(2.71);
            });

            it('cannot be assigned to the union of the value type and undefined', () => {
                // TS2322: Type 'number | null | undefined' is not assignable to type 'number | undefined'.
                // @ts-expect-error -- fallback() may also return null
                const output: number | undefined = maybe<number>(null).or(fallback(2.71));

                expect(output).toStrictEqual(2.71);
            });
        });

        describe('when the "fallback" may return an absent value', () => {
            it('must be assigned to the union of the value type, null, and undefined', () => {
                const output: number | null | undefined = maybe<number>(undefined).or(constant(fallback(2.71)));

                expect(output).toStrictEqual(2.71);
            });

            it('cannot be assigned to the value type', () => {
                // TS2322: Type 'number | null | undefined' is not assignable to type 'number'.
                // @ts-expect-error -- fallback() may also return null or undefined
                const output: number = maybe<number>(undefined).or(constant(fallback(2.71)));

                expect(output).toStrictEqual(2.71);
            });

            it('cannot be assigned to the union of the value type and null', () => {
                // TS2322: Type 'number | null | undefined' is not assignable to type 'number | null'.
                // @ts-expect-error -- fallback() may also return undefined
                const output: number | null = maybe<number>(undefined).or(constant(fallback(2.71)));

                expect(output).toStrictEqual(2.71);
            });

            it('cannot be assigned to the union of the value type and undefined', () => {
                // TS2322: Type 'number | null | undefined' is not assignable to type 'number | undefined'.
                // @ts-expect-error -- fallback() may also return null
                const output: number | undefined = maybe<number>(undefined).or(constant(fallback(2.71)));

                expect(output).toStrictEqual(2.71);
            });
        });
    });

    describe('run', () => {
        let pi: number = 3.14;

        // eslint-disable-next-line func-style -- conflicts with prefer-arrow
        const assignPi = (value: number): Nullary<void> => (): void => {
            pi = value;
        };

        beforeEach(() => {
            pi = 3.14;
        });

        it('must be assigned to Maybe', () => {
            const output: Maybe<number> = maybe(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(just(3.14));
        });

        it('cannot be assign to Just', () => {
            // TS2322: Type 'Maybe' is not assignable to type 'Just'.
            // @ts-expect-error -- Maybe.run() may return the original Nothing.
            const output: Just<number> = maybe(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(just(3.14));
        });

        it('cannot be assigned to Nothing', () => {
            // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
            // @ts-expect-error -- Maybe.run() may return the original Just.
            const output: Nothing<number> = maybe(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(just(3.14));
        });
    });

    describe('lift', () => {
        it('does not accept functions with strictly-typed input', () => {
            // TS2345: Argument of type '{ (value: number): string; (value: string): number | null; }' is
            //  not assignable to parameter of type '(value: string | null | undefined) => number | null | undefined'.
            // @ts-expect-error -- Maybe.lift() may call the map function with null or undefined.
            expect(maybe('3.14').lift(decimal))
                .toStrictEqual(just(3.14));
        });

        it('must be assigned to Maybe', () => {
            const output: Maybe<boolean> = maybe(3.14).lift(isPresent);

            expect(output).toStrictEqual(just(true));
        });

        it('cannot be assigned to Just', () => {
            // TS2322: Type 'Maybe<boolean>' is not assignable to type 'Just<boolean>'.
            // @ts-expect-error -- Maybe.lift() may return Nothing.
            const output: Just<boolean> = maybe(3.14).lift(isPresent);

            expect(output).toStrictEqual(just(true));
        });

        it('cannot be assigned to Nothing', () => {
            // TS2322: Type 'Maybe<boolean>' is not assignable to type 'Nothing<boolean>'.
            // @ts-expect-error -- Maybe.lift() may return Just.
            const output: Nothing<boolean> = maybe(3.14).lift<boolean>(constant(null));

            expect(output).toBe(naught());
        });
    });
});
