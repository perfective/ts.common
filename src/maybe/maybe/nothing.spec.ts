import { panic } from '../../error/panic/panic';
import { constant, Nullary } from '../../function/function/nullary';
import { decimal } from '../../number/number/base';
import { hasPresentProperty, ObjectWithPresent } from '../../object/property/property';
import { output as stringOutput } from '../../string/string/output';
import { isUndefined } from '../../value/value';

import { Just, just, Maybe, maybe, naught, Nothing, nothing } from './maybe';
import { Boxed, fallbackMaybe } from './maybe.mock';
import { TypeGuardCheck } from './type-guard-check.mock';

describe(nothing, () => {
    it('can be assigned to Maybe<T>', () => {
        const output: Maybe<number> = nothing<number>();

        expect(output).toBe(nothing());
    });

    it('cannot be assigned to Just<T>', () => {
        // @ts-expect-error -- TS2322: Type 'Nothing<number>' is not assignable to type 'Just<number>'.
        const output: Just<number> = nothing();

        expect(output).toBe(nothing());
    });

    it('throws an error if instantiated with a present value', () => {
        // @ts-expect-error -- TS2345:
        //  Argument of type '3.14' is not assignable to parameter of type 'null | undefined'.
        expect(() => new Nothing(3.14)).toThrow('Nothing value must be absent');
    });
});

describe(naught, () => {
    it('can be assigned to Maybe<T>', () => {
        const output: Maybe<number> = naught<number>();

        expect(output).toBe(naught());
    });

    it('cannot be assigned to Just<T>', () => {
        // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
        const output: Just<number> = naught<number>();

        expect(output).toBe(naught());
    });
});

describe(Nothing, () => {
    describe('value', () => {
        it('can be undefined and cannot be assigned to the value type', () => {
            // @ts-expect-error -- TS2322: Type 'null | undefined' is not assignable to type 'number'.
            const value: number = nothing<number>().value;

            expect(value).toBeUndefined();
        });

        it('can be null and cannot be assigned to the value type', () => {
            // @ts-expect-error -- TS2322: Type 'null | undefined' is not assignable to type 'number'.
            const value: number = naught<number>().value;

            expect(value).toBeNull();
        });
    });

    describe('onto', () => {
        describe('when the "flatMap" function returns Maybe', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().onto(constant(maybe(fallbackMaybe(2.71))));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = nothing<number>().onto(constant(maybe(fallbackMaybe(2.71))));

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nothing<number>().onto(constant(maybe(fallbackMaybe(2.71))));

                expect(output).toBe(nothing());
            });
        });

        describe('when the "flatMap" function returns Just', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().onto(constant(just(2.71)));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = nothing<number>().onto(constant(just(2.71)));

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nothing<number>().onto(constant(just(2.71)));

                expect(output).toBe(nothing());
            });
        });

        describe('when the "flatMap" function returns Nothing', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = naught<number>().onto(constant(nothing<number>()));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<number> = naught<number>().onto(constant(nothing<number>()));

                expect(output).toBe(naught());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = naught<number>().onto(constant(nothing<number>()));

                expect(output).toBe(naught());
            });
        });
    });

    describe('to', () => {
        describe('when the "map" function returns a present value', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = nothing<number>().to(constant('3.14'));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing<string>' is not assignable to type 'Just<string>'.
                const output: Just<string> = nothing<number>().to(constant('3.14'));

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<string> = nothing<number>().to(constant('3.14'));

                expect(output).toBe(nothing());
            });
        });

        describe('when the "map" function returns null', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = nothing<number>().to(constant<string | null>(null));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<string> = nothing<number>().to(constant<string | null>(null));

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<string> = nothing<number>().to(constant<string | null>(null));

                expect(output).toBe(nothing());
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = naught<number>().to(constant<string | undefined>(undefined));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<string> = naught<number>().to(constant<string | undefined>(undefined));

                expect(output).toBe(naught());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<string> = naught<number>().to(constant<string | undefined>(undefined));

                expect(output).toBe(naught());
            });
        });
    });

    describe('into', () => {
        it('does not accept a "fold" function with a non-nullable and non-optional value argument', () => {
            // @ts-expect-error -- TS2345:
            //  Argument of type '{ (value: number): string; (value: string): number | null; }'
            //  is not assignable to parameter of type '(value: null | undefined) => string'.
            expect(() => nothing<number>().into<string>(decimal))
                .toThrow('Cannot read properties of undefined (reading \'toString\')');
        });

        it('returns the result of the given "fold" function applied to the value of Nothing', () => {
            expect(nothing().into(stringOutput)).toBe('undefined');
            expect(naught().into(stringOutput)).toBe('null');
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
                const output: Maybe<ObjectWithPresent<TypeGuardCheck, 'maybe' | 'optional'>> = naught<TypeGuardCheck>()
                    .which(hasPresentProperty('maybe', 'optional'));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nothing<ObjectWithPresent<TypeGuardCheck<number>, "optional" | "maybe">>'
                //  is not assignable to type 'Just<ObjectWithPresent<TypeGuardCheck<number>, "optional" | "maybe">>'.
                const output: Just<ObjectWithPresent<TypeGuardCheck, 'maybe' | 'optional'>> = naught<TypeGuardCheck>()
                    .which(hasPresentProperty('maybe', 'optional'));

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
                const output: Maybe<number> = nothing<number>().otherwise(2.71);

                expect(output).toStrictEqual(just(2.71));
            });

            it('returns Just with the fallback value', () => {
                const output: Just<number> = nothing<number>().otherwise(2.71);

                expect(output).toStrictEqual(just(2.71));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just<number>' is not assignable to type 'Nothing<number>'.
                const output: Nothing<number> = nothing<number>().otherwise(2.71);

                expect(output).toStrictEqual(just(2.71));
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = naught<number>().otherwise(constant(2.71));

                expect(output).toStrictEqual(just(2.71));
            });

            it('returns Just with the fallback value', () => {
                const output: Just<number> = naught<number>().otherwise(constant(2.71));

                expect(output).toStrictEqual(just(2.71));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just' is not assignable to type 'Nothing'.
                const output: Nothing<number> = naught<number>().otherwise(constant(2.71));

                expect(output).toStrictEqual(just(2.71));
            });
        });

        describe('when the "fallback" may be an absent value', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().otherwise(fallbackMaybe(2.71));

                expect(output).toStrictEqual(just(2.71));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe<number>' is not assignable to type 'Just<number>'.
                const output: Just<number> = nothing<number>().otherwise(fallbackMaybe(2.71));

                expect(output).toStrictEqual(just(2.71));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe<number>' is not assignable to type 'Nothing<number>'.
                const output: Nothing<number> = nothing<number>().otherwise(fallbackMaybe(2.71));

                expect(output).toStrictEqual(just(2.71));
            });
        });

        describe('when the "fallback" may return an absent value', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = naught<number>().otherwise(constant(fallbackMaybe(2.71)));

                expect(output).toStrictEqual(just(2.71));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe<number>' is not assignable to type 'Just<number>'.
                const output: Just<number> = naught<number>().otherwise(constant(fallbackMaybe(2.71)));

                expect(output).toStrictEqual(just(2.71));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe<number>' is not assignable to type 'Nothing<number>'.
                const output: Nothing<number> = naught<number>().otherwise(constant(fallbackMaybe(2.71)));

                expect(output).toStrictEqual(just(2.71));
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
            expect(nothing<number>().or(2.71))
                .toStrictEqual(nothing<number>().otherwise(2.71).value);
            expect(naught<number>().or(2.71))
                .toStrictEqual(naught<number>().otherwise(2.71).value);
        });

        it('allows to throw an error', () => {
            expect(() => nothing<number>().or(panic('Value is absent')))
                .toThrow('Value is absent');
            expect(() => naught<number>().or(panic('Value is absent')))
                .toThrow('Value is absent');
        });

        describe('when the "fallback" is present', () => {
            it('returns the given fallback value', () => {
                const output: string = nothing<string>().or('3.14');

                expect(output).toBe('3.14');
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('returns the result of the fallback', () => {
                const output: string = naught<string>().or(constant('3.14'));

                expect(output).toBe('3.14');
            });
        });

        describe('when the "fallback" may return an absent value', () => {
            it('must be assigned to the fallback return type', () => {
                const output: string | null | undefined = nothing<string>().or(fallbackMaybe<string>('3.14'));

                expect(output).toBe('3.14');
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'string | null | undefined' is not assignable to type 'string'.
                const output: string = nothing<string>().or(fallbackMaybe<string>('3.14'));

                expect(output).toBe('3.14');
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
                const output: string | null = nothing<string>().or(constant<string | null>('3.14'));

                expect(output).toBe('3.14');
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'string | null' is not assignable to type 'string'.
                const output: string = nothing<string>().or(constant<string | null>('3.14'));

                expect(output).toBe('3.14');
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
                const output: string | undefined = naught<string>().or(constant<string | undefined>('3.14'));

                expect(output).toBe('3.14');
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'string | undefined' is not assignable to type 'string'.
                const output: string = naught<string>().or(constant<string | undefined>('3.14'));

                expect(output).toBe('3.14');
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

        it('does not run the given procedure', () => {
            expect(pi).toBe(3.14);
            expect(nothing<number>().run(assignPi(3.1415))).toBe(nothing());
            expect(pi).toBe(3.14);
        });

        it('can be assigned to Maybe', () => {
            const output: Maybe<number> = nothing<number>().run(assignPi(3.1415));

            expect(output).toBe(nothing());
        });

        it('cannot be assigned to Just', () => {
            // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
            const output: Just<number> = nothing<number>().run(assignPi(3.1415));

            expect(output).toBe(nothing());
        });

        it('returns Nothing', () => {
            const output: Nothing<number> = nothing<number>().run(assignPi(3.1415));

            expect(output).toBe(nothing());
        });
    });

    describe('lift', () => {
        it('does not accept functions with strictly-typed input', () => {
            // @ts-expect-error -- TS2345:
            //  Argument of type '{ (value: number): string; (value: string): number | null; }'
            //  is not assignable to parameter of type '(value: null | undefined) => number | null | undefined'.
            expect(() => nothing().lift(decimal))
                .toThrow('Cannot read properties of undefined (reading \'toString\')');

            // @ts-expect-error -- TS2345:
            //  Argument of type '{ (value: number): string; (value: string): number | null; }'
            //  is not assignable to parameter of type '(value: null | undefined) => number | null | undefined'.
            expect(() => naught().lift(decimal))
                .toThrow('Cannot read properties of null (reading \'toString\')');
        });

        it('must be assigned to Maybe', () => {
            const output: Maybe<boolean> = nothing<number>().lift(isUndefined);

            expect(output).toStrictEqual(just(true));
        });

        it('cannot be assigned to Just', () => {
            // @ts-expect-error -- TS2322: Type 'Maybe<boolean>' is not assignable to type 'Just<boolean>'.
            const output: Just<boolean> = nothing<number>().lift(constant(false));

            expect(output).toStrictEqual(just(false));
        });

        it('cannot be assigned to Nothing', () => {
            // @ts-expect-error -- TS2322: Type 'Maybe<boolean>' is not assignable to type 'Nothing<boolean>'.
            const output: Nothing<boolean> = nothing<number>().lift<boolean>(constant(null));

            expect(output).toBe(naught());
        });
    });
});
