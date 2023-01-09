import { panic } from '../../error/panic/panic';
import { constant, Nullary } from '../../function/function/nullary';
import { hasPresentProperty, ObjectWithPresent } from '../../object/property/property';
import { safeDecimalOutput, strictDecimalOutput, unsafeDecimalOutput, unsafeNumber } from '../maybe/maybe.mock';
import { TypeGuardCheck } from '../maybe/type-guard-check.mock';

import { Nil, nil, Nullable, nullableOf, Only, only } from './nullable';
import { Boxed, nilDecimalOutput, nullableDecimalOutput, onlyDecimalOutput } from './nullable.mock';

describe(nil, () => {
    it('can be assigned to Nullable', () => {
        const output: Nullable<number> = nil();

        expect(output).toBe(nil());
    });

    it('cannot be assigned to Only', () => {
        // @ts-expect-error -- TS2322: Type 'Nil<number>' is not assignable to type 'Only<number>'.
        const output: Only<number> = nil();

        expect(output).toBe(nil());
    });
});

describe(Nil, () => {
    describe('value', () => {
        it('is null and cannot be assigned to the value type', () => {
            // @ts-expect-error -- TS2322: Type 'null' is not assignable to type 'number'.
            const value: number = nil<number>().value;

            expect(value).toBeNull();
        });
    });

    describe('onto', () => {
        describe('when the "flatMap" function returns Nullable', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<string> = nil<number>().onto(nullableDecimalOutput);

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Only'.
                const output: Only<string> = nil<number>().onto(nullableDecimalOutput);

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<string> = nil<number>().onto(nullableDecimalOutput);

                expect(output).toBe(nil());
            });
        });

        describe('when the "flatMap" function returns Only', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<string> = nil<number>().onto(onlyDecimalOutput);

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Only'.
                const output: Only<string> = nil<number>().onto(onlyDecimalOutput);

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<string> = nil<number>().onto(onlyDecimalOutput);

                expect(output).toBe(nil());
            });
        });

        describe('when the "flatMap" function returns Nil', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<string> = nil<number>().onto(nilDecimalOutput);

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Only'.
                const output: Only<string> = nil<number>().onto(nilDecimalOutput);

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<string> = nil<number>().onto(nilDecimalOutput);

                expect(output).toBe(nil());
            });
        });
    });

    describe('to', () => {
        describe('when the "map" function returns a present value', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<string> = nil<number>().to(safeDecimalOutput);

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil<string>' is not assignable to type 'Only<string>'.
                const output: Only<string> = nil<number>().to(safeDecimalOutput);

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<string> = nil<number>().to(safeDecimalOutput);

                expect(output).toBe(nil());
            });
        });

        describe('when the "map" function returns null', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<string | undefined> = nil<number>().to(unsafeDecimalOutput);

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Only'.
                const output: Only<string | undefined> = nil<number>().to(unsafeDecimalOutput);

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<string | undefined> = nil<number>().to(unsafeDecimalOutput);

                expect(output).toBe(nil());
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<string | undefined> = nil<number>().to(constant<string | undefined>(undefined));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil<string | undefined>' is not assignable to type 'Only<string>'.
                const output: Only<string> = nil<number>().to(constant<string | undefined>(undefined));

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<string | undefined> = nil<number>().to(constant<string | undefined>(undefined));

                expect(output).toBe(nil());
            });
        });
    });

    describe('into', () => {
        it('does not accept a "fold" function with a non-nullable value argument', () => {
            // @ts-expect-error -- TS2345:
            //  Argument of type '(input: number) => string'
            //  is not assignable to
            //  parameter of type '(value: null) => string'.
            expect(() => nil<number>().into(strictDecimalOutput))
                .toThrow("Cannot read properties of null (reading 'toString')");
        });

        it('returns the result of the given "fold" function applied to the value of Nil', () => {
            expect(nil().into(safeDecimalOutput)).toBe('null');
        });

        it('can be used to return Nullable', () => {
            const output: Nullable<string | undefined> = nil().into(nullableOf(unsafeDecimalOutput));

            expect(output).toBe(nil());
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

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Only'.
                const output: Only<number> = nil<TypeGuardCheck>().pick('required');

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

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nil<number | undefined>' is not assignable to type 'Only<number | undefined>'.
                const output: Only<number | undefined> = nil<TypeGuardCheck>().pick('possible');

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

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Only'.
                const output: Only<number> = nil<TypeGuardCheck>().pick('nullable');

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

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nil<number | undefined>' is not assignable to type 'Only<number | undefined>'.
                const output: Only<number | undefined> = nil<TypeGuardCheck>().pick('optional');

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

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Only'.
                const output: Only<number> = nil<number>().that(constant(true));

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

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Only'.
                const output: Only<number> = nil<number>().that(constant(false));

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

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nil<ObjectWithPresent<number, "toPrecision">>' is not assignable to type 'Only<number>'.
                const output: Only<number> = nil<number>().which(hasPresentProperty('toPrecision'));

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

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nil<ObjectWithPresent<TypeGuardCheck<number>, "optional" | "maybe">>'
                //  is not assignable to type 'Only<ObjectWithPresent<TypeGuardCheck<number>, "optional" | "maybe">>'.
                const output: Only<ObjectWithPresent<TypeGuardCheck, 'maybe' | 'optional'>> = nil<TypeGuardCheck>()
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

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Only'.
                const output: Only<number> = nil<number>().when(constant(true));

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

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Only'.
                const output: Only<number> = nil<number>().when(constant(false));

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
                const output: Nullable<number> = nil<number>().otherwise(0);

                expect(output).toStrictEqual(only(0));
            });

            it('returns Only with the fallback value', () => {
                const output: Only<number> = nil<number>().otherwise(0);

                expect(output).toStrictEqual(only(0));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Only<number>' is not assignable to type 'Nil<number>'.
                const output: Nil<number> = nil<number>().otherwise(0);

                expect(output).toStrictEqual(only(0));
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('returns Only with the fallback value', () => {
                const output: Only<number> = nil<number>().otherwise(constant(0));

                expect(output).toStrictEqual(only(0));
            });

            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().otherwise(constant(0));

                expect(output).toStrictEqual(only(0));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Only' is not assignable to type 'Nil'.
                const output: Nil<number> = nil<number>().otherwise(constant(0));

                expect(output).toStrictEqual(only(0));
            });
        });

        describe('fallback may be absent', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nil<number | undefined>().otherwise(unsafeNumber(0));

                expect(output).toStrictEqual(only(0));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<number | undefined>' is not assignable to type 'Only<number | undefined>'.
                const output: Only<number | undefined> = nil<number | undefined>().otherwise(unsafeNumber(0));

                expect(output).toStrictEqual(only(0));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable<number>' is not assignable to type 'Nil<number>'.
                const output: Nil<number | undefined> = nil<number | undefined>().otherwise(unsafeNumber(0));

                expect(output).toStrictEqual(only(0));
            });
        });

        describe('when the "fallback" is null', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().otherwise(null);

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Only'.
                const output: Only<number> = nil<number>().otherwise(null);

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

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Only'.
                const output: Only<number> = nil<number>().otherwise(constant(null));

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

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Only', () => {
                const output: Only<number | undefined> = nil<number | undefined>().otherwise(undefined);

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Nil (undefined) value', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Only<number | undefined>' is not assignable to type 'Nil<number | undefined>'.
                const output: Nil<number | undefined> = nil<number | undefined>().otherwise(undefined);

                expect(output).toStrictEqual(only(undefined));
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('can be assigned to Nullable of undefined value', () => {
                const output: Nullable<number | undefined> = nil<number | undefined>().otherwise(constant(undefined));

                expect(output).toStrictEqual(only(undefined));
            });

            it('returns a Only undefined value', () => {
                const output: Only<number | undefined> = nil<number | undefined>().otherwise(constant(undefined));

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Nil of undefined value', () => {
                // @ts-expect-error -- TS2322: Type 'Only' is not assignable to type 'Nil'.
                const output: Nil<number | undefined> = nil<number | undefined>().otherwise(constant(undefined));

                expect(output).toStrictEqual(only(undefined));
            });
        });
    });

    describe('or', () => {
        it('is a shortcut for Nullable.otherwise().value', () => {
            expect(nil<number>().or(0))
                .toStrictEqual(nil<number>().otherwise(0).value);
        });

        it('allows to throw an error', () => {
            expect(() => nil<number>().or(panic('Value is absent')))
                .toThrow('Value is absent');
        });

        describe('fallback is present', () => {
            it('returns the given fallback value', () => {
                const output: number = nil<number>().or(0);

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('returns the result of the fallback', () => {
                const output: number = nil<number>().or(constant(0));

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" is null', () => {
            it('returns null', () => {
                const output: null = nil<string>().or(null);

                expect(output).toBeNull();
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'null' is not assignable to type 'string'.
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
                // @ts-expect-error -- TS2322: Type 'null' is not assignable to type 'string'.
                const output: string = nil<string>().or(constant(null));

                expect(output).toBeNull();
            });
        });

        describe('fallback may return null', () => {
            it('must be assigned to the fallback return type', () => {
                const output: number | null = nil<number>().or(constant<number | null>(0));

                expect(output).toBe(0);
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'string | null' is not assignable to type 'string'.
                const output: number = nil<number>().or(constant<number | null>(0));

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('returns undefined', () => {
                const output: number | undefined = nil<number | undefined>().or(undefined);

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number'.
                const output: number = nil<number | undefined>().or(undefined);

                expect(output).toBeUndefined();
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('returns undefined', () => {
                const output: number | undefined = nil<number | undefined>().or(constant(undefined));

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number'.
                const output: number = nil<number | undefined>().or(constant(undefined));

                expect(output).toBeUndefined();
            });
        });

        describe('fallback may return undefined', () => {
            it('must be assigned to the fallback return type', () => {
                const output: number | undefined = nil<number | undefined>().or(constant(0));

                expect(output).toBe(0);
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'string | undefined' is not assignable to type 'string'.
                const output: number = nil<number | undefined>().or(constant(0));

                expect(output).toBe(0);
            });
        });

        describe('fallback may return an absent value', () => {
            it('must be assigned to the fallback return type', () => {
                const output: number | null | undefined = nil<number | undefined>().or(unsafeNumber(0));

                expect(output).toBe(0);
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null | undefined' is not assignable to type 'number'.
                const output: number = nil<string>().or(unsafeNumber(0));

                expect(output).toBe(0);
            });
        });
    });

    describe('run', () => {
        let value: number;

        // eslint-disable-next-line func-style -- conflicts with prefer-arrow
        const assignValue = (update: number): Nullary<void> => (): void => {
            value = update;
        };

        beforeEach(() => {
            value = 0;
        });

        it('does not run the given procedure', () => {
            expect(value).toBe(0);
            expect(nil<number>().run(assignValue(1))).toBe(nil());
            expect(value).toBe(0);
        });

        it('can be assigned to Nullable', () => {
            const output: Nullable<number> = nil<number>().run(assignValue(1));

            expect(output).toBe(nil());
        });

        it('cannot be assigned to Only', () => {
            // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Only'.
            const output: Only<number> = nil<number>().run(assignValue(1));

            expect(output).toBe(nil());
        });

        it('returns Nil', () => {
            const output: Nil<number> = nil<number>().run(assignValue(1));

            expect(output).toBe(nil());
        });
    });

    /* eslint-disable deprecation/deprecation -- to be removed in v0.10.0 */
    describe('lift', () => {
        it('does not accept functions with strictly-typed input', () => {
            // @ts-expect-error -- TS2345:
            //  Argument of type '(input: number) => string'
            //  is not assignable to
            //  parameter of type '(value: null) => string | null'.
            expect(() => nil<string>().lift(strictDecimalOutput))
                .toThrow("Cannot read properties of null (reading 'toString')");
        });

        it('must be assigned to Nullable', () => {
            const output: Nullable<string | undefined> = nil<number>().lift(unsafeDecimalOutput);

            expect(output).toStrictEqual(nil());
        });

        it('cannot be assigned to Only', () => {
            // @ts-expect-error -- TS2322:
            //  Type 'Nullable<string | undefined>' is not assignable to type 'Only<string | undefined>'.
            const output: Only<string | undefined> = nil<number>().lift(unsafeDecimalOutput);

            expect(output).toStrictEqual(nil());
        });

        it('cannot be assigned to Nil', () => {
            // @ts-expect-error -- TS2322:
            //  Type 'Nullable<string | undefined>' is not assignable to type 'Nil<string | undefined>'.
            const output: Nil<string | undefined> = nil<number>().lift(unsafeDecimalOutput);

            expect(output).toBe(nil());
        });
    });
    /* eslint-enable deprecation/deprecation */
});
