import { panic } from '../../error/panic/panic';
import { constant, Nullary } from '../../function/function/nullary';
import { decimal } from '../../number/number/base';
import { hasPresentProperty, ObjectWithPresent } from '../../object/property/property';
import { output as stringOutput } from '../../string/string/output';
import { isUndefined } from '../../value/value';
import { TypeGuardCheck } from '../maybe/type-guard-check.mock';

import { None, none, Optional, optional, Some, some } from './optional';
import { Boxed, fallbackOptional } from './optional.mock';

describe(none, () => {
    it('can be assigned to Optional', () => {
        const output: Optional<number> = none();

        expect(output).toBe(none());
    });

    it('cannot be assigned to Some', () => {
        // @ts-expect-error -- TS2322: Type 'None<number>' is not assignable to type 'Some<number>'.
        const output: Some<number> = none();

        expect(output).toBe(none());
    });
});

describe(None, () => {
    describe('value', () => {
        it('is undefined and cannot be assigned to the value type', () => {
            // @ts-expect-error -- TS2322: Type 'undefined' is not assignable to type 'number'.
            const value: number = none<number>().value;

            expect(value).toBeUndefined();
        });
    });

    describe('onto', () => {
        describe('when the "flatMap" function returns Optional', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = none<number>().onto(constant(optional(2.71)));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'None' is not assignable to type 'Some'.
                const output: Some<number> = none<number>().onto(constant(optional(2.71)));

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<number> = none<number>().onto(constant(optional(2.71)));

                expect(output).toBe(none());
            });
        });

        describe('when the "flatMap" function returns Some', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = none<number>().onto(constant(some(2.71)));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'None' is not assignable to type 'Some'.
                const output: Some<number> = none<number>().onto(constant(some(2.71)));

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<number> = none<number>().onto(constant(some(2.71)));

                expect(output).toBe(none());
            });
        });

        describe('when the "flatMap" function returns None', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = none<number>().onto(constant(none<number>()));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'None' is not assignable to type 'Some'.
                const output: Some<number> = none<number>().onto(constant(none<number>()));

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<number> = none<number>().onto(constant(none<number>()));

                expect(output).toBe(none());
            });
        });
    });

    describe('to', () => {
        describe('when the "map" function returns a present value', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<string> = none<number>().to(constant('3.14'));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'None<string>' is not assignable to type 'Some<string>'.
                const output: Some<string> = none<number>().to(constant('3.14'));

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<string> = none<number>().to(constant('3.14'));

                expect(output).toBe(none());
            });
        });

        describe('when the "map" function returns null', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<string | null> = none<number>().to(constant<string | null>(null));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'None<string | null>' is not assignable to type 'Some<string | null>'.
                const output: Some<string | null> = none<number>().to(constant<string | null>(null));

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<string | null> = none<number>().to(constant<string | null>(null));

                expect(output).toBe(none());
                expect(output).toBe(none());
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<string> = none<number>().to(constant<string | undefined>(undefined));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'None' is not assignable to type 'Some'.
                const output: Some<string> = none<number>().to(constant<string | undefined>(undefined));

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<string> = none<number>().to(constant<string | undefined>(undefined));

                expect(output).toBe(none());
            });
        });
    });

    describe('into', () => {
        it('does not accept a "fold" function with a non-optional value argument', () => {
            // @ts-expect-error -- TS2345:
            //  Argument of type '{ (value: number): string; (value: string): number | null; }'
            //  is not assignable to parameter of type '(value: undefined) => string'.
            expect(() => none<number>().into<string>(decimal))
                .toThrow("Cannot read properties of undefined (reading 'toString')");
        });

        it('returns the result of the given "fold" function applied to the value of None', () => {
            expect(none().into(stringOutput)).toBe('undefined');
        });
    });

    describe('pick', () => {
        it('is an equivalent of the then() chain', () => {
            const input: None<TypeGuardCheck<Boxed<number>>> = none<TypeGuardCheck<Boxed<number>>>();

            expect(input.pick('required').pick('value'))
                .toStrictEqual(input.to(i => i.required).to(i => i.value));
        });

        describe('when the property is required', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = none<TypeGuardCheck>().pick('required');

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'None' is not assignable to type 'Some'.
                const output: Some<number> = none<TypeGuardCheck>().pick('required');

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<number> = none<TypeGuardCheck>().pick('required');

                expect(output).toBe(none());
            });
        });

        describe('when the property is possible', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number | null> = none<TypeGuardCheck>().pick('possible');

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'None<number | null>' is not assignable to type 'Some<number | null>'.
                const output: Some<number | null> = none<TypeGuardCheck>().pick('possible');

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<number | null> = none<TypeGuardCheck>().pick('possible');

                expect(output).toBe(none());
            });
        });

        describe('when the property is nullable', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number | null> = none<TypeGuardCheck>().pick('nullable');

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'None' is not assignable to type 'Some'.
                const output: Some<number | null> = none<TypeGuardCheck>().pick('nullable');

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<number | null> = none<TypeGuardCheck>().pick('nullable');

                expect(output).toBe(none());
            });
        });

        describe('when the property is optional', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = none<TypeGuardCheck>().pick('optional');

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'None' is not assignable to type 'Some'.
                const output: Some<number> = none<TypeGuardCheck>().pick('optional');

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<number> = none<TypeGuardCheck>().pick('optional');

                expect(output).toBe(none());
            });
        });
    });

    describe('that', () => {
        describe('when the "filter" condition is true', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = none<number>().that(constant(true));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'None' is not assignable to type 'Some'.
                const output: Some<number> = none<number>().that(constant(true));

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<number> = none<number>().that(constant(true));

                expect(output).toBe(none());
            });
        });

        describe('when the "filter" condition is false', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = none<number>().that(constant(false));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'None' is not assignable to type 'Some'.
                const output: Some<number> = none<number>().that(constant(false));

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<number> = none<number>().that(constant(false));

                expect(output).toBe(none());
            });
        });
    });

    describe('which', () => {
        describe('when the "filter" type guard is true', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = none<number>().which(hasPresentProperty('toPrecision'));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'None<ObjectWithPresent<number, "toPrecision">>' is not assignable to type 'Some<number>'.
                const output: Some<number> = none<number>().which(hasPresentProperty('toPrecision'));

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<number> = none<number>().which(hasPresentProperty('toPrecision'));

                expect(output).toBe(none());
            });
        });

        describe('when the "filter" type guard is false', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<ObjectWithPresent<TypeGuardCheck, 'maybe' | 'optional'>> = none<TypeGuardCheck>()
                    .which(hasPresentProperty('maybe', 'optional'));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'None<ObjectWithPresent<TypeGuardCheck<number>, "optional" | "maybe">>'
                //  is not assignable to type 'Some<ObjectWithPresent<TypeGuardCheck<number>, "optional" | "maybe">>'.
                const output: Some<ObjectWithPresent<TypeGuardCheck, 'maybe' | 'optional'>> = none<TypeGuardCheck>()
                    .which(hasPresentProperty('maybe', 'optional'));

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<ObjectWithPresent<TypeGuardCheck, 'optional'>> = none<TypeGuardCheck>()
                    .which(hasPresentProperty('optional'));

                expect(output).toBe(none());
            });
        });
    });

    describe('when', () => {
        describe('when the "filter" condition is true', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = none<number>().when(constant(true));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'None' is not assignable to type 'Some'.
                const output: Some<number> = none<number>().when(constant(true));

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<number> = none<number>().when(constant(true));

                expect(output).toBe(none());
            });
        });

        describe('when the "filter" condition is false', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = none<number>().when(constant(false));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'None' is not assignable to type 'Some'.
                const output: Some<number> = none<number>().when(constant(false));

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<number> = none<number>().when(constant(false));

                expect(output).toBe(none());
            });
        });
    });

    describe('otherwise', () => {
        it('allows to throw an error', () => {
            expect(() => none<number>().otherwise(panic('Value is absent')))
                .toThrow('Value is absent');
        });

        describe('fallback may be present', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number> = none<number>().otherwise(fallbackOptional(2.71));

                expect(output).toStrictEqual(some(2.71));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional<number>' is not assignable to type 'Some<number>'.
                const output: Some<number> = none<number>().otherwise(fallbackOptional(2.71));

                expect(output).toStrictEqual(some(2.71));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional<number>' is not assignable to type 'None<number>'.
                const output: None<number> = none<number>().otherwise(fallbackOptional(2.71));

                expect(output).toStrictEqual(some(2.71));
            });
        });

        describe('when the "fallback" is a present value', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = none<number>().otherwise(2.71);

                expect(output).toStrictEqual(some(2.71));
            });

            it('returns Some with the fallback value', () => {
                const output: Some<number> = none<number>().otherwise(2.71);

                expect(output).toStrictEqual(some(2.71));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Some<number>' is not assignable to type 'None<number>'.
                const output: None<number> = none<number>().otherwise(2.71);

                expect(output).toStrictEqual(some(2.71));
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = none<number>().otherwise(constant(2.71));

                expect(output).toStrictEqual(some(2.71));
            });

            it('returns Some with the fallback value', () => {
                const output: Some<number> = none<number>().otherwise(constant(2.71));

                expect(output).toStrictEqual(some(2.71));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Some' is not assignable to type 'None'.
                const output: None<number> = none<number>().otherwise(constant(2.71));

                expect(output).toStrictEqual(some(2.71));
            });
        });

        describe('when the "fallback" is null', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number | null> = none<number | null>().otherwise(null);

                expect(output).toStrictEqual(some(null));
            });

            it('returns Some (nullable) value', () => {
                const output: Some<number | null> = none<number | null>().otherwise(null);

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to None (nullable) value', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Some<number | null>' is not assignable to type 'None<number | null>'.
                const output: None<number | null> = none<number | null>().otherwise(null);

                expect(output).toStrictEqual(some(null));
            });
        });

        describe('when the "fallback" returns null', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number | null> = none<number | null>().otherwise(constant(null));

                expect(output).toStrictEqual(some(null));
            });

            it('returns Some (nullable) value', () => {
                const output: Some<number | null> = none<number | null>().otherwise(constant(null));

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to None (nullable) value', () => {
                // @ts-expect-error -- TS2322: Type 'Some' is not assignable to type 'None'.
                const output: None<number> = none<number | null>().otherwise(constant(null));

                expect(output).toStrictEqual(some(null));
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = none<number>().otherwise(undefined);

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'None' is not assignable to type 'Some'.
                const output: Some<number> = none<number>().otherwise(undefined);

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<number> = none<number>().otherwise(undefined);

                expect(output).toBe(none());
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = none<number>().otherwise(constant(undefined));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'None' is not assignable to type 'Some'.
                const output: Some<number> = none<number>().otherwise(constant(undefined));

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<number> = none<number>().otherwise(constant(undefined));

                expect(output).toBe(none());
            });
        });
    });

    describe('or', () => {
        it('is a shortcut for Optional.otherwise().value', () => {
            expect(none<number>().or(2.71))
                .toStrictEqual(none<number>().otherwise(2.71).value);
        });

        it('allows to throw an error', () => {
            expect(() => none<number>().or(panic('Value is absent')))
                .toThrow('Value is absent');
        });

        describe('fallback is present', () => {
            it('returns the given fallback value', () => {
                const output: string = none<string>().or('3.14');

                expect(output).toBe('3.14');
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('returns the result of the fallback', () => {
                const output: string = none<string>().or(constant('3.14'));

                expect(output).toBe('3.14');
            });
        });

        describe('when the "fallback" is null', () => {
            it('returns null as a nullable value type', () => {
                const output: string | null = none<string | null>().or(null);

                expect(output).toBeNull();
            });

            it('cannot be assigned to null', () => {
                // @ts-expect-error -- TS2322: Type 'string | null' is not assignable to type 'null'.
                const output: null = none<string | null>().or(null);

                expect(output).toBeNull();
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'string | null' is not assignable to type 'string'.
                const output: string = none<string | null>().or(null);

                expect(output).toBeNull();
            });
        });

        describe('when the "fallback" returns null', () => {
            it('returns null as a nullable value type', () => {
                const output: string | null = none<string | null>().or(constant(null));

                expect(output).toBeNull();
            });

            it('cannot be assigned to null', () => {
                // @ts-expect-error -- TS2322: Type 'string | null' is not assignable to type 'null'.
                const output: null = none<string | null>().or(constant(null));

                expect(output).toBeNull();
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'string | null' is not assignable to type 'string'.
                const output: string = none<string | null>().or(constant(null));

                expect(output).toBeNull();
            });
        });

        describe('fallback may return null', () => {
            it('must be assigned to the fallback return type', () => {
                const output: string | null = none<string | null>().or(constant<string | null>('3.14'));

                expect(output).toBe('3.14');
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'string | null' is not assignable to type 'string'.
                const output: string = none<string | null>().or(constant('3.14'));

                expect(output).toBe('3.14');
            });
        });

        /* eslint-disable @typescript-eslint/no-confusing-void-expression -- testing the method signature */
        describe('when the "fallback" is undefined', () => {
            it('returns undefined', () => {
                const output: undefined = none<string>().or(undefined);

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'undefined' is not assignable to type 'string'.
                const output: string = none<string>().or(undefined);

                expect(output).toBeUndefined();
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('returns undefined', () => {
                const output: undefined = none<string>().or(constant(undefined));

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'undefined' is not assignable to type 'string'.
                const output: string = none<string>().or(constant(undefined));

                expect(output).toBeUndefined();
            });
        });
        /* eslint-enable @typescript-eslint/no-confusing-void-expression */

        describe('fallback may return undefined', () => {
            it('must be assigned to the fallback return type', () => {
                const output: string | undefined = none<string>().or(constant<string | undefined>('3.14'));

                expect(output).toBe('3.14');
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'string | undefined' is not assignable to type 'string'.
                const output: string = none<string>().or(constant<string | undefined>('3.14'));

                expect(output).toBe('3.14');
            });
        });

        describe('fallback may return an absent value', () => {
            it('must be assigned to the fallback return type', () => {
                const output: string | null | undefined = none<string>().or(fallbackOptional<string>('3.14'));

                expect(output).toBe('3.14');
            });

            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'string | undefined' is not assignable to type 'string'.
                const output: string = none<string>().or(fallbackOptional<string>('3.14'));

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
            expect(none<number>().run(assignPi(3.1415))).toBe(none());
            expect(pi).toBe(3.14);
        });

        it('can be assigned to Optional', () => {
            const output: Optional<number> = none<number>().run(assignPi(3.1415));

            expect(output).toBe(none());
        });

        it('cannot be assigned to Some', () => {
            // @ts-expect-error -- TS2322: Type 'None' is not assignable to type 'Some'.
            const output: Some<number> = none<number>().run(assignPi(3.1415));

            expect(output).toBe(none());
        });

        it('returns None', () => {
            const output: None<number> = none<number>().run(assignPi(3.1415));

            expect(output).toBe(none());
        });
    });

    describe('lift', () => {
        it('does not accept functions with strictly-typed input', () => {
            // @ts-expect-error -- TS2345:
            //  Argument of type '{ (value: number): string; (value: string): number | null; }'
            //  is not assignable to
            //  parameter of type '(value: undefined) => number | null | undefined'.
            expect(() => none<string>().lift(decimal))
                .toThrow("Cannot read properties of undefined (reading 'toString')");
        });

        it('must be assigned to Optional', () => {
            const output: Optional<boolean> = none<number>().lift(isUndefined);

            expect(output).toStrictEqual(some(true));
        });

        it('cannot be assigned to Some', () => {
            // @ts-expect-error -- TS2322: Type 'Optional<boolean>' is not assignable to type 'Some<boolean>'.
            const output: Some<boolean> = none<number>().lift(constant(false));

            expect(output).toStrictEqual(some(false));
        });

        it('cannot be assigned to None', () => {
            // @ts-expect-error -- TS2322:
            //  Type 'Optional<number | null>' is not assignable to type 'None<number | null>'.
            const output: None<number | null> = none<number | null>().lift<number | null>(constant(null));

            expect(output).toStrictEqual(some(null));
        });
    });
});
