import { panic } from '../../error/panic/panic';
import { constant, Void } from '../../function/function/nullary';
import { hasPresentProperty, ObjectWithPresent } from '../../object/property/property';

import { Just, just, Maybe, maybeFrom, naught, Nothing, nothing } from './maybe';
import {
    Boxed,
    justDecimalOutput,
    maybeDecimalOutput,
    naughtDecimalOutput,
    safeDecimalOutput,
    strictDecimalOutput,
    unsafe,
    unsafeNumber,
} from './maybe.mock';
import { TypeGuardCheck } from './type-guard-check.mock';

describe(nothing, () => {
    it('can be assigned to Maybe<T>', () => {
        const output: Maybe<number> = nothing();

        expect(output).toBe(nothing());
    });

    it('cannot be assigned to Just<T>', () => {
        // @ts-expect-error -- TS2322: Type 'Nothing<number>' is not assignable to type 'Just<number>'.
        const output: Just<number> = nothing();

        expect(output).toBe(nothing());
    });
});

describe(naught, () => {
    it('can be assigned to Maybe<T>', () => {
        const output: Maybe<number> = naught();

        expect(output).toBe(naught());
    });

    it('cannot be assigned to Just<T>', () => {
        // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
        const output: Just<number> = naught();

        expect(output).toBe(naught());
    });
});

describe(Nothing, () => {
    it('throws an error if instantiated with a present value', () => {
        // @ts-expect-error -- TS2345:
        //  Argument of type '3.14' is not assignable to parameter of type 'null | undefined'.
        expect(() => new Nothing(3.14)).toThrow('Nothing value must be absent');
    });

    describe('value', () => {
        it('can be undefined and cannot be assigned to the value type', () => {
            // @ts-expect-error -- TS2322: Type 'null | undefined' is not assignable to type 'number'.
            const value: number = nothing().value;

            expect(value).toBeUndefined();
        });

        it('can be null and cannot be assigned to the value type', () => {
            // @ts-expect-error -- TS2322: Type 'null | undefined' is not assignable to type 'number'.
            const value: number = naught().value;

            expect(value).toBeNull();
        });
    });

    describe('onto', () => {
        describe('when the "flatMap" function returns Maybe', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = nothing<number>().onto(maybeDecimalOutput);

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<string> = nothing<number>().onto(maybeDecimalOutput);

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<string> = nothing<number>().onto(maybeDecimalOutput);

                expect(output).toBe(nothing());
            });
        });

        describe('when the "flatMap" function returns Just', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = nothing<number>().onto(justDecimalOutput);

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<string> = nothing<number>().onto(justDecimalOutput);

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<string> = nothing<number>().onto(justDecimalOutput);

                expect(output).toBe(nothing());
            });
        });

        describe('when the "flatMap" function returns Nothing', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = naught<number>().onto(naughtDecimalOutput);

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<string> = naught<number>().onto(naughtDecimalOutput);

                expect(output).toBe(naught());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<string> = naught<number>().onto(naughtDecimalOutput);

                expect(output).toBe(naught());
            });
        });
    });

    describe('to', () => {
        describe('when the "map" function returns a present value', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = nothing<number>().to(strictDecimalOutput);

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing<string>' is not assignable to type 'Just<string>'.
                const output: Just<string> = nothing<number>().to(strictDecimalOutput);

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<string> = nothing<number>().to(strictDecimalOutput);

                expect(output).toBe(nothing());
            });
        });

        describe('when the "map" function returns null', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = nothing().to(constant<string | null>(null));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<string> = nothing().to(constant<string | null>(null));

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<string> = nothing().to(constant<string | null>(null));

                expect(output).toBe(nothing());
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = naught().to(constant<string | undefined>(undefined));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<string> = naught().to(constant<string | undefined>(undefined));

                expect(output).toBe(naught());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<string> = naught().to(constant<string | undefined>(undefined));

                expect(output).toBe(naught());
            });
        });
    });

    describe('into', () => {
        it('does not accept a `reduce` callback with a non-nullable and non-optional value argument', () => {
            // @ts-expect-error -- TS2345:
            //  Argument of type '(input: number) => string'
            //  is not assignable to parameter of type '(value: null | undefined) => string'.
            expect(() => nothing<number>().into(strictDecimalOutput))
                .toThrow('Cannot read properties of undefined (reading \'toString\')');
        });

        it('returns the result of the given `reduce` callback applied to the value of Nothing', () => {
            expect(nothing().into(safeDecimalOutput)).toBe('undefined');
            expect(naught().into(safeDecimalOutput)).toBe('null');
        });

        it('can be used to return Maybe', () => {
            const output: Maybe<string> = naught().into(maybeFrom(safeDecimalOutput));

            expect(output).toStrictEqual(just('null'));
        });
    });

    describe('pick', () => {
        it('is a shortcut of the to() method', () => {
            const input: Nothing<TypeGuardCheck<Boxed<number>>> = nothing<TypeGuardCheck<Boxed<number>>>();

            expect(input.pick('required').pick('value'))
                .toStrictEqual(input.to(i => i.required).to(i => i.value));
        });

        describe('when the property is required', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<TypeGuardCheck>().pick('required');

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = nothing<TypeGuardCheck>().pick('required');

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nothing<TypeGuardCheck>().pick('required');

                expect(output).toBe(nothing());
            });
        });

        describe('when the property can be absent', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<TypeGuardCheck>().pick('possible');

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = nothing<TypeGuardCheck>().pick('possible');

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nothing<TypeGuardCheck>().pick('possible');

                expect(output).toBe(nothing());
            });
        });

        describe('when the property is nullable', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<TypeGuardCheck>().pick('nullable');

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = nothing<TypeGuardCheck>().pick('nullable');

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nothing<TypeGuardCheck>().pick('nullable');

                expect(output).toBe(nothing());
            });
        });

        describe('when the property is optional', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = naught<TypeGuardCheck>().pick('optional');

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = naught<TypeGuardCheck>().pick('optional');

                expect(output).toBe(naught());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = naught<TypeGuardCheck>().pick('optional');

                expect(output).toBe(naught());
            });
        });
    });

    describe('that', () => {
        describe('when the "filter" condition is true', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().that(constant(true));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = nothing<number>().that(constant(true));

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nothing<number>().that(constant(true));

                expect(output).toBe(nothing());
            });
        });

        describe('when the "filter" condition is false', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = naught<number>().that(constant(false));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = naught<number>().that(constant(false));

                expect(output).toBe(naught());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = naught<number>().that(constant(false));

                expect(output).toBe(naught());
            });
        });
    });

    describe('which', () => {
        describe('when the "filter" type guard is true', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().which(hasPresentProperty('toPrecision'));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nothing<ObjectWithPresent<number, "toPrecision">>' is not assignable to type 'Just<number>'.
                const output: Just<number> = nothing<number>().which(hasPresentProperty('toPrecision'));

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nothing<number>().which(hasPresentProperty('toPrecision'));

                expect(output).toBe(nothing());
            });
        });

        describe('when the "filter" type guard is false', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<ObjectWithPresent<TypeGuardCheck, 'maybe'>> = naught<TypeGuardCheck>()
                    .which(hasPresentProperty('maybe'));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nothing<ObjectWithPresent<TypeGuardCheck<number>, "optional">>'
                //  is not assignable to type 'Just<ObjectWithPresent<TypeGuardCheck<number>, "optional">>'.
                const output: Just<ObjectWithPresent<TypeGuardCheck, 'optional'>> = naught<TypeGuardCheck>()
                    .which(hasPresentProperty('optional'));

                expect(output).toBe(naught());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<ObjectWithPresent<TypeGuardCheck, 'maybe'>> = naught<TypeGuardCheck>()
                    .which(hasPresentProperty('maybe'));

                expect(output).toBe(naught());
            });
        });
    });

    describe('when', () => {
        describe('when the "condition" is true', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().when(constant(true));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = nothing<number>().when(constant(true));

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nothing<number>().when(constant(true));

                expect(output).toBe(nothing());
            });
        });

        describe('when the "condition" is false', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = naught<number>().when(constant(false));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = naught<number>().when(constant(false));

                expect(output).toBe(naught());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = naught<number>().when(constant(false));

                expect(output).toBe(naught());
            });
        });
    });

    describe('otherwise', () => {
        it('allows to throw an error', () => {
            expect(() => nothing<number>().otherwise(panic('Value is absent')))
                .toThrow('Value is absent');
            expect(() => naught<number>().otherwise(panic('Value is absent')))
                .toThrow('Value is absent');
        });

        describe('when the "fallback" is a present value', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().otherwise(0);

                expect(output).toStrictEqual(just(0));
            });

            it('returns Just with the fallback value', () => {
                const output: Just<number> = nothing<number>().otherwise(0);

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just<number>' is not assignable to type 'Nothing<number>'.
                const output: Nothing<number> = nothing<number>().otherwise(0);

                expect(output).toStrictEqual(just(0));
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = naught<number>().otherwise(constant(0));

                expect(output).toStrictEqual(just(0));
            });

            it('returns Just with the fallback value', () => {
                const output: Just<number> = naught<number>().otherwise(constant(0));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just' is not assignable to type 'Nothing'.
                const output: Nothing<number> = naught<number>().otherwise(constant(0));

                expect(output).toStrictEqual(just(0));
            });
        });

        describe('when the "fallback" may be an absent value', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().otherwise(unsafe(0));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe<number>' is not assignable to type 'Just<number>'.
                const output: Just<number> = nothing<number>().otherwise(unsafe(0));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe<number>' is not assignable to type 'Nothing<number>'.
                const output: Nothing<number> = nothing<number>().otherwise(unsafe(0));

                expect(output).toStrictEqual(just(0));
            });
        });

        describe('when the "fallback" may return an absent value', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = naught<number>().otherwise(constant(unsafe(0)));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe<number>' is not assignable to type 'Just<number>'.
                const output: Just<number> = naught<number>().otherwise(constant(unsafe(0)));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe<number>' is not assignable to type 'Nothing<number>'.
                const output: Nothing<number> = naught<number>().otherwise(constant(unsafe(0)));

                expect(output).toStrictEqual(just(0));
            });
        });

        describe('when the "fallback" is null', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().otherwise(null);

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = nothing<number>().otherwise(null);

                expect(output).toBe(naught());
            });

            it('returns naught as Nothing', () => {
                const output: Nothing<number> = nothing<number>().otherwise(null);

                expect(output).toBe(naught());
            });
        });

        describe('when the "fallback" returns null', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().otherwise(constant(null));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = nothing<number>().otherwise(constant(null));

                expect(output).toBe(naught());
            });

            it('returns naught as Nothing', () => {
                const output: Nothing<number> = nothing<number>().otherwise(constant(null));

                expect(output).toBe(naught());
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = naught<number>().otherwise(undefined);

                expect(output).toStrictEqual(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = naught<number>().otherwise(undefined);

                expect(output).toStrictEqual(nothing());
            });

            it('returns nothing as Nothing', () => {
                const output: Nothing<number> = naught<number>().otherwise(undefined);

                expect(output).toStrictEqual(nothing());
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = naught<number>().otherwise(constant(undefined));

                expect(output).toStrictEqual(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = naught<number>().otherwise(constant(undefined));

                expect(output).toStrictEqual(nothing());
            });

            it('returns nothing as Nothing', () => {
                const output: Nothing<number> = naught<number>().otherwise(constant(undefined));

                expect(output).toStrictEqual(nothing());
            });
        });
    });

    describe('or', () => {
        it('is a shortcut for Maybe.otherwise().value', () => {
            expect(nothing<number>().or(0))
                .toStrictEqual(nothing<number>().otherwise(0).value);
            expect(naught<number>().or(0))
                .toStrictEqual(naught<number>().otherwise(0).value);
        });

        it('allows to throw an error', () => {
            expect(() => nothing<number>().or(panic('Value is absent')))
                .toThrow('Value is absent');
            expect(() => naught<number>().or(panic('Value is absent')))
                .toThrow('Value is absent');
        });

        describe('when the "fallback" is present', () => {
            it('returns the given fallback value', () => {
                const output: number = nothing<number>().or(0);

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('returns the result of the fallback', () => {
                const output: number = naught<number>().or(constant(0));

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" may return an absent value', () => {
            it('must be assigned to the fallback return type', () => {
                const output: number | null | undefined = nothing<number>().or(unsafeNumber(0));

                expect(output).toBe(0);
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null | undefined' is not assignable to type 'number'.
                const output: number = nothing<number>().or(unsafeNumber(0));

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" is null', () => {
            it('returns null', () => {
                const output: null = nothing<string>().or(null);

                expect(output).toBeNull();
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'null' is not assignable to type 'string'.
                const output: string = nothing<string>().or(null);

                expect(output).toBeNull();
            });
        });

        describe('when the "fallback" returns null', () => {
            it('returns null', () => {
                const output: null = nothing<string>().or(constant(null));

                expect(output).toBeNull();
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'null' is not assignable to type 'string'.
                const output: string = nothing<string>().or(constant(null));

                expect(output).toBeNull();
            });
        });

        describe('when the "fallback" may return null', () => {
            it('must be assigned to the fallback return type', () => {
                const output: number | null = nothing<number>().or(constant<number | null>(0));

                expect(output).toBe(0);
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number'.
                const output: number = nothing<number>().or(constant<number | null>(0));

                expect(output).toBe(0);
            });
        });

        /* eslint-disable @typescript-eslint/no-confusing-void-expression -- testing the method signature */
        describe('when the "fallback" is undefined', () => {
            it('returns undefined', () => {
                const output: undefined = naught<string>().or(undefined);

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'undefined' is not assignable to type 'string'.
                const output: string = naught<string>().or(undefined);

                expect(output).toBeUndefined();
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('returns undefined', () => {
                const output: undefined = naught<string>().or(constant(undefined));

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'undefined' is not assignable to type 'string'.
                const output: string = naught<string>().or(constant(undefined));

                expect(output).toBeUndefined();
            });
        });
        /* eslint-enable @typescript-eslint/no-confusing-void-expression */

        describe('when the fallback may return undefined', () => {
            it('must be assigned to the fallback return type', () => {
                const output: number | undefined = naught<number>().or(constant<number | undefined>(0));

                expect(output).toBe(0);
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'string | undefined' is not assignable to type 'string'.
                const output: number = naught<number>().or(constant<number | undefined>(0));

                expect(output).toBe(0);
            });
        });
    });

    describe('through', () => {
        let value: number;

        function assignValue(update: number): Void {
            return (): void => {
                value = update;
            };
        }

        beforeEach(() => {
            value = 0;
        });

        it('does not run the given procedure', () => {
            expect(value).toBe(0);
            expect(nothing<number>().through(assignValue(1))).toBe(nothing());
            expect(value).toBe(0);
        });

        it('can be assigned to Maybe', () => {
            const output: Maybe<number> = nothing<number>().through(assignValue(1));

            expect(output).toBe(nothing());
        });

        it('cannot be assigned to Just', () => {
            // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
            const output: Just<number> = nothing<number>().through(assignValue(1));

            expect(output).toBe(nothing());
        });

        it('returns Nothing', () => {
            const output: Nothing<number> = nothing<number>().through(assignValue(1));

            expect(output).toBe(nothing());
        });
    });

    /* eslint-disable deprecation/deprecation -- to be removed in v0.10.0 */
    describe('run', () => {
        let value: number;

        // eslint-disable-next-line sonarjs/no-identical-functions -- to be removed in v0.10.0
        function assignValue(update: number): Void {
            return (): void => {
                value = update;
            };
        }

        beforeEach(() => {
            value = 0;
        });

        it('does not run the given procedure', () => {
            expect(value).toBe(0);
            expect(nothing<number>().run(assignValue(1))).toBe(nothing());
            expect(value).toBe(0);
        });

        it('can be assigned to Maybe', () => {
            const output: Maybe<number> = nothing<number>().run(assignValue(1));

            expect(output).toBe(nothing());
        });

        it('cannot be assigned to Just', () => {
            // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
            const output: Just<number> = nothing<number>().run(assignValue(1));

            expect(output).toBe(nothing());
        });

        it('returns Nothing', () => {
            const output: Nothing<number> = nothing<number>().run(assignValue(1));

            expect(output).toBe(nothing());
        });
    });

    describe('lift', () => {
        it('does not accept functions with strictly-typed input', () => {
            // @ts-expect-error -- TS2345:
            //  Argument of type '(input: number) => string'
            //  is not assignable to parameter of type '(value: null | undefined) => string | null | undefined'.
            expect(() => nothing().lift(strictDecimalOutput))
                .toThrow('Cannot read properties of undefined (reading \'toString\')');

            // @ts-expect-error -- TS2345:
            //  Argument of type '(input: number) => string'
            //  is not assignable to parameter of type '(value: null | undefined) => string | null | undefined'.
            expect(() => naught().lift(strictDecimalOutput))
                .toThrow('Cannot read properties of null (reading \'toString\')');
        });

        it('must be assigned to Maybe', () => {
            const output: Maybe<string> = nothing<number>().lift(safeDecimalOutput);

            expect(output).toStrictEqual(just('undefined'));
        });

        it('cannot be assigned to Just', () => {
            // @ts-expect-error -- TS2322: Type 'Maybe<string>' is not assignable to type 'Just<string>'.
            const output: Just<string> = nothing<number>().lift(safeDecimalOutput);

            expect(output).toStrictEqual(just('undefined'));
        });

        it('cannot be assigned to Nothing', () => {
            // @ts-expect-error -- TS2322: Type 'Maybe<string>' is not assignable to type 'Nothing<string>'.
            const output: Nothing<string> = nothing<number>().lift(safeDecimalOutput);

            expect(output).toStrictEqual(just('undefined'));
        });
    });
    /* eslint-enable deprecation/deprecation */
});
