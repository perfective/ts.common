import { constant, Void } from '../../function/function/nullary';
import { same, Unary } from '../../function/function/unary';
import { isGreaterThan, isLessThan } from '../../number/number/order';
import { hasAbsentProperty, hasPresentProperty, ObjectWithAbsent } from '../../object/property/property';

import { isMaybe, isNotMaybe, Just, just, Maybe, maybe, maybeFrom, naught, Nothing, nothing } from './maybe';
import {
    absentNumber,
    justDecimalOutput,
    maybeDecimalOutput,
    naughtDecimalOutput,
    nothingDecimalOutput,
    nullableNumber,
    optionalNumber,
    safeDecimalOutput,
    splitComma,
    strictDecimalOutput,
    strictDecimalSplitComma,
    unsafe,
    unsafeDecimalOutput,
    unsafeNumber,
} from './maybe.mock';
import { typeGuardCheck } from './type-guard-check.mock';

function maybeSplit(value: string | null | undefined): Maybe<string[]> {
    return maybe(value).to(v => v.split('.'));
}

describe(maybe, () => {
    describe('when the value maybe be present or absent', () => {
        it('must be assigned to Maybe<T>', () => {
            const output: Maybe<number> = maybe(unsafeNumber(0));

            expect(output).toStrictEqual(just(0));
        });

        it('cannot be assigned to Just<T>', () => {
            // @ts-expect-error -- TS2322: Type 'Maybe<number>' is not assignable to type 'Just<number>'.
            const output: Just<number> = maybe(unsafeNumber(0));

            expect(output).toStrictEqual(just(0));
        });

        it('cannot be assigned to Nothing<T>', () => {
            // @ts-expect-error -- TS2322: Type 'Maybe<number>' is not assignable to type 'Nothing<number>'.
            const outputNull: Nothing<number> = maybe(unsafeNumber(null));

            // @ts-expect-error -- TS2322: Type 'Maybe ' is not assignable to type 'Nothing '.
            const outputUndefined: Nothing<number> = maybe(unsafeNumber(undefined));

            expect(outputNull).toStrictEqual(naught());
            expect(outputUndefined).toStrictEqual(nothing());
        });
    });

    describe('when the value is present', () => {
        it('creates Just<T> when value is present', () => {
            expect(maybe(unsafeNumber(0)))
                .toStrictEqual(just(0));
        });

        it('must be assigned to Just<T>', () => {
            const output: Just<number> = maybe(0);

            expect(output).toStrictEqual(just(0));
            expect(output).toBeInstanceOf(Just);
            expect(output).toBeInstanceOf(Maybe);
        });
    });

    describe('when the value is null', () => {
        it('returns the memoized "naught" Nothing<T>', () => {
            expect(maybe(unsafeNumber(null)))
                .toBe(naught());
        });

        it('must be assigned to Nothing<T>', () => {
            const output: Nothing<number> = maybe(null);

            expect(output).toBe(naught());
            expect(output).toBeInstanceOf(Nothing);
            expect(output).toBeInstanceOf(Maybe);
        });
    });

    describe('when the value is undefined', () => {
        it('returns the memoized "nothing" Nothing<T>', () => {
            expect(maybe(unsafeNumber(undefined)))
                .toBe(nothing());
        });

        it('must be assigned to Nothing<T>', () => {
            const output: Nothing<number> = maybe(undefined);

            expect(output).toBe(nothing());
            expect(output).toBeInstanceOf(Nothing);
            expect(output).toBeInstanceOf(Maybe);
        });
    });
});

describe(maybeFrom, () => {
    describe('when the "map" function requires present input and returns present output', () => {
        it('returns an unary function that returns Just', () => {
            const output: Unary<number, Just<string>> = maybeFrom(strictDecimalOutput);

            expect(output(3.14)).toStrictEqual(just('3.14'));
        });
    });

    describe('when the "map" function accepts present or absent value and returns present output', () => {
        it('creates an unary function that returns Just', () => {
            const output: Unary<number | null | undefined, Just<string>> = maybeFrom(safeDecimalOutput);

            expect(output(3.14)).toStrictEqual(just('3.14'));
            expect(output(null)).toStrictEqual(just('null'));
            expect(output(undefined)).toStrictEqual(just('undefined'));
        });
    });

    describe('when the "map" function accepts present or absent value and returns absent output', () => {
        it('creates an unary function that returns Nothing', () => {
            const output: Unary<number | null | undefined, Nothing<number>> = maybeFrom(absentNumber);

            expect(output(3.14)).toBe(naught());
            expect(output(null)).toBe(naught());
            expect(output(undefined)).toBe(nothing());
        });
    });

    describe('when the "map" function accepts present or absent value and returns present or absent output', () => {
        it('creates an unary function that returns Maybe', () => {
            const output: Unary<number | null | undefined, Maybe<number>> = maybeFrom(unsafeNumber);

            expect(output(0)).toStrictEqual(just(0));
            expect(output(null)).toBe(naught());
            expect(output(undefined)).toBe(nothing());
        });
    });
});

describe(isMaybe, () => {
    describe('when given a `Just`', () => {
        it('returns true', () => {
            expect(isMaybe(just(0))).toBe(true);
        });
    });

    describe('when given a `Nothing`', () => {
        it('returns true', () => {
            expect(isMaybe(nothing())).toBe(true);
            expect(isMaybe(naught())).toBe(true);
        });
    });

    describe('when given not a `Maybe`', () => {
        it('returns false', () => {
            expect(isMaybe(0)).toBe(false);
            expect(isMaybe(null)).toBe(false);
            expect(isMaybe(undefined)).toBe(false);
        });
    });
});

describe(isNotMaybe, () => {
    describe('when given a `Just`', () => {
        it('returns false', () => {
            expect(isNotMaybe(just(0))).toBe(false);
        });
    });

    describe('when given a `Nothing`', () => {
        it('returns false', () => {
            expect(isNotMaybe(nothing())).toBe(false);
            expect(isNotMaybe(naught())).toBe(false);
        });
    });

    describe('when given not a `Maybe`', () => {
        it('returns true', () => {
            expect(isNotMaybe(0)).toBe(true);
            expect(isNotMaybe(null)).toBe(true);
            expect(isNotMaybe(undefined)).toBe(true);
        });
    });
});

describe(Maybe, () => {
    describe('value', () => {
        it('is an optional property and cannot be assigned to the value type', () => {
            // @ts-expect-error -- TS2322: Type 'number | null | undefined' is not assignable to type 'number'.
            const value: number = maybe<number>(unsafeNumber(0)).value;

            expect(value).toBe(0);
        });
    });

    describe('onto', () => {
        it('is a left-identity for Maybe.onto() as the "bind" operator', () => {
            // Left-identity: unit(a) >>= \x -> f(x) <=> f(a)
            expect(maybe(unsafeNumber(0)).onto(maybeDecimalOutput))
                .toStrictEqual(maybeDecimalOutput(0));
            expect(naught<number>().onto(maybeDecimalOutput))
                .toStrictEqual(maybeDecimalOutput(null));
            expect(nothing<number>().onto(maybeDecimalOutput))
                .toStrictEqual(maybeDecimalOutput(undefined));
        });

        it('is a right-identity for Maybe.onto() as the "bind" operator', () => {
            // Right-identity: ma >>= x -> unit(x) <=> ma
            expect(maybeDecimalOutput(0).onto(maybe))
                .toStrictEqual(maybeDecimalOutput(0));
            expect(maybeDecimalOutput(null).onto(maybe))
                .toStrictEqual(maybeDecimalOutput(null));
            expect(maybeDecimalOutput(undefined).onto(maybe))
                .toStrictEqual(maybeDecimalOutput(undefined));
        });

        it('has essentially associative Maybe.onto() as the "bind" operator', () => {
            // Associativity: ma >>= \x -> (f(x) >>= \y -> g(y)) <=> (ma >>= \x -> f(x) >>= \y -> g(y)
            expect(maybe(unsafeNumber(0)).onto(x => maybeDecimalOutput(x).onto(maybeSplit)))
                .toStrictEqual(maybe(unsafeNumber(0)).onto(maybeDecimalOutput).onto(maybeSplit));
            expect(naught<number>().onto(x => maybeDecimalOutput(x).onto(maybeSplit)))
                .toStrictEqual(naught<number>().onto(maybeDecimalOutput).onto(maybeSplit));
            expect(nothing<number>().onto(x => maybeDecimalOutput(x).onto(maybeSplit)))
                .toStrictEqual(nothing<number>().onto(maybeDecimalOutput).onto(maybeSplit));
        });

        describe('when the "flatMap" function returns Maybe', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe(unsafeNumber(0)).onto(maybeDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe<string>' is not assignable to type 'Just<string>'.
                const output: Just<string> = maybe(unsafeNumber(0)).onto(maybeDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe<string>' is not assignable to type 'Nothing<string>'.
                const output: Nothing<string> = maybe(unsafeNumber(0)).onto(maybeDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });
        });

        describe('when the "flatMap" function returns Just', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe(unsafeNumber(0)).onto(justDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<string> = maybe(unsafeNumber(0)).onto(justDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<string> = maybe(unsafeNumber(0)).onto(justDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });
        });

        describe('when the "flatMap" function returns Nothing(null)', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe(unsafeNumber(0)).onto(naughtDecimalOutput);

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<string> = maybe(unsafeNumber(0)).onto(naughtDecimalOutput);

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<string> = maybe(unsafeNumber(0)).onto(naughtDecimalOutput);

                expect(output).toBe(naught());
            });
        });

        describe('when the "flatMap" function returns Nothing(undefined)', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe(unsafeNumber(0)).onto(nothingDecimalOutput);

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<string> = maybe(unsafeNumber(0)).onto(nothingDecimalOutput);

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<string> = maybe(unsafeNumber(0)).onto(nothingDecimalOutput);

                expect(output).toBe(nothing());
            });
        });
    });

    describe('to', () => {
        describe('as the "fmap" operator for the Maybe type', () => {
            // Functors must preserve identity morphisms:
            //  fmap id = id
            it('preserves identity morphisms', () => {
                expect(maybe(unsafeNumber(0)).to(same)).toStrictEqual(maybe(unsafeNumber(0)));
                expect(maybe(null).to(same)).toStrictEqual(maybe(null));
                expect(maybe(undefined).to(same)).toStrictEqual(maybe(undefined));
            });

            // Functors preserve composition of morphisms:
            //  fmap (f . g)  ==  fmap f . fmap g
            it('preserved composition of morphisms', () => {
                expect(maybe(unsafeNumber(0)).to(strictDecimalOutput).to(splitComma))
                    .toStrictEqual(maybe(unsafeNumber(0)).to(strictDecimalSplitComma));
                expect(naught<number>().to(strictDecimalOutput).to(splitComma))
                    .toStrictEqual(naught<number>().to(strictDecimalSplitComma));
                expect(nothing<number>().to(strictDecimalOutput).to(splitComma))
                    .toStrictEqual(nothing<number>().to(strictDecimalSplitComma));
            });
        });

        describe('when the "map" function returns a present or absent value', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe(unsafeNumber(0)).to(unsafeDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<string> = maybe(unsafeNumber(0)).to(unsafeDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<string> = maybe(unsafeNumber(0)).to(unsafeDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });
        });

        describe('when the "map" function returns a present value', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe(unsafeNumber(0)).to(strictDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<string> = maybe(unsafeNumber(0)).to(strictDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<string> = maybe(unsafeNumber(0)).to(strictDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });
        });

        describe('when the "map" function returns null', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe(unsafeNumber(0)).to<string>(constant(null));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<string> = maybe(unsafeNumber(0)).to<string>(constant(null));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<string> = maybe(unsafeNumber(0)).to<string>(constant(null));

                expect(output).toBe(naught());
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe(unsafeNumber(0)).to<string>(constant(undefined));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<string> = maybe(unsafeNumber(0)).to<string>(constant(undefined));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<string> = maybe(unsafeNumber(0)).to<string>(constant(undefined));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('into', () => {
        it('does not accept a `reduce` callback with a non-nullable or non-optional value argument', () => {
            // @ts-expect-error -- TS2345:
            //  Argument of type '(input: number) => string'
            //  is not assignable to
            //  parameter of type '(value: number | null | undefined) => string'.
            const output: string = maybe(unsafeNumber(0)).into(strictDecimalOutput);

            expect(output).toBe('0');
        });

        it('returns the result of the given `reduce` callback applied to the value of Maybe', () => {
            expect(maybe(unsafeNumber(0)).into(safeDecimalOutput))
                .toBe('0');
            expect(maybe(null).into(safeDecimalOutput))
                .toBe('null');
            expect(maybe(undefined).into(safeDecimalOutput))
                .toBe('undefined');
        });

        it('can be used to return Maybe', () => {
            const output: Maybe<string> = maybe(unsafeNumber(0)).into(maybeFrom(safeDecimalOutput));

            expect(output).toStrictEqual(just('0'));
        });
    });

    describe('pick', () => {
        describe('when the property is required', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(unsafe(typeGuardCheck)).pick('required');

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(unsafe(typeGuardCheck)).pick('required');

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(unsafe(typeGuardCheck)).pick('required');

                expect(output).toStrictEqual(just(3.14));
            });
        });

        describe('when the property can be absent', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(unsafe(typeGuardCheck)).pick('possible');

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(unsafe(typeGuardCheck)).pick('possible');

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(unsafe(typeGuardCheck)).pick('possible');

                expect(output).toBe(naught());
            });
        });
    });

    describe('that', () => {
        describe('when the "filter" condition is true', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(unsafeNumber(0)).that(isLessThan(2.71));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(unsafeNumber(0)).that(isLessThan(2.71));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(unsafeNumber(0)).that(isLessThan(2.71));

                expect(output).toStrictEqual(just(0));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(unsafeNumber(0)).that(isGreaterThan(2.71));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(unsafeNumber(0)).that(isGreaterThan(2.71));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(unsafeNumber(0)).that(isGreaterThan(2.71));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('which', () => {
        describe('when the "filter" type guard is true', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = maybe(unsafe('3.14')).which(hasPresentProperty('length'));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Maybe<ObjectWithPresent<string, "length">>' is not assignable to type 'Just<string>'.
                const output: Just<string> = maybe(unsafe('3.14')).which(hasPresentProperty('length'));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assign to Nothing', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Maybe<ObjectWithPresent<string, "length">>' is not assignable to type 'Nothing<string>'.
                const output: Nothing<string> = maybe(unsafe('3.14')).which(hasPresentProperty('length'));

                expect(output).toStrictEqual(just('3.14'));
            });
        });

        describe('when the "filter" type guard is false', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<ObjectWithAbsent<string, 'length'>> = maybe(unsafe('3.14'))
                    .which(hasAbsentProperty('length'));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Maybe<ObjectWithAbsent<string, "length">>'
                //  is not assignable to type 'Just<ObjectWithAbsent<string, "length">>'.
                const output: Just<ObjectWithAbsent<string, 'length'>> = maybe(unsafe('3.14'))
                    .which(hasAbsentProperty('length'));

                expect(output).toBe(nothing());
            });

            it('cannot be assign to Nothing', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Maybe<ObjectWithAbsent<string, "length">>'
                //  is not assignable to type 'Nothing<ObjectWithAbsent<string, "length">>'.
                const output: Nothing<ObjectWithAbsent<string, 'length'>> = maybe(unsafe('3.14'))
                    .which(hasAbsentProperty('length'));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('when', () => {
        describe('when the "condition" is true', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(unsafeNumber(0)).when(constant(true));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(unsafeNumber(0)).when(constant(true));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(unsafeNumber(0)).when(constant(true));

                expect(output).toStrictEqual(just(0));
            });
        });

        describe('when the "condition" is false', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(unsafeNumber(0)).when(constant(false));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(unsafeNumber(0)).when(constant(false));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(unsafeNumber(0)).when(constant(false));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('otherwise', () => {
        describe('when the "fallback" is a present value', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(unsafeNumber(undefined)).otherwise(0);

                expect(output).toStrictEqual(just(0));
            });

            it('returns Just value', () => {
                const output: Just<number> = maybe(unsafeNumber(undefined)).otherwise(0);

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just<number>' is not assignable to type 'Nothing<number>'.
                const output: Nothing<number> = maybe(unsafeNumber(undefined)).otherwise(0);

                expect(output).toStrictEqual(just(0));
            });
        });

        describe('when the "fallback" function returns a present value', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(unsafeNumber(null)).otherwise(constant(0));

                expect(output).toStrictEqual(just(0));
            });

            it('returns Just value', () => {
                const output: Just<number> = maybe(unsafeNumber(null)).otherwise(constant(0));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(unsafeNumber(null)).otherwise(constant(0));

                expect(output).toStrictEqual(just(0));
            });
        });

        describe('when the "fallback" is null', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(unsafeNumber(undefined)).otherwise(null);

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(unsafeNumber(undefined)).otherwise(null);

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(unsafeNumber(undefined)).otherwise(null);

                expect(output).toBe(naught());
            });
        });

        describe('when the "fallback" returns null', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(unsafeNumber(undefined)).otherwise(constant(null));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(unsafeNumber(undefined)).otherwise(constant(null));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(unsafeNumber(undefined)).otherwise(constant(null));

                expect(output).toBe(naught());
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(unsafeNumber(null)).otherwise(undefined);

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(unsafeNumber(null)).otherwise(undefined);

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(unsafeNumber(null)).otherwise(undefined);

                expect(output).toBe(nothing());
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = maybe(unsafeNumber(null)).otherwise(constant(undefined));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = maybe(unsafeNumber(null)).otherwise(constant(undefined));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = maybe(unsafeNumber(null)).otherwise(constant(undefined));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('or', () => {
        describe('when the "fallback" is a present value', () => {
            it('can be assigned to the value type', () => {
                const output: number = maybe(unsafeNumber(null)).or(0);

                expect(output).toBe(0);
            });

            it('cannot be assigned to null', () => {
                // @ts-expect-error -- TS2322: Type 'number' is not assignable to type 'null'.
                const output: null = maybe(unsafeNumber(null)).or(0);

                expect(output).toBe(0);
            });

            it('cannot be assigned to undefined', () => {
                // @ts-expect-error -- TS2322: Type 'number' is not assignable to type 'undefined'.
                const output: undefined = maybe(unsafeNumber(null)).or(0);

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to the value type', () => {
                const output: number = maybe(unsafeNumber(undefined)).or(constant(0));

                expect(output).toBe(0);
            });

            it('cannot be assigned to null', () => {
                // @ts-expect-error -- TS2322: Type 'number' is not assignable to type 'null'.
                const output: null = maybe(unsafeNumber(undefined)).or(constant(0));

                expect(output).toBe(0);
            });

            it('cannot be assigned to undefined', () => {
                // @ts-expect-error -- TS2322: Type 'number' is not assignable to type 'undefined'.
                const output: undefined = maybe(unsafeNumber(undefined)).or(constant(0));

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" may be an absent value', () => {
            it('must be assigned to the union of the value type, null, and undefined', () => {
                const output: number | null | undefined = maybe(unsafeNumber(null)).or(unsafe(0));

                expect(output).toBe(0);
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null | undefined' is not assignable to type 'number'.
                const output: number = maybe(unsafeNumber(null)).or(unsafe(0));

                expect(output).toBe(0);
            });

            it('cannot be assigned to the union of the value type and null', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | null'.
                const output: number | null = maybe(unsafeNumber(null)).or(unsafe(0));

                expect(output).toBe(0);
            });

            it('cannot be assigned to the union of the value type and undefined', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | undefined'.
                const output: number | undefined = maybe(unsafeNumber(null)).or(unsafe(0));

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" may return an absent value', () => {
            it('must be assigned to the union of the value type, null, and undefined', () => {
                const output: number | null | undefined = maybe(unsafeNumber(undefined))
                    .or(constant(unsafe(0)));

                expect(output).toBe(0);
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null | undefined' is not assignable to type 'number'.
                const output: number = maybe(unsafeNumber(undefined)).or(constant(unsafe(0)));

                expect(output).toBe(0);
            });

            it('cannot be assigned to the union of the value type and null', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | null'.
                const output: number | null = maybe(unsafeNumber(undefined)).or(constant(unsafe(0)));

                expect(output).toBe(0);
            });

            it('cannot be assigned to the union of the value type and undefined', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | undefined'.
                const output: number | undefined = maybe(unsafeNumber(undefined))
                    .or(constant(unsafe(0)));

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" may be null', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number'.
                const output: number = maybe(unsafeNumber(null)).or(nullableNumber(0));

                expect(output).toBe(0);
            });

            it('must be assigned to the union of the value type and null', () => {
                const output: number | null = maybe(unsafeNumber(null)).or(nullableNumber(0));

                expect(output).toBe(0);
            });

            it('cannot be assigned to the union of the value type and undefined', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number | undefined'.
                const output: number | undefined = maybe(unsafeNumber(null)).or(nullableNumber(0));

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" may return null', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number'.
                const output: number = maybe(unsafeNumber(undefined)).or(constant(nullableNumber(0)));

                expect(output).toBe(0);
            });

            it('must be assigned to the union of the value type and null', () => {
                const output: number | null = maybe(unsafeNumber(undefined))
                    .or(constant(nullableNumber(0)));

                expect(output).toBe(0);
            });

            it('cannot be assigned to the union of the value type and undefined', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number | undefined'.
                const output: number | undefined = maybe(unsafeNumber(undefined))
                    .or(constant(nullableNumber(0)));

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" is null', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number'.
                const output: number = maybe(unsafeNumber(undefined)).or(null);

                expect(output).toBeNull();
            });

            it('must be assigned to the union of the value type and null', () => {
                const output: number | null = maybe(unsafeNumber(undefined)).or(null);

                expect(output).toBeNull();
            });

            it('cannot be assigned to the union of the value type and undefined', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number | undefined'.
                const output: number | undefined = maybe(unsafeNumber(undefined)).or(null);

                expect(output).toBeNull();
            });
        });

        describe('when the "fallback" returns null', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number'.
                const output: number = maybe(unsafeNumber(undefined)).or(constant(null));

                expect(output).toBeNull();
            });

            it('must be assigned to the union of the value type and null', () => {
                const output: number | null = maybe(unsafeNumber(undefined)).or(constant(null));

                expect(output).toBeNull();
            });

            it('cannot be assigned to the union of the value type and undefined', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number | undefined'.
                const output: number | undefined = maybe(unsafeNumber(undefined)).or(constant(null));

                expect(output).toBeNull();
            });
        });

        describe('when the "fallback" may be undefined', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number'.
                const output: number = maybe(unsafeNumber(null)).or(optionalNumber(0));

                expect(output).toBe(0);
            });

            it('cannot be assigned to the union of the value type and null', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number | null'.
                const output: number | null = maybe(unsafeNumber(null)).or(optionalNumber(0));

                expect(output).toBe(0);
            });

            it('must be assigned to the union of the value type and undefined', () => {
                const output: number | undefined = maybe(unsafeNumber(null)).or(optionalNumber(0));

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" may return undefined', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number'.
                const output: number = maybe(unsafeNumber(null)).or(constant(optionalNumber(0)));

                expect(output).toBe(0);
            });

            it('cannot be assigned to the union of the value type and null', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number | null'.
                const output: number | null = maybe(unsafeNumber(null))
                    .or(constant(optionalNumber(0)));

                expect(output).toBe(0);
            });

            it('must be assigned to the union of the value type and undefined', () => {
                const output: number | undefined = maybe(unsafeNumber(null))
                    .or(constant(optionalNumber(0)));

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number'.
                const output: number = maybe(unsafeNumber(null)).or(undefined);

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the union of the value type and undefined', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number | null'.
                const output: number | null = maybe(unsafeNumber(null)).or(undefined);

                expect(output).toBeUndefined();
            });

            it('must be assigned to the union of the value type and undefined', () => {
                const output: number | undefined = maybe(unsafeNumber(null)).or(undefined);

                expect(output).toBeUndefined();
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number'.
                const output: number = maybe(unsafeNumber(null)).or(constant(undefined));

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the union of the value type and undefined', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number | null'.
                const output: number | null = maybe(unsafeNumber(null)).or(constant(undefined));

                expect(output).toBeUndefined();
            });

            it('must be assigned to the union of the value type and undefined', () => {
                const output: number | undefined = maybe(unsafeNumber(null)).or(constant(undefined));

                expect(output).toBeUndefined();
            });
        });
    });

    describe('through', () => {
        let pi: number;

        function assignPi(update: number): Void {
            return (): void => {
                pi = update;
            };
        }

        beforeEach(() => {
            pi = 3.14;
        });

        it('must be assigned to Maybe', () => {
            const output: Maybe<number> = maybe(unsafe(pi)).through(assignPi(3.1415));

            expect(output).toStrictEqual(just(3.14));
        });

        it('cannot be assign to Just', () => {
            // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
            const output: Just<number> = maybe(unsafe(pi)).through(assignPi(3.1415));

            expect(output).toStrictEqual(just(3.14));
        });

        it('cannot be assigned to Nothing', () => {
            // @ts-expect-error -- TS2322: Type 'Maybe<number>' is not assignable to type 'Nothing<number>'.
            const output: Nothing<number> = maybe(unsafe(pi)).through(assignPi(3.1415));

            expect(output).toStrictEqual(just(3.14));
        });
    });
});
