import { Unary } from '../../function';
import { constant, Nullary } from '../../function/function/nullary';
import { decimal } from '../../number/number/base';
import { isGreaterThan, isLessThan } from '../../number/number/order';
import { hasAbsentProperty, hasPresentProperty, ObjectWithAbsent } from '../../object/property/property';
import { split } from '../../string/string/lift';
import { output as stringOutput } from '../../string/string/output';
import { isPresent } from '../../value/value';
import { fallbackNullable } from '../nullable/nullable.mock';
import { fallbackOptional } from '../optional/optional.mock';

import { Just, just, Maybe, maybe, maybeOf, naught, Nothing, nothing } from './maybe';
import { fallbackMaybe } from './maybe.mock';
import { typeGuardCheck } from './type-guard-check.mock';

function maybeDecimal(value: number | null | undefined): Maybe<string> {
    return maybe(value).to<string>(decimal);
}

function maybeSplit(value: string | null | undefined): Maybe<string[]> {
    return maybe(value).to(v => v.split('.'));
}

function identity<T>(value: T): T {
    return value;
}

function splitDecimal(value: number): string[] {
    return split('.')(decimal(value));
}

describe(maybe, () => {
    describe('when the value maybe be present or absent', () => {
        it('must be assigned to Maybe<T>', () => {
            const output: Maybe<number> = maybe(fallbackMaybe(0));

            expect(output).toStrictEqual(just(0));
        });

        it('can not be assigned to Just<T>', () => {
            // @ts-expect-error -- TS2322: Type 'Maybe<number>' is not assignable to type 'Just<number>'.
            const output: Just<number> = maybe(fallbackMaybe(0));

            expect(output).toStrictEqual(just(0));
        });

        it('can not be assigned to Nothing<T>', () => {
            // @ts-expect-error -- TS2322: Type 'Maybe<number>' is not assignable to type 'Nothing<number>'.
            const outputNull: Nothing<number> = maybe(fallbackMaybe<number | null>(null));

            // @ts-expect-error -- TS2322: Type 'Maybe ' is not assignable to type 'Nothing '.
            const outputUndefined: Nothing<number> = maybe(fallbackMaybe<number | undefined>(undefined));

            expect(outputNull).toStrictEqual(naught());
            expect(outputUndefined).toStrictEqual(nothing());
        });
    });

    describe('when the value is present', () => {
        it('creates Just<T> when value is present', () => {
            expect(maybe(fallbackMaybe(3.14)))
                .toStrictEqual(just(3.14));
        });

        it('must be assigned to Just<T>', () => {
            const output: Just<number> = maybe(0);

            expect(output).toStrictEqual(just(0));
        });
    });

    describe('when the value is null', () => {
        it('returns the memoized "naught" Nothing<T>', () => {
            expect(maybe(fallbackMaybe<number>(null)))
                .toBe(naught());
        });

        it('must be assigned to Nothing<T>', () => {
            const output: Nothing<number> = maybe(null);

            expect(output).toBe(naught());
        });
    });

    describe('when the value is undefined', () => {
        it('returns the memoized "nothing" Nothing<T>', () => {
            expect(maybe(fallbackMaybe<number>(undefined)))
                .toBe(nothing());
        });

        it('must be assigned to Nothing<T>', () => {
            const output: Nothing<number> = maybe(undefined);

            expect(output).toBe(nothing());
        });
    });
});

describe(maybeOf, () => {
    describe('when the "map" function requires present input and returns present output', () => {
        it('returns an unary function that returns Just', () => {
            const output: Unary<number, Just<string[]>> = maybeOf(splitDecimal);

            expect(output(3.14)).toStrictEqual(just(['3', '14']));
        });
    });

    describe('when the "map" function accepts present or absent value and returns present output', () => {
        it('creates an unary function that returns Just', () => {
            // TODO: Figure out why it can also be assigned to Unary<number, Just<boolean>>
            //  or Unary<string | null | undefined, Just<boolean>>
            const output: Unary<number | null | undefined, Just<boolean>> = maybeOf(isPresent);

            expect(output(3.14)).toStrictEqual(just(true));
            expect(output(null)).toStrictEqual(just(false));
            expect(output(undefined)).toStrictEqual(just(false));
        });
    });

    describe('when the "map" function accepts present or absent value and returns absent output', () => {
        it('creates an unary function that returns Nothing', () => {
            // TODO: Figure out why it can also be assigned to Unary<number, Nothing<boolean>>
            const output: Unary<number | null | undefined, Nothing<boolean>> = maybeOf(constant(null));

            expect(output(3.14)).toBe(naught());
            expect(output(null)).toBe(naught());
            expect(output(undefined)).toBe(naught());
        });
    });

    describe('when the "map" function accepts present or absent value and returns present or absent output', () => {
        it('creates an unary function that returns Maybe', () => {
            // TODO: Figure out why it can also be assigned to Unary<number, Maybe<number>>
            const output: Unary<number | null | undefined, Maybe<number>> = maybeOf<number, number>(fallbackMaybe);

            expect(output(3.14)).toStrictEqual(just(3.14));
            expect(output(null)).toBe(naught());
            expect(output(undefined)).toBe(nothing());
        });
    });
});

describe(Maybe, () => {
    describe('value', () => {
        it('is an optional property and cannot be assigned to the value type', () => {
            // @ts-expect-error -- TS2322: Type 'number | null | undefined' is not assignable to type 'number'.
            const value: number = maybe<number>(fallbackMaybe(3.14)).value;

            expect(value).toBe(3.14);
        });
    });

    describe('onto', () => {
        it('is a left-identity for Maybe.onto() as the "bind" operator', () => {
            // Left-identity: unit(a) >>= \x -> f(x) <=> f(a)
            expect(maybe(fallbackMaybe(3.14)).onto(maybeDecimal))
                .toStrictEqual(maybeDecimal(3.14));
            expect(naught<number>().onto(maybeDecimal))
                .toStrictEqual(maybeDecimal(null));
            expect(nothing<number>().onto(maybeDecimal))
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
            expect(maybe(fallbackMaybe(3.14)).onto(x => maybeDecimal(x).onto(maybeSplit)))
                .toStrictEqual(maybe(fallbackMaybe(3.14)).onto(maybeDecimal).onto(maybeSplit));
            expect(naught<number>().onto(x => maybeDecimal(x).onto(maybeSplit)))
                .toStrictEqual(naught<number>().onto(maybeDecimal).onto(maybeSplit));
            expect(nothing<number>().onto(x => maybeDecimal(x).onto(maybeSplit)))
                .toStrictEqual(nothing<number>().onto(maybeDecimal).onto(maybeSplit));
        });

        describe('when the "flatMap" function returns Maybe', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe(fallbackMaybe(3.14)).onto(constant(maybe(fallbackMaybe('3.14'))));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe<string>' is not assignable to type 'Just<string>'.
                const output: Just<string> = maybe(fallbackMaybe(3.14)).onto(constant(maybe(fallbackMaybe('3.14'))));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe<string>' is not assignable to type 'Nothing<string>'.
                const output: Nothing<string> = maybe(fallbackMaybe(3.14)).onto(constant(maybe(fallbackMaybe('3.14'))));

                expect(output).toStrictEqual(just('3.14'));
            });
        });

        describe('when the "flatMap" function returns Just', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe(fallbackMaybe(3.14)).onto(constant(just('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<string> = maybe(fallbackMaybe(3.14)).onto(constant(just('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<string> = maybe(fallbackMaybe(3.14)).onto(constant(just('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });
        });

        describe('when the "flatMap" function returns Nothing(null)', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe(fallbackMaybe(3.14)).onto(constant(naught<string>()));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<string> = maybe(fallbackMaybe(3.14)).onto(constant(naught<string>()));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<string> = maybe(fallbackMaybe(3.14)).onto(constant(naught<string>()));

                expect(output).toBe(naught());
            });
        });

        describe('when the "flatMap" function returns Nothing(undefined)', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe(fallbackMaybe(3.14)).onto(constant(nothing<string>()));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<string> = maybe(fallbackMaybe(3.14)).onto(constant(nothing<string>()));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<string> = maybe(fallbackMaybe(3.14)).onto(constant(nothing<string>()));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('to', () => {
        describe('to() is the "fmap" operator for the Maybe type and satisfies functor laws', () => {
            // Functors must preserve identity morphisms:
            //  fmap id = id
            it('preserves identity morphisms', () => {
                expect(maybe(fallbackMaybe(3.14)).to(identity)).toStrictEqual(maybe(fallbackMaybe(3.14)));
                expect(maybe(null).to(identity)).toStrictEqual(maybe(null));
                expect(maybe(undefined).to(identity)).toStrictEqual(maybe(undefined));
            });

            // Functors preserve composition of morphisms:
            //  fmap (f . g)  ==  fmap f . fmap g
            it('preserved composition of morphisms', () => {
                expect(maybe(fallbackMaybe(3.14)).to<string>(decimal).to(split('.')))
                    .toStrictEqual(maybe(fallbackMaybe(3.14)).to(splitDecimal));
                expect(naught<number>().to<string>(decimal).to(split('.')))
                    .toStrictEqual(naught<number>().to(splitDecimal));
                expect(nothing<number>().to<string>(decimal).to(split('.')))
                    .toStrictEqual(nothing<number>().to(splitDecimal));
            });
        });

        describe('when the "map" function returns a present or absent value', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe(fallbackMaybe(3.14)).to(constant(fallbackMaybe('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<string> = maybe(fallbackMaybe(3.14)).to(constant(fallbackMaybe('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<string> = maybe(fallbackMaybe(3.14)).to(constant(fallbackMaybe('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });
        });

        describe('when the "map" function returns a present value', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe(fallbackMaybe(3.14)).to(constant('3.14'));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<string> = maybe(fallbackMaybe(3.14)).to(constant('3.14'));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<string> = maybe(fallbackMaybe(3.14)).to(constant('3.14'));

                expect(output).toStrictEqual(just('3.14'));
            });
        });

        describe('when the "map" function returns null', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe(fallbackMaybe(3.14)).to<string>(constant(null));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<string> = maybe(fallbackMaybe(3.14)).to<string>(constant(null));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<string> = maybe(fallbackMaybe(3.14)).to<string>(constant(null));

                expect(output).toBe(naught());
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe(fallbackMaybe(3.14)).to<string>(constant(undefined));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<string> = maybe(fallbackMaybe(3.14)).to<string>(constant(undefined));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<string> = maybe(fallbackMaybe(3.14)).to<string>(constant(undefined));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('into', () => {
        it('does not accept a "fold" function with a non-nullable or non-optional value argument', () => {
            // @ts-expect-error -- TS2345:
            // Argument of type '{ (value: number): string; (value: string): number | null; }'
            // is not assignable to parameter of type '(value: string | null | undefined) => number | null'.
            const output: number | null = maybe(fallbackMaybe('3.14')).into(decimal);

            expect(output).toBe(3.14);
        });

        it('returns the result of the given "fold" function applied to the value of Maybe', () => {
            expect(maybe(fallbackMaybe(3.14)).into(stringOutput)).toBe('3.14');
            expect(maybe(null).into(stringOutput)).toBe('null');
            expect(maybe(undefined).into(stringOutput)).toBe('undefined');
        });
    });

    describe('pick', () => {
        describe('when the property is required', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(fallbackMaybe(typeGuardCheck)).pick('required');

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(fallbackMaybe(typeGuardCheck)).pick('required');

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(fallbackMaybe(typeGuardCheck)).pick('required');

                expect(output).toStrictEqual(just(3.14));
            });
        });

        describe('when the property can be absent', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(fallbackMaybe(typeGuardCheck)).pick('possible');

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(fallbackMaybe(typeGuardCheck)).pick('possible');

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(fallbackMaybe(typeGuardCheck)).pick('possible');

                expect(output).toBe(naught());
            });
        });
    });

    describe('that', () => {
        describe('when the "filter" condition is true', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(fallbackMaybe(3.14)).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(fallbackMaybe(3.14)).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(fallbackMaybe(3.14)).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(just(3.14));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(fallbackMaybe(3.14)).that(isLessThan(2.71));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(fallbackMaybe(3.14)).that(isLessThan(2.71));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(fallbackMaybe(3.14)).that(isLessThan(2.71));

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
                // @ts-expect-error -- TS2322:
                //  Type 'Maybe<ObjectWithPresent<string, "length">>' is not assignable to type 'Just<string>'.
                const output: Just<string> = maybe<string>('3.14').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assign to Nothing', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Maybe<ObjectWithPresent<string, "length">>' is not assignable to type 'Nothing<string>'.
                const output: Nothing<string> = maybe<string>('3.14').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(just('3.14'));
            });
        });

        describe('when the "filter" type guard is false', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<ObjectWithAbsent<string, 'length'>> = maybe<string>('3.14')
                    .which(hasAbsentProperty('length'));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Maybe<ObjectWithAbsent<string, "length">>'
                //  is not assignable to type 'Just<ObjectWithAbsent<string, "length">>'.
                const output: Just<ObjectWithAbsent<string, 'length'>> = maybe<string>('3.14')
                    .which(hasAbsentProperty('length'));

                expect(output).toBe(nothing());
            });

            it('cannot be assign to Nothing', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Maybe<ObjectWithAbsent<string, "length">>'
                //  is not assignable to type 'Nothing<ObjectWithAbsent<string, "length">>'.
                const output: Nothing<ObjectWithAbsent<string, 'length'>> = maybe<string>('3.14')
                    .which(hasAbsentProperty('length'));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('when', () => {
        describe('when the "condition" is true', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(fallbackMaybe(3.14)).when(constant(true));

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(fallbackMaybe(3.14)).when(constant(true));

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(fallbackMaybe(3.14)).when(constant(true));

                expect(output).toStrictEqual(just(3.14));
            });
        });

        describe('when the "condition" is false', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(fallbackMaybe(3.14)).when(constant(false));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(fallbackMaybe(3.14)).when(constant(false));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(fallbackMaybe(3.14)).when(constant(false));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('otherwise', () => {
        describe('when the "fallback" is a present value', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(fallbackMaybe<number>(undefined)).otherwise(2.71);

                expect(output).toStrictEqual(just(2.71));
            });

            it('returns Just value', () => {
                const output: Just<number> = maybe(fallbackMaybe<number>(undefined)).otherwise(2.71);

                expect(output).toStrictEqual(just(2.71));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just<number>' is not assignable to type 'Nothing<number>'.
                const output: Nothing<number> = maybe(fallbackMaybe<number>(undefined)).otherwise(2.71);

                expect(output).toStrictEqual(just(2.71));
            });
        });

        describe('when the "fallback" function returns a present value', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(fallbackMaybe<number>(null)).otherwise(constant(2.71));

                expect(output).toStrictEqual(just(2.71));
            });

            it('returns Just value', () => {
                const output: Just<number> = maybe(fallbackMaybe<number>(null)).otherwise(constant(2.71));

                expect(output).toStrictEqual(just(2.71));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(fallbackMaybe<number>(null)).otherwise(constant(2.71));

                expect(output).toStrictEqual(just(2.71));
            });
        });

        describe('when the "fallback" is null', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(fallbackMaybe<number>(undefined)).otherwise(null);

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(fallbackMaybe<number>(undefined)).otherwise(null);

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(fallbackMaybe<number>(undefined)).otherwise(null);

                expect(output).toBe(naught());
            });
        });

        describe('when the "fallback" returns null', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(fallbackMaybe<number>(undefined)).otherwise(constant(null));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(fallbackMaybe<number>(undefined)).otherwise(constant(null));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(fallbackMaybe<number>(undefined)).otherwise(constant(null));

                expect(output).toBe(naught());
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(fallbackMaybe<number>(null)).otherwise(undefined);

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(fallbackMaybe<number>(null)).otherwise(undefined);

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(fallbackMaybe<number>(null)).otherwise(undefined);

                expect(output).toBe(nothing());
            });
        });

        describe('wen the "fallback" returns undefined', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(fallbackMaybe<number>(null)).otherwise(constant(undefined));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(fallbackMaybe<number>(null)).otherwise(constant(undefined));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(fallbackMaybe<number>(null)).otherwise(constant(undefined));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('or', () => {
        describe('when the "fallback" is a present value', () => {
            it('can be assigned to the value type', () => {
                const output: number = maybe(fallbackMaybe<number>(null)).or(2.71);

                expect(output).toBe(2.71);
            });

            it('cannot be assigned to null', () => {
                // @ts-expect-error -- TS2322: Type 'number' is not assignable to type 'null'.
                const output: null = maybe(fallbackMaybe<number>(null)).or(2.71);

                expect(output).toBe(2.71);
            });

            it('cannot be assigned to undefined', () => {
                // @ts-expect-error -- TS2322: Type 'number' is not assignable to type 'undefined'.
                const output: undefined = maybe(fallbackMaybe<number>(null)).or(2.71);

                expect(output).toBe(2.71);
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to the value type', () => {
                const output: number = maybe(fallbackMaybe<number>(undefined)).or(constant(2.71));

                expect(output).toBe(2.71);
            });

            it('cannot be assigned to null', () => {
                // @ts-expect-error -- TS2322: Type 'number' is not assignable to type 'null'.
                const output: null = maybe(fallbackMaybe<number>(undefined)).or(constant(2.71));

                expect(output).toBe(2.71);
            });

            it('cannot be assigned to undefined', () => {
                // @ts-expect-error -- TS2322: Type 'number' is not assignable to type 'undefined'.
                const output: undefined = maybe(fallbackMaybe<number>(undefined)).or(constant(2.71));

                expect(output).toBe(2.71);
            });
        });

        describe('when the "fallback" may be an absent value', () => {
            it('must be assigned to the union of the value type, null, and undefined', () => {
                const output: number | null | undefined = maybe(fallbackMaybe<number>(null)).or(fallbackMaybe(2.71));

                expect(output).toBe(2.71);
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null | undefined' is not assignable to type 'number'.
                const output: number = maybe(fallbackMaybe<number>(null)).or(fallbackMaybe(2.71));

                expect(output).toBe(2.71);
            });

            it('cannot be assigned to the union of the value type and null', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | null'.
                const output: number | null = maybe(fallbackMaybe<number>(null)).or(fallbackMaybe(2.71));

                expect(output).toBe(2.71);
            });

            it('cannot be assigned to the union of the value type and undefined', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | undefined'.
                const output: number | undefined = maybe(fallbackMaybe<number>(null)).or(fallbackMaybe(2.71));

                expect(output).toBe(2.71);
            });
        });

        describe('when the "fallback" may return an absent value', () => {
            it('must be assigned to the union of the value type, null, and undefined', () => {
                const output: number | null | undefined = maybe(fallbackMaybe<number>(undefined))
                    .or(constant(fallbackMaybe(2.71)));

                expect(output).toBe(2.71);
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null | undefined' is not assignable to type 'number'.
                const output: number = maybe(fallbackMaybe<number>(undefined)).or(constant(fallbackMaybe(2.71)));

                expect(output).toBe(2.71);
            });

            it('cannot be assigned to the union of the value type and null', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | null'.
                const output: number | null = maybe(fallbackMaybe<number>(undefined)).or(constant(fallbackMaybe(2.71)));

                expect(output).toBe(2.71);
            });

            it('cannot be assigned to the union of the value type and undefined', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | undefined'.
                const output: number | undefined = maybe(fallbackMaybe<number>(undefined))
                    .or(constant(fallbackMaybe(2.71)));

                expect(output).toBe(2.71);
            });
        });

        describe('when the "fallback" may be null', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number'.
                const output: number = maybe(fallbackMaybe<number>(null)).or(fallbackNullable(2.71));

                expect(output).toBe(2.71);
            });

            it('must be assigned to the union of the value type and null', () => {
                const output: number | null = maybe(fallbackMaybe<number>(null)).or(fallbackNullable(2.71));

                expect(output).toBe(2.71);
            });

            it('cannot be assigned to the union of the value type and undefined', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number | undefined'.
                const output: number | undefined = maybe(fallbackMaybe<number>(null)).or(fallbackNullable(2.71));

                expect(output).toBe(2.71);
            });
        });

        describe('when the "fallback" may return null', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number'.
                const output: number = maybe(fallbackMaybe<number>(undefined)).or(constant(fallbackNullable(2.71)));

                expect(output).toBe(2.71);
            });

            it('must be assigned to the union of the value type and null', () => {
                const output: number | null = maybe(fallbackMaybe<number>(undefined))
                    .or(constant(fallbackNullable(2.71)));

                expect(output).toBe(2.71);
            });

            it('cannot be assigned to the union of the value type and undefined', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number | undefined'.
                const output: number | undefined = maybe(fallbackMaybe<number>(undefined))
                    .or(constant(fallbackNullable(2.71)));

                expect(output).toBe(2.71);
            });
        });

        describe('when the "fallback" is null', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number'.
                const output: number = maybe(fallbackMaybe<number>(null)).or(null);

                expect(output).toBeNull();
            });

            it('must be assigned to the union of the value type and null', () => {
                const output: number | null = maybe(fallbackMaybe<number>(null)).or(null);

                expect(output).toBeNull();
            });

            it('cannot be assigned to the union of the value type and undefined', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number | undefined'.
                const output: number | undefined = maybe(fallbackMaybe<number>(null)).or(null);

                expect(output).toBeNull();
            });
        });

        describe('when the "fallback" returns null', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number'.
                const output: number = maybe(fallbackMaybe<number>(undefined)).or(constant(null));

                expect(output).toBeNull();
            });

            it('must be assigned to the union of the value type and null', () => {
                const output: number | null = maybe(fallbackMaybe<number>(undefined)).or(constant(null));

                expect(output).toBeNull();
            });

            it('cannot be assigned to the union of the value type and undefined', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number | undefined'.
                const output: number | undefined = maybe(fallbackMaybe<number>(undefined)).or(constant(null));

                expect(output).toBeNull();
            });
        });

        describe('when the "fallback" may be undefined', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number'.
                const output: number = maybe(fallbackMaybe<number>(null)).or(fallbackOptional(2.71));

                expect(output).toBe(2.71);
            });

            it('cannot be assigned to the union of the value type and null', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number | null'.
                const output: number | null = maybe(fallbackMaybe<number>(null)).or(fallbackOptional(2.71));

                expect(output).toBe(2.71);
            });

            it('must be assigned to the union of the value type and undefined', () => {
                const output: number | undefined = maybe(fallbackMaybe<number>(null)).or(fallbackOptional(2.71));

                expect(output).toBe(2.71);
            });
        });

        describe('when the "fallback" may return undefined', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number'.
                const output: number = maybe(fallbackMaybe<number>(undefined)).or(constant(fallbackOptional(2.71)));

                expect(output).toBe(2.71);
            });

            it('cannot be assigned to the union of the value type and null', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number | null'.
                const output: number | null = maybe(fallbackMaybe<number>(undefined))
                    .or(constant(fallbackOptional(2.71)));

                expect(output).toBe(2.71);
            });

            it('must be assigned to the union of the value type and undefined', () => {
                const output: number | undefined = maybe(fallbackMaybe<number>(undefined))
                    .or(constant(fallbackOptional(2.71)));

                expect(output).toBe(2.71);
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number'.
                const output: number = maybe(fallbackMaybe<number>(null)).or(undefined);

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the union of the value type and undefined', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number | null'.
                const output: number | null = maybe(fallbackMaybe<number>(null)).or(undefined);

                expect(output).toBeUndefined();
            });

            it('must be assigned to the union of the value type and undefined', () => {
                const output: number | undefined = maybe(fallbackMaybe<number>(null)).or(undefined);

                expect(output).toBeUndefined();
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number'.
                const output: number = maybe(fallbackMaybe<number>(undefined)).or(constant(undefined));

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the union of the value type and undefined', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number | null'.
                const output: number | null = maybe(fallbackMaybe<number>(undefined)).or(constant(undefined));

                expect(output).toBeUndefined();
            });

            it('must be assigned to the union of the value type and undefined', () => {
                const output: number | undefined = maybe(fallbackMaybe<number>(undefined)).or(constant(undefined));

                expect(output).toBeUndefined();
            });
        });
    });

    describe('run', () => {
        let pi: number;

        // eslint-disable-next-line func-style -- conflicts with prefer-arrow
        const assignPi = (value: number): Nullary<void> => (): void => {
            pi = value;
        };

        beforeEach(() => {
            pi = 3.14;
        });

        it('must be assigned to Maybe', () => {
            const output: Maybe<number> = maybe(fallbackMaybe(pi)).run(assignPi(3.1415));

            expect(output).toStrictEqual(just(3.14));
        });

        it('cannot be assign to Just', () => {
            // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
            const output: Just<number> = maybe(fallbackMaybe(pi)).run(assignPi(3.1415));

            expect(output).toStrictEqual(just(3.14));
        });

        it('cannot be assigned to Nothing', () => {
            // @ts-expect-error -- TS2322: Type 'Maybe<number>' is not assignable to type 'Nothing<number>'.
            const output: Nothing<number> = maybe(fallbackMaybe(pi)).run(assignPi(3.1415));

            expect(output).toStrictEqual(just(3.14));
        });
    });

    describe('lift', () => {
        it('does not accept functions with strictly-typed input', () => {
            // @ts-expect-error -- TS2345:
            //  Argument of type '{ (value: number): string; (value: string): number | null; }'
            //  is not assignable to
            //  parameter of type '(value: string | null | undefined) => number | null | undefined'.
            expect(maybe(fallbackMaybe('3.14')).lift(decimal))
                .toStrictEqual(just(3.14));
        });

        it('must be assigned to Maybe', () => {
            const output: Maybe<boolean> = maybe(fallbackMaybe(3.14)).lift(isPresent);

            expect(output).toStrictEqual(just(true));
        });

        it('cannot be assigned to Just', () => {
            // @ts-expect-error -- TS2322: Type 'Maybe<boolean>' is not assignable to type 'Just<boolean>'.
            const output: Just<boolean> = maybe(fallbackMaybe(3.14)).lift(isPresent);

            expect(output).toStrictEqual(just(true));
        });

        it('cannot be assigned to Nothing', () => {
            // @ts-expect-error -- TS2322: Type 'Maybe<boolean>' is not assignable to type 'Nothing<boolean>'.
            const output: Nothing<boolean> = maybe(fallbackMaybe(3.14)).lift(constant<boolean | null>(null));

            expect(output).toBe(naught());
        });
    });
});
