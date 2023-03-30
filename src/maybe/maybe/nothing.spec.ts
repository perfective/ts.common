import { panic } from '../../error/panic/panic';
import { constant, Void } from '../../function/function/nullary';
import { hasPresentProperty, ObjectWithPresent } from '../../object/property/property';

import { isNothing, isNotNothing, Just, just, Maybe, maybeFrom, nil, Nothing, nothing } from './maybe';
import {
    Boxed,
    justDecimalOutput,
    maybeDecimalOutput,
    nilDecimalOutput,
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

describe(nil, () => {
    it('can be assigned to Maybe<T>', () => {
        const output: Maybe<number> = nil();

        expect(output).toBe(nil());
    });

    it('cannot be assigned to Just<T>', () => {
        // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
        const output: Just<number> = nil();

        expect(output).toBe(nil());
    });
});

describe(isNothing, () => {
    describe('when given a `Just`', () => {
        it('returns false', () => {
            expect(isNothing(just(0))).toBe(false);
        });
    });

    describe('when given a `Nothing`', () => {
        it('returns true', () => {
            expect(isNothing(nothing())).toBe(true);
            expect(isNothing(nil())).toBe(true);
        });
    });

    describe('when given not a `Maybe`', () => {
        it('returns false', () => {
            expect(isNothing(0)).toBe(false);
            expect(isNothing(null)).toBe(false);
            expect(isNothing(undefined)).toBe(false);
        });
    });
});

describe(isNotNothing, () => {
    describe('when given a `Just`', () => {
        it('returns true', () => {
            expect(isNotNothing(just(0))).toBe(true);
        });
    });

    describe('when given a `Nothing`', () => {
        it('returns false', () => {
            expect(isNotNothing(nothing())).toBe(false);
            expect(isNotNothing(nil())).toBe(false);
        });
    });

    describe('when given not a `Maybe`', () => {
        it('returns true', () => {
            expect(isNotNothing(0)).toBe(true);
            expect(isNotNothing(null)).toBe(true);
            expect(isNotNothing(undefined)).toBe(true);
        });
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
            const value: number = nil().value;

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
                const output: Maybe<string> = nil<number>().onto(nilDecimalOutput);

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<string> = nil<number>().onto(nilDecimalOutput);

                expect(output).toBe(nil());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<string> = nil<number>().onto(nilDecimalOutput);

                expect(output).toBe(nil());
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
                const output: Maybe<string> = nil().to(constant<string | undefined>(undefined));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<string> = nil().to(constant<string | undefined>(undefined));

                expect(output).toBe(nil());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<string> = nil().to(constant<string | undefined>(undefined));

                expect(output).toBe(nil());
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
            expect(nil().into(safeDecimalOutput)).toBe('null');
        });

        it('can be used to return Maybe', () => {
            const output: Maybe<string> = nil().into(maybeFrom(safeDecimalOutput));

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
                const output: Maybe<number> = nil<TypeGuardCheck>().pick('optional');

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = nil<TypeGuardCheck>().pick('optional');

                expect(output).toBe(nil());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nil<TypeGuardCheck>().pick('optional');

                expect(output).toBe(nil());
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
                const output: Maybe<number> = nil<number>().that(constant(false));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = nil<number>().that(constant(false));

                expect(output).toBe(nil());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nil<number>().that(constant(false));

                expect(output).toBe(nil());
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
                const output: Maybe<ObjectWithPresent<TypeGuardCheck, 'maybe'>> = nil<TypeGuardCheck>()
                    .which(hasPresentProperty('maybe'));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nothing<ObjectWithPresent<TypeGuardCheck<number>, "optional">>'
                //  is not assignable to type 'Just<ObjectWithPresent<TypeGuardCheck<number>, "optional">>'.
                const output: Just<ObjectWithPresent<TypeGuardCheck, 'optional'>> = nil<TypeGuardCheck>()
                    .which(hasPresentProperty('optional'));

                expect(output).toBe(nil());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<ObjectWithPresent<TypeGuardCheck, 'maybe'>> = nil<TypeGuardCheck>()
                    .which(hasPresentProperty('maybe'));

                expect(output).toBe(nil());
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
                const output: Maybe<number> = nil<number>().when(constant(false));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = nil<number>().when(constant(false));

                expect(output).toBe(nil());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nil<number>().when(constant(false));

                expect(output).toBe(nil());
            });
        });
    });

    describe('otherwise', () => {
        it('allows to throw an error', () => {
            expect(() => nothing<number>().otherwise(panic('Value is absent')))
                .toThrow('Value is absent');
            expect(() => nil<number>().otherwise(panic('Value is absent')))
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
                const output: Maybe<number> = nil<number>().otherwise(constant(0));

                expect(output).toStrictEqual(just(0));
            });

            it('returns Just with the fallback value', () => {
                const output: Just<number> = nil<number>().otherwise(constant(0));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just' is not assignable to type 'Nothing'.
                const output: Nothing<number> = nil<number>().otherwise(constant(0));

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
                const output: Maybe<number> = nil<number>().otherwise(constant(unsafe(0)));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe<number>' is not assignable to type 'Just<number>'.
                const output: Just<number> = nil<number>().otherwise(constant(unsafe(0)));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe<number>' is not assignable to type 'Nothing<number>'.
                const output: Nothing<number> = nil<number>().otherwise(constant(unsafe(0)));

                expect(output).toStrictEqual(just(0));
            });
        });

        describe('when the "fallback" is null', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().otherwise(null);

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = nothing<number>().otherwise(null);

                expect(output).toBe(nil());
            });

            it('returns nil as Nothing', () => {
                const output: Nothing<number> = nothing<number>().otherwise(null);

                expect(output).toBe(nil());
            });
        });

        describe('when the "fallback" returns null', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().otherwise(constant(null));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = nothing<number>().otherwise(constant(null));

                expect(output).toBe(nil());
            });

            it('returns nil as Nothing', () => {
                const output: Nothing<number> = nothing<number>().otherwise(constant(null));

                expect(output).toBe(nil());
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nil<number>().otherwise(undefined);

                expect(output).toStrictEqual(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = nil<number>().otherwise(undefined);

                expect(output).toStrictEqual(nothing());
            });

            it('returns nothing as Nothing', () => {
                const output: Nothing<number> = nil<number>().otherwise(undefined);

                expect(output).toStrictEqual(nothing());
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nil<number>().otherwise(constant(undefined));

                expect(output).toStrictEqual(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = nil<number>().otherwise(constant(undefined));

                expect(output).toStrictEqual(nothing());
            });

            it('returns nothing as Nothing', () => {
                const output: Nothing<number> = nil<number>().otherwise(constant(undefined));

                expect(output).toStrictEqual(nothing());
            });
        });
    });

    describe('or', () => {
        it('is a shortcut for Maybe.otherwise().value', () => {
            expect(nothing<number>().or(0))
                .toStrictEqual(nothing<number>().otherwise(0).value);
            expect(nil<number>().or(0))
                .toStrictEqual(nil<number>().otherwise(0).value);
        });

        it('allows to throw an error', () => {
            expect(() => nothing<number>().or(panic('Value is absent')))
                .toThrow('Value is absent');
            expect(() => nil<number>().or(panic('Value is absent')))
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
                const output: number = nil<number>().or(constant(0));

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
                const output: undefined = nil<string>().or(undefined);

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'undefined' is not assignable to type 'string'.
                const output: string = nil<string>().or(undefined);

                expect(output).toBeUndefined();
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('returns undefined', () => {
                const output: undefined = nil<string>().or(constant(undefined));

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'undefined' is not assignable to type 'string'.
                const output: string = nil<string>().or(constant(undefined));

                expect(output).toBeUndefined();
            });
        });
        /* eslint-enable @typescript-eslint/no-confusing-void-expression */

        describe('when the fallback may return undefined', () => {
            it('must be assigned to the fallback return type', () => {
                const output: number | undefined = nil<number>().or(constant<number | undefined>(0));

                expect(output).toBe(0);
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'string | undefined' is not assignable to type 'string'.
                const output: number = nil<number>().or(constant<number | undefined>(0));

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
});
