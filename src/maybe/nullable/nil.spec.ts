import { panic } from '../../error/panic/panic';
import { constant, Nullary } from '../../function/function/nullary';
import { decimal } from '../../number/number/base';
import { hasPresentProperty, ObjectWithPresent } from '../../object/property/property';
import { isNull } from '../../value/value/value';
import { TypeGuardCheck } from '../maybe/type-guard-check.mock';

import { Nil, nil, Nullable, nullable, Solum, solum } from './nullable';
import { Boxed, fallbackNullable } from './nullable.mock';

describe(nil, () => {
    it('can be assigned to Nullable', () => {
        const output: Nullable<number> = nil();

        expect(output).toBe(nil());
    });

    it('cannot be assigned to Solum', () => {
        // TS2322: Type 'Nil<number | null>' is not assignable to type 'Solum<number>'.
        // @ts-expect-error -- Solum is not Nil.
        const output: Solum<number> = nil();

        expect(output).toBe(nil());
    });
});

describe(Nil, () => {
    describe('value', () => {
        it('is null and cannot be assigned to the value type', () => {
            // TS2322: Type 'null' is not assignable to type 'number'.
            // @ts-expect-error -- Nil.value has to be assigned to "null".
            const value: number = nil<number>().value;

            expect(value).toBeNull();
        });
    });

    describe('onto', () => {
        describe('when the "flatMap" function returns Nullable', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().onto(constant(nullable(2.71)));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nil' is not assignable to type 'Solum'.
                // @ts-expect-error -- Nil.onto() always returns itself (Nil).
                const output: Solum<number> = nil<number>().onto(constant(nullable(2.71)));

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<number> = nil<number>().onto(constant(nullable(2.71)));

                expect(output).toBe(nil());
            });
        });

        describe('when the "flatMap" function returns Solum', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().onto(constant(solum(2.71)));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nil' is not assignable to type 'Solum'.
                // @ts-expect-error -- Nil.onto() always returns itself (Nil).
                const output: Solum<number> = nil<number>().onto(constant(solum(2.71)));

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<number> = nil<number>().onto(constant(solum(2.71)));

                expect(output).toBe(nil());
            });
        });

        describe('when the "flatMap" function returns Nil', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().onto(constant(nil<number>()));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nil' is not assignable to type 'Solum'.
                // @ts-expect-error -- Nil.onto() always returns itself (Nil).
                const output: Solum<number> = nil<number>().onto(constant(nil<number>()));

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<number> = nil<number>().onto(constant(nil<number>()));

                expect(output).toBe(nil());
            });
        });
    });

    describe('to', () => {
        describe('when the "map" function returns a present value', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<string> = nil<number>().to(constant('3.14'));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nil' is not assignable to type 'Solum'.
                // @ts-expect-error -- Nil.to() always returns Nil.
                const output: Solum<string> = nil<number>().to(constant('3.14'));

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<string> = nil<number>().to(constant('3.14'));

                expect(output).toBe(nil());
            });
        });

        describe('when the "map" function returns null', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<string> = nil<number>().to(constant<string | null>(null));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nil' is not assignable to type 'Solum'.
                // @ts-expect-error -- Nil.to() always returns Nil.
                const output: Solum<string> = nil<number>().to(constant<string | null>(null));

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<string> = nil<number>().to(constant<string | null>(null));

                expect(output).toBe(nil());
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<string | undefined> = nil<number>().to(constant<string | undefined>(undefined));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nil' is not assignable to type 'Solum'.
                // @ts-expect-error -- Nil.to() always returns Nil.
                const output: Solum<string> = nil<number>().to(constant<string | undefined>(undefined));

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<string | undefined> = nil<number>().to(constant<string | undefined>(undefined));

                expect(output).toBe(nil());
            });
        });
    });

    describe('pick', () => {
        it('is an equivalent of the then() chain', () => {
            const input: Nil<TypeGuardCheck<Boxed<number>>> = nil<TypeGuardCheck<Boxed<number>>>();

            expect(input.pick('required').pick('value'))
                .toStrictEqual(input.to(i => i.required).to(i => i.value));
        });

        describe('when the property is required', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<TypeGuardCheck>().pick('required');

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nil' is not assignable to type 'Solum'.
                // @ts-expect-error -- Nil.pick() always returns Nil.
                const output: Solum<number> = nil<TypeGuardCheck>().pick('required');

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<number> = nil<TypeGuardCheck>().pick('required');

                expect(output).toBe(nil());
            });
        });

        describe('when the property can be absent', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nil<TypeGuardCheck>().pick('possible');

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nil' is not assignable to type 'Solum'.
                // @ts-expect-error -- Nil.pick() always returns Nil.
                const output: Solum<number> = nil<TypeGuardCheck>().pick('possible');

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<number | undefined> = nil<TypeGuardCheck>().pick('possible');

                expect(output).toBe(nil());
            });
        });

        describe('when the property is nullable', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<TypeGuardCheck>().pick('nullable');

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nil' is not assignable to type 'Solum'.
                // @ts-expect-error -- Nil.pick() always returns Nil.
                const output: Solum<number> = nil<TypeGuardCheck>().pick('nullable');

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<number> = nil<TypeGuardCheck>().pick('nullable');

                expect(output).toBe(nil());
            });
        });

        describe('when the property is optional', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nil<TypeGuardCheck>().pick('optional');

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nil' is not assignable to type 'Solum'.
                // @ts-expect-error -- Nil.pick() always returns Nil.
                const output: Solum<number> = nil<TypeGuardCheck>().pick('optional');

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<number | undefined> = nil<TypeGuardCheck>().pick('optional');

                expect(output).toBe(nil());
            });
        });
    });

    describe('that', () => {
        describe('when the "filter" condition is true', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().that(constant(true));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nil' is not assignable to type 'Solum'.
                // @ts-expect-error -- Nil.that() always returns Nil.
                const output: Solum<number> = nil<number>().that(constant(true));

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<number> = nil<number>().that(constant(true));

                expect(output).toBe(nil());
            });
        });

        describe('when the "filter" condition is false', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().that(constant(false));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nil' is not assignable to type 'Solum'.
                // @ts-expect-error -- Nil.that() always returns Nil.
                const output: Solum<number> = nil<number>().that(constant(false));

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<number> = nil<number>().that(constant(false));

                expect(output).toBe(nil());
            });
        });
    });

    describe('which', () => {
        describe('when the "filter" type guard is true', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().which(hasPresentProperty('toPrecision'));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nil' is not assignable to type 'Solum'.
                // @ts-expect-error -- Nil.which() always returns Nil.
                const output: Solum<number> = nil<number>().which(hasPresentProperty('toPrecision'));

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<number> = nil<number>().which(hasPresentProperty('toPrecision'));

                expect(output).toBe(nil());
            });
        });

        describe('when the "filter" type guard is false', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<ObjectWithPresent<TypeGuardCheck, 'maybe' | 'optional'>> = nil<TypeGuardCheck>()
                    .which(hasPresentProperty('maybe', 'optional'));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nil' is not assignable to type 'Solum'.
                // @ts-expect-error -- Nil.which() always returns Nil.
                const output: Solum<ObjectWithPresent<TypeGuardCheck, 'maybe' | 'optional'>> = nil<TypeGuardCheck>()
                    .which(hasPresentProperty('maybe', 'optional'));

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<ObjectWithPresent<TypeGuardCheck, 'maybe'>> = nil<TypeGuardCheck>()
                    .which(hasPresentProperty('maybe'));

                expect(output).toBe(nil());
            });
        });
    });

    describe('when', () => {
        describe('when the "filter" condition is true', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().when(constant(true));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nil' is not assignable to type 'Solum'.
                // @ts-expect-error -- Nil.when() always returns Nil.
                const output: Solum<number> = nil<number>().when(constant(true));

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<number> = nil<number>().when(constant(true));

                expect(output).toBe(nil());
            });
        });

        describe('when the "filter" condition is false', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().when(constant(false));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nil' is not assignable to type 'Solum'.
                // @ts-expect-error -- Nil.when() always returns Nil.
                const output: Solum<number> = nil<number>().when(constant(false));

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<number> = nil<number>().when(constant(false));

                expect(output).toBe(nil());
            });
        });
    });

    describe('otherwise', () => {
        it('allows to throw an error', () => {
            expect(() => nil<number>().otherwise(panic('Value is absent')))
                .toThrow('Value is absent');
        });

        describe('when the "fallback" is a present value', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().otherwise(2.71);

                expect(output).toStrictEqual(solum(2.71));
            });

            it('returns Solum with the fallback value', () => {
                const output: Solum<number> = nil<number>().otherwise(2.71);

                expect(output).toStrictEqual(solum(2.71));
            });

            it('cannot be assigned to Nil', () => {
                // TS2322: Type 'Solum<number>' is not assignable to type 'Nil<number>'.
                // @ts-expect-error -- Nil.otherwise() always returns the fallback.
                const output: Nil<number> = nil<number>().otherwise(2.71);

                expect(output).toStrictEqual(solum(2.71));
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('returns Solum with the fallback value', () => {
                const output: Solum<number> = nil<number>().otherwise(constant(2.71));

                expect(output).toStrictEqual(solum(2.71));
            });

            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().otherwise(constant(2.71));

                expect(output).toStrictEqual(solum(2.71));
            });

            it('cannot be assigned to Nil', () => {
                // TS2322: Type 'Solum<number>' is not assignable to type 'Nil<number>'.
                // @ts-expect-error -- Nil.otherwise() always returns the fallback and it is present
                const output: Nil<number> = nil<number>().otherwise(constant(2.71));

                expect(output).toStrictEqual(solum(2.71));
            });
        });

        describe('fallback may be absent', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().otherwise(fallbackNullable(2.71));

                expect(output).toStrictEqual(solum(2.71));
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nullable<number>' is not assignable to type 'Solum<number>'.
                // @ts-expect-error -- Nil.otherwise() always returns the fallback, but the result may be absent.
                const output: Solum<number> = nil<number>().otherwise(fallbackNullable(2.71));

                expect(output).toStrictEqual(solum(2.71));
            });

            it('cannot be assigned to Nil', () => {
                // TS2322: Type 'Nullable<number>' is not assignable to type 'Nil<number>'.
                // @ts-expect-error -- Nil.otherwise() always returns the fallback, but the result may be present.
                const output: Nil<number> = nil<number>().otherwise(fallbackNullable(2.71));

                expect(output).toStrictEqual(solum(2.71));
            });
        });

        describe('when the "fallback" is null', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().otherwise(null);

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nil' is not assignable to type 'Solum'.
                // @ts-expect-error -- Nil.otherwise() always returns the fallback and it is absent.
                const output: Solum<number> = nil<number>().otherwise(null);

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<number> = nil<number>().otherwise(null);

                expect(output).toBe(nil());
            });
        });

        describe('when the "fallback" returns null', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().otherwise(constant(null));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // TS2322: Type 'Nil' is not assignable to type 'Solum'.
                // @ts-expect-error -- Nil.otherwise() always returns the fallback and it is absent.
                const output: Solum<number> = nil<number>().otherwise(constant(null));

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<number> = nil<number>().otherwise(constant(null));

                expect(output).toBe(nil());
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nil<number | undefined>().otherwise(undefined);

                expect(output).toStrictEqual(solum(undefined));
            });

            it('cannot be assigned to Solum', () => {
                const output: Solum<number | undefined> = nil<number | undefined>().otherwise(undefined);

                expect(output).toStrictEqual(solum(undefined));
            });

            it('cannot be assigned to Nil (undefined) value', () => {
                // TS2322: Type 'Solum<number | undefined>' is not assignable to type 'Nil<number | undefined>'.
                // @ts-expect-error -- Nil.otherwise always returns the fallback value and it is not null.
                const output: Nil<number | undefined> = nil<number | undefined>().otherwise(undefined);

                expect(output).toStrictEqual(solum(undefined));
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('can be assigned to Nullable of undefined value', () => {
                const output: Nullable<number | undefined> = nil<number | undefined>().otherwise(constant(undefined));

                expect(output).toStrictEqual(solum(undefined));
            });

            it('returns a Solum undefined value', () => {
                const output: Solum<number | undefined> = nil<number | undefined>().otherwise(constant(undefined));

                expect(output).toStrictEqual(solum(undefined));
            });

            it('cannot be assigned to Nil of undefined value', () => {
                // TS2322: Type 'Solum' is not assignable to type 'Nil'.
                // @ts-expect-error -- Nil.otherwise always returns the fallback value which is not null.
                const output: Nil<number | undefined> = nil<number | undefined>().otherwise(constant(undefined));

                expect(output).toStrictEqual(solum(undefined));
            });
        });
    });

    describe('or', () => {
        it('is a shortcut for Nullable.otherwise().value', () => {
            expect(nil<number>().or(2.71))
                .toStrictEqual(nil<number>().otherwise(2.71).value);
        });

        it('allows to throw an error', () => {
            expect(() => nil<number>().or(panic('Value is absent')))
                .toThrow('Value is absent');
        });

        describe('fallback is present', () => {
            it('returns the given fallback value', () => {
                const output: string = nil<string>().or('3.14');

                expect(output).toStrictEqual('3.14');
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('returns the result of the fallback', () => {
                const output: string = nil<string>().or(constant('3.14'));

                expect(output).toStrictEqual('3.14');
            });
        });

        describe('when the "fallback" is null', () => {
            it('returns null', () => {
                const output: null = nil<string>().or(null);

                expect(output).toBeNull();
            });

            it('cannot be assigned to the value type', () => {
                // TS2322: Type 'null' is not assignable to type 'string'.
                // @ts-expect-error -- Nil.or() returns the fallback, which is strictly null
                const output: string = nil<string>().or(null);

                expect(output).toBeNull();
            });
        });

        describe('when the "fallback" returns null', () => {
            it('returns null', () => {
                const output: null = nil<string>().or(constant(null));

                expect(output).toBeNull();
            });

            it('cannot be assigned to the value type', () => {
                // TS2322: Type 'null' is not assignable to type 'string'.
                // @ts-expect-error -- Nil.or() returns the fallback, which is strictly null
                const output: string = nil<string>().or(constant(null));

                expect(output).toBeNull();
            });
        });

        describe('fallback may return null', () => {
            it('must be assigned to the fallback return type', () => {
                const output: string | null = nil<string>().or(constant<string | null>('3.14'));

                expect(output).toStrictEqual('3.14');
            });

            it('cannot be assigned to the value type', () => {
                // TS2322: Type 'string | null' is not assignable to type 'string'.
                // @ts-expect-error -- fallback may return string or null.
                const output: string = nil<string>().or(constant<string | null>('3.14'));

                expect(output).toStrictEqual('3.14');
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('returns undefined', () => {
                const output: string | undefined = nil<string | undefined>().or(undefined);

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the value type', () => {
                // TS2322: Type 'string | undefined' is not assignable to type 'string'.
                // @ts-expect-error -- Nil.or() returns the fallback, which is strictly undefined.
                const output: string = nil<string | undefined>().or(undefined);

                expect(output).toBeUndefined();
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('returns undefined', () => {
                const output: string | undefined = nil<string | undefined>().or(constant(undefined));

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the value type', () => {
                // TS2322: Type 'string | undefined' is not assignable to type 'string'.
                // @ts-expect-error -- Nil.or() returns the fallback, which is strictly undefined.
                const output: string = nil<string | undefined>().or(constant(undefined));

                expect(output).toBeUndefined();
            });
        });

        describe('fallback may return undefined', () => {
            it('must be assigned to the fallback return type', () => {
                const output: string | undefined = nil<string | undefined>().or(constant('3.14'));

                expect(output).toStrictEqual('3.14');
            });

            it('cannot be assigned to the value type', () => {
                // TS2322: Type 'string | undefined' is not assignable to type 'string'.
                // @ts-expect-error -- fallback may return string or undefined.
                const output: string = nil<string | undefined>().or(constant('3.14'));

                expect(output).toStrictEqual('3.14');
            });
        });

        describe('fallback may return an absent value', () => {
            it('must be assigned to the fallback return type', () => {
                const output: string | null | undefined = nil<string>().or(fallbackNullable<string>('3.14'));

                expect(output).toStrictEqual('3.14');
            });

            it('cannot be assigned to the value type', () => {
                // TS2322: Type 'string | null' is not assignable to type 'string'.
                // @ts-expect-error -- fallback may return string, null, or undefined.
                const output: string = nil<string>().or(fallbackNullable<string>('3.14'));

                expect(output).toStrictEqual('3.14');
            });
        });
    });

    describe('run', () => {
        let pi: number = 3.14;

        // eslint-disable-next-line func-style -- conflicts with prefer-arrow
        const assignPi = (value: number): Nullary<void> => (): void => {
            pi = value;
        };

        it('does not run the given procedure', () => {
            expect(pi).toStrictEqual(3.14);
            expect(nil<number>().run(assignPi(3.1415))).toBe(nil());
            expect(pi).toStrictEqual(3.14);
        });

        it('can be assigned to Nullable', () => {
            const output: Nullable<number> = nil<number>().run(assignPi(3.1415));

            expect(output).toBe(nil());
        });

        it('cannot be assigned to Solum', () => {
            // TS2322: Type 'Nil<number>' is not assignable to type 'Solum<number>'.
            // @ts-expect-error -- Nil.run returns Nil.
            const output: Solum<number> = nil<number>().run(assignPi(3.1415));

            expect(output).toBe(nil());
        });

        it('returns Nil', () => {
            const output: Nil<number> = nil<number>().run(assignPi(3.1415));

            expect(output).toBe(nil());
        });
    });

    describe('lift', () => {
        it('does not accept functions with strictly-typed input', () => {
            expect(() => {
                // TS2345: Argument of type '{ (value: number): string; (value: string): number | null; }'
                //  is not assignable to parameter of type '(value: null) => number | null'.
                // @ts-expect-error -- Nil.lift passes null or undefined into the function.
                nil<string>().lift(decimal);
            }).toThrow("Cannot read property 'toString' of null");
        });

        it('must be assigned to Nullable', () => {
            const output: Nullable<boolean> = nil<number>().lift(isNull);

            expect(output).toStrictEqual(solum(true));
        });

        it('cannot be assigned to Solum', () => {
            // TS2322: Type 'Nullable<false>' is not assignable to type 'Solum<boolean>'.
            // @ts-expect-error -- Nil.lift() may return Nil.
            const output: Solum<boolean> = nil<number>().lift(constant(false));

            expect(output).toStrictEqual(solum(false));
        });

        it('cannot be assigned to Nil', () => {
            // TS2322: Type 'Nullable<boolean>' is not assignable to type 'Nil<boolean>'.
            // @ts-expect-error -- Nil.lift() may return Solum.
            const output: Nil<boolean> = nil<number>().lift<boolean>(constant(null));

            expect(output).toBe(nil());
        });
    });
});
