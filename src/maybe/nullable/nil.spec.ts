import { panic } from '../../error/panic/panic';
import { constant, Nullary } from '../../function/function/nullary';
import { decimal } from '../../number/number/base';
import { hasPresentProperty, ObjectWithPresent } from '../../object/property/property';
import { output as stringOutput } from '../../string/string/output';
import { isNull, isPresent } from '../../value/value';
import { TypeGuardCheck } from '../maybe/type-guard-check.mock';

import { Nil, nil, Nullable, nullable, nullableOf, Only, only } from './nullable';
import { Boxed, fallbackNullable } from './nullable.mock';

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
                const output: Nullable<number> = nil<number>().onto(constant(nullable(fallbackNullable(2.71))));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Only'.
                const output: Only<number> = nil<number>().onto(constant(nullable(fallbackNullable(2.71))));

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<number> = nil<number>().onto(constant(nullable(fallbackNullable(2.71))));

                expect(output).toBe(nil());
            });
        });

        describe('when the "flatMap" function returns Only', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().onto(constant(only(2.71)));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Only'.
                const output: Only<number> = nil<number>().onto(constant(only(2.71)));

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<number> = nil<number>().onto(constant(only(2.71)));

                expect(output).toBe(nil());
            });
        });

        describe('when the "flatMap" function returns Nil', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().onto(constant(nil<number>()));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Only'.
                const output: Only<number> = nil<number>().onto(constant(nil<number>()));

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

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil<string>' is not assignable to type 'Only<string>'.
                const output: Only<string> = nil<number>().to(constant('3.14'));

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

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Only'.
                const output: Only<string> = nil<number>().to(constant<string | null>(null));

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
            //  Argument of type '{ (value: number): string; (value: string): number | null; }'
            //  is not assignable to parameter of type '(value: null) => string'.
            expect(() => nil<number>().into<string>(decimal))
                .toThrow("Cannot read properties of null (reading 'toString')");
        });

        it('returns the result of the given "fold" function applied to the value of Nil', () => {
            expect(nil().into(stringOutput)).toBe('null');
        });

        it('can be used to return Nullable', () => {
            const output: Nullable<boolean> = nil().into(nullableOf(isPresent));

            expect(output).toStrictEqual(only(false));
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
                // @ts-expect-error -- TS2322: Type 'Nil<number | undefined>' is not assignable to type 'Only<number>'.
                const output: Only<number> = nil<TypeGuardCheck>().pick('possible');

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
                // @ts-expect-error -- TS2322: Type 'Nil<number | undefined>' is not assignable to type 'Only<number>'.
                const output: Only<number> = nil<TypeGuardCheck>().pick('optional');

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
                const output: Nullable<number> = nil<number>().otherwise(2.71);

                expect(output).toStrictEqual(only(2.71));
            });

            it('returns Only with the fallback value', () => {
                const output: Only<number> = nil<number>().otherwise(2.71);

                expect(output).toStrictEqual(only(2.71));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Only<number>' is not assignable to type 'Nil<number>'.
                const output: Nil<number> = nil<number>().otherwise(2.71);

                expect(output).toStrictEqual(only(2.71));
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('returns Only with the fallback value', () => {
                const output: Only<number> = nil<number>().otherwise(constant(2.71));

                expect(output).toStrictEqual(only(2.71));
            });

            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().otherwise(constant(2.71));

                expect(output).toStrictEqual(only(2.71));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Only' is not assignable to type 'Nil'.
                const output: Nil<number> = nil<number>().otherwise(constant(2.71));

                expect(output).toStrictEqual(only(2.71));
            });
        });

        describe('fallback may be absent', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number> = nil<number>().otherwise(fallbackNullable(2.71));

                expect(output).toStrictEqual(only(2.71));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable<number>' is not assignable to type 'Only<number>'.
                const output: Only<number> = nil<number>().otherwise(fallbackNullable(2.71));

                expect(output).toStrictEqual(only(2.71));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable<number>' is not assignable to type 'Nil<number>'.
                const output: Nil<number> = nil<number>().otherwise(fallbackNullable(2.71));

                expect(output).toStrictEqual(only(2.71));
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

                expect(output).toBe('3.14');
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('returns the result of the fallback', () => {
                const output: string = nil<string>().or(constant('3.14'));

                expect(output).toBe('3.14');
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
                const output: string | null = nil<string>().or(constant<string | null>('3.14'));

                expect(output).toBe('3.14');
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'string | null' is not assignable to type 'string'.
                const output: string = nil<string>().or(constant<string | null>('3.14'));

                expect(output).toBe('3.14');
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('returns undefined', () => {
                const output: string | undefined = nil<string | undefined>().or(undefined);

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'string | undefined' is not assignable to type 'string'.
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
                // @ts-expect-error -- TS2322: Type 'string | undefined' is not assignable to type 'string'.
                const output: string = nil<string | undefined>().or(constant(undefined));

                expect(output).toBeUndefined();
            });
        });

        describe('fallback may return undefined', () => {
            it('must be assigned to the fallback return type', () => {
                const output: string | undefined = nil<string | undefined>().or(constant('3.14'));

                expect(output).toBe('3.14');
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'string | undefined' is not assignable to type 'string'.
                const output: string = nil<string | undefined>().or(constant('3.14'));

                expect(output).toBe('3.14');
            });
        });

        describe('fallback may return an absent value', () => {
            it('must be assigned to the fallback return type', () => {
                const output: string | null | undefined = nil<string>().or(fallbackNullable<string>('3.14'));

                expect(output).toBe('3.14');
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'string | null' is not assignable to type 'string'.
                const output: string = nil<string>().or(fallbackNullable<string>('3.14'));

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
            expect(nil<number>().run(assignPi(3.1415))).toBe(nil());
            expect(pi).toBe(3.14);
        });

        it('can be assigned to Nullable', () => {
            const output: Nullable<number> = nil<number>().run(assignPi(3.1415));

            expect(output).toBe(nil());
        });

        it('cannot be assigned to Only', () => {
            // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Only'.
            const output: Only<number> = nil<number>().run(assignPi(3.1415));

            expect(output).toBe(nil());
        });

        it('returns Nil', () => {
            const output: Nil<number> = nil<number>().run(assignPi(3.1415));

            expect(output).toBe(nil());
        });
    });

    /* eslint-disable deprecation/deprecation -- to be removed in v0.10.0 */
    describe('lift', () => {
        it('does not accept functions with strictly-typed input', () => {
            // @ts-expect-error --TS2345:
            //  Argument of type '{ (value: number): string; (value: string): number | null; }'
            //  is not assignable to parameter of type '(value: null) => number | null'.
            expect(() => nil<string>().lift(decimal))
                .toThrow("Cannot read properties of null (reading 'toString')");
        });

        it('must be assigned to Nullable', () => {
            const output: Nullable<boolean> = nil<number>().lift(isNull);

            expect(output).toStrictEqual(only(true));
        });

        it('cannot be assigned to Only', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable<boolean>' is not assignable to type 'Only<boolean>'.
            const output: Only<boolean> = nil<number>().lift(constant(false));

            expect(output).toStrictEqual(only(false));
        });

        it('cannot be assigned to Nil', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable<boolean>' is not assignable to type 'Nil<boolean>'.
            const output: Nil<boolean> = nil<number>().lift<boolean>(constant(null));

            expect(output).toBe(nil());
        });
    });
    /* eslint-enable deprecation/deprecation */
});
