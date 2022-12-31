import { panic } from '../../error/panic/panic';
import { constant, Nullary } from '../../function/function/nullary';
import { decimal } from '../../number/number/base';
import { isGreaterThan, isLessThan } from '../../number/number/order';
import {
    hasAbsentProperty,
    hasDefinedProperty,
    hasNotNullProperty,
    hasNullProperty,
    hasPresentProperty,
    hasUndefinedProperty,
    ObjectWithNotNull,
    ObjectWithPresent,
} from '../../object/property/property';
import { isPresent } from '../../value/value';
import { TypeGuardCheck, typeGuardCheck } from '../maybe/type-guard-check.mock';

import { Nil, nil, Nullable, nullable, Solum, solum } from './nullable';
import { Boxed, fallbackNullable } from './nullable.mock';

describe(solum, () => {
    it('can be assigned to Nullable', () => {
        const output: Nullable<number> = solum(0);

        expect(output).toStrictEqual(solum(0));
    });

    it('cannot be assigned to Nil', () => {
        // @ts-expect-error -- TS2322: Type 'Solum' is not assignable to type 'Nil'.
        const output: Nil<number> = solum(0);

        expect(output).toStrictEqual(solum(0));
    });

    it('throws an error if instantiated with null', () => {
        // @ts-expect-error -- TS2345: Argument of type 'null' is not assignable to parameter of type 'never'.
        expect(() => solum(null)).toThrow('Solum value must be not null');
    });
});

describe(Solum, () => {
    describe('value', () => {
        it('is a required property and can be assigned to the value type', () => {
            const value: number = solum<number>(3.14).value;

            expect(value).toBe(3.14);
        });
    });

    describe('onto', () => {
        describe('when the "flatMap" function returns Nullable', () => {
            it('returns Nullable the next value', () => {
                const output: Nullable<string> = solum(3.14).onto(constant(nullable('3.14')));

                expect(output).toStrictEqual(solum('3.14'));
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable<string>' is not assignable to type 'Solum<string>'.
                const output: Solum<string> = solum(3.14).onto(constant(nullable('3.14')));

                expect(output).toStrictEqual(solum('3.14'));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable<string>' is not assignable to type 'Nil<string>'.
                const output: Nil<string> = solum(3.14).onto(constant(nullable('3.14')));

                expect(output).toStrictEqual(solum('3.14'));
            });
        });

        describe('when the "flatMap" function returns Solum', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<string> = solum(3.14).onto(constant(solum('3.14')));

                expect(output).toStrictEqual(solum('3.14'));
            });

            it('returns Solum the next value', () => {
                const output: Solum<string> = solum(3.14).onto(constant(solum('3.14')));

                expect(output).toStrictEqual(solum('3.14'));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Solum<string>' is not assignable to type 'Nil<string>'.
                const output: Nil<string> = solum(3.14).onto(constant(solum('3.14')));

                expect(output).toStrictEqual(solum('3.14'));
            });
        });

        describe('when the "flatMap" function returns Nil', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<string> = solum(3.14).onto(constant(nil<string>()));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nil<string>' is not assignable to type 'Solum<string>'.
                const output: Solum<string> = solum(3.14).onto(constant(nil<string>()));

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<string> = solum(3.14).onto(constant(nil<string>()));

                expect(output).toBe(nil());
            });
        });
    });

    describe('to', () => {
        describe('when the "map" function may return a present or absent value', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<string> = solum(3.14).to(constant(fallbackNullable('3.14')));

                expect(output).toStrictEqual(solum('3.14'));
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Solum'.
                const output: Solum<string> = solum(3.14).to(constant(fallbackNullable('3.14')));

                expect(output).toStrictEqual(solum('3.14'));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<string> = solum(3.14).to(constant(fallbackNullable('3.14')));

                expect(output).toStrictEqual(solum('3.14'));
            });
        });

        describe('when the "map" function returns a present value', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<string> = solum(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(solum('3.14'));
            });

            it('returns Solum the next value', () => {
                const output: Solum<string> = solum(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(solum('3.14'));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Solum' is not assignable to type 'Nil'.
                const output: Nil<string> = solum(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(solum('3.14'));
            });
        });

        describe('when the "map" function returns null', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<string> = solum(3.14).to<string>(constant(null));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nil' is not assignable to type 'Solum'.
                const output: Solum<string> = solum(3.14).to<string>(constant(null));

                expect(output).toBe(nil());
            });

            it('returns Nil', () => {
                const output: Nil<string> = solum(3.14).to<string>(constant(null));

                expect(output).toBe(nil());
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<string | undefined> = solum(3.14).to<string | undefined>(constant(undefined));

                expect(output).toStrictEqual(solum(undefined));
            });

            it('returns Solum undefined', () => {
                const output: Solum<string | undefined> = solum(3.14).to<string | undefined>(constant(undefined));

                expect(output).toStrictEqual(solum(undefined));
            });

            it('cannot be assigned to Nil of optional value', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Solum<string | undefined>' is not assignable to type 'Nil<string | undefined>'.
                const output: Nil<string | undefined> = solum(3.14).to<string | undefined>(constant(undefined));

                expect(output).toStrictEqual(solum(undefined));
            });
        });
    });

    describe('pick', () => {
        it('is an equivalent of the then() chain', () => {
            const input: Solum<Boxed<TypeGuardCheck>> = solum({ value: typeGuardCheck } as Boxed<TypeGuardCheck>);

            expect(input.pick('value').pick('required'))
                .toStrictEqual(input.to(i => i.value).to(i => i.required));
        });

        describe('when the property is required', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = solum(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(solum(3.14));
            });

            it('returns Solum the value of the property', () => {
                const output: Solum<number> = solum(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Solum' is not assignable to type 'Nil'.
                const output: Nil<number> = solum(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(solum(3.14));
            });
        });

        describe('when the property can be absent', () => {
            it('returns Nullable the value of the property', () => {
                const output: Nullable<number | undefined> = solum(typeGuardCheck).pick('possible');

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<number | undefined>' is not assignable to type 'Solum<number>'.
                const output: Solum<number> = solum(typeGuardCheck).pick('possible');

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<number | undefined>' is not assignable to type 'Nil<number>'.
                const output: Nil<number> = solum(typeGuardCheck).pick('possible');

                expect(output).toBe(nil());
            });
        });
    });

    describe('that', () => {
        describe('when the "filter" condition is true', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number> = solum(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable<number>' is not assignable to type 'Solum<number>'.
                const output: Solum<number> = solum(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable<number>' is not assignable to type 'Nil<number>'.
                const output: Nil<number> = solum(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(solum(3.14));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number> = solum(3.14).that(isLessThan(2.71));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Solum'.
                const output: Solum<number> = solum(3.14).that(isLessThan(2.71));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number> = solum(3.14).that(isLessThan(2.71));

                expect(output).toBe(nil());
            });
        });
    });

    describe('which', () => {
        const input: Solum<TypeGuardCheck> = solum(typeGuardCheck);

        it('combines checked properties', () => {
            const intermediate: Nullable<ObjectWithPresent<TypeGuardCheck, 'maybe'>> = input
                .which(hasPresentProperty('maybe'));
            const output: Nullable<ObjectWithPresent<TypeGuardCheck, 'maybe'>
            & ObjectWithNotNull<TypeGuardCheck, 'nullable'>> = intermediate.which(hasNotNullProperty('nullable'));

            expect(output.to(v => `${decimal(v.nullable)}:${decimal(v.maybe)}`)).toStrictEqual(input
                .which(hasPresentProperty('nullable', 'maybe'))
                .to(v => `${decimal(v.nullable)}:${decimal(v.maybe)}`));
        });

        describe('when the "filter" type guard is true', () => {
            it('returns Solum', () => {
                /* eslint-disable jest/max-expects -- check all test properties */
                expect(input.which(hasDefinedProperty('required'))).toStrictEqual(input);
                expect(input.which(hasUndefinedProperty('optional'))).toStrictEqual(input);
                expect(input.which(hasNotNullProperty('nullable'))).toStrictEqual(input);
                expect(input.which(hasNullProperty('possible'))).toStrictEqual(input);
                expect(input.which(hasPresentProperty('nullable'))).toStrictEqual(input);
                expect(input.which(hasAbsentProperty('option'))).toStrictEqual(input);
                /* eslint-enable jest/max-expects */
            });

            it('must be assigned to Nullable', () => {
                const output: Nullable<ObjectWithPresent<TypeGuardCheck, 'nullable'>> = input
                    .which(hasPresentProperty('nullable'));

                expect(output).toStrictEqual(input);
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<ObjectWithPresent<TypeGuardCheck<number>, "required">>'
                //  is not assignable to type 'Solum<TypeGuardCheck<number>>'.
                const output: Solum<TypeGuardCheck> = input.which(hasPresentProperty('required'));

                expect(output).toStrictEqual(input);
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<ObjectWithPresent<TypeGuardCheck<number>, "nullable">>'
                //  is not assignable to type 'Nil<ObjectWithPresent<TypeGuardCheck<number>, "nullable">>'.
                const output: Nil<ObjectWithPresent<TypeGuardCheck, 'nullable'>> = input
                    .which(hasPresentProperty('nullable'));

                expect(output).toStrictEqual(input);
            });
        });

        describe('when the "filter" type guard is false', () => {
            it('returns Nil', () => {
                /* eslint-disable jest/max-expects -- check all test properties */
                expect(input.which(hasUndefinedProperty('required'))).toBe(nil());
                expect(input.which(hasDefinedProperty('optional'))).toBe(nil());
                expect(input.which(hasNullProperty('nullable'))).toBe(nil());
                expect(input.which(hasNotNullProperty('possible'))).toBe(nil());
                expect(input.which(hasAbsentProperty('nullable'))).toBe(nil());
                expect(input.which(hasPresentProperty('option'))).toBe(nil());
                /* eslint-enable jest/max-expects */
            });

            it('must be assigned to Nullable', () => {
                const output: Nullable<ObjectWithPresent<TypeGuardCheck, 'nullable' | 'optional'>> = input
                    .which(hasPresentProperty('nullable', 'optional'));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<ObjectWithPresent<TypeGuardCheck<number>, "option">>'
                //  is not assignable to type 'Solum<ObjectWithPresent<TypeGuardCheck<number>, "option">>'.
                const output: Solum<ObjectWithPresent<TypeGuardCheck, 'option'>> = input
                    .which(hasPresentProperty('option'));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<ObjectWithPresent<TypeGuardCheck<number>, "possible">>'
                //  is not assignable to type 'Nil<ObjectWithPresent<TypeGuardCheck<number>, "possible">>'.
                const output: Nil<ObjectWithPresent<TypeGuardCheck, 'possible'>> = input
                    .which(hasPresentProperty('possible'));

                expect(output).toBe(nil());
            });
        });
    });

    describe('when', () => {
        describe('when the "filter" condition is true', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number> = solum(3.14).when(constant(true));

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Solum'.
                const output: Solum<number> = solum(3.14).when(constant(true));

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number> = solum(3.14).when(constant(true));

                expect(output).toStrictEqual(solum(3.14));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number> = solum(3.14).when(constant(false));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Solum'.
                const output: Solum<number> = solum(3.14).when(constant(false));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number> = solum(3.14).when(constant(false));

                expect(output).toBe(nil());
            });
        });
    });

    describe('otherwise', () => {
        describe('fallback may be present', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = solum(3.14).otherwise(fallbackNullable(2.71));

                expect(output).toStrictEqual(solum(3.14));
            });

            it('returns Solum', () => {
                const output: Solum<number> = solum(3.14).otherwise(fallbackNullable(2.71));

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Solum' is not assignable to type 'Nil'.
                const output: Nil<number> = solum(3.14).otherwise(fallbackNullable(2.71));

                expect(output).toStrictEqual(solum(3.14));
            });
        });

        describe('fallback is present', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = solum(3.14).otherwise(2.71);

                expect(output).toStrictEqual(solum(3.14));
            });

            it('returns Solum', () => {
                const output: Solum<number> = solum(3.14).otherwise(2.71);

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Solum' is not assignable to type 'Nil'.
                const output: Nil<number> = solum(3.14).otherwise(2.71);

                expect(output).toStrictEqual(solum(3.14));
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = solum(3.14).otherwise(constant(2.71));

                expect(output).toStrictEqual(solum(3.14));
            });

            it('returns Solum', () => {
                const output: Solum<number> = solum(3.14).otherwise(constant(2.71));

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Solum' is not assignable to type 'Nil'.
                const output: Nil<number> = solum(3.14).otherwise(constant(2.71));

                expect(output).toStrictEqual(solum(3.14));
            });
        });

        describe('when the "fallback" is null', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = solum(3.14).otherwise(null);

                expect(output).toStrictEqual(solum(3.14));
            });

            it('returns Solum', () => {
                const output: Solum<number> = solum(3.14).otherwise(null);

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Solum' is not assignable to type 'Nil'.
                const output: Nil<number> = solum(3.14).otherwise(null);

                expect(output).toStrictEqual(solum(3.14));
            });
        });

        describe('when the "fallback" returns null', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number> = solum(3.14).otherwise(constant(null));

                expect(output).toStrictEqual(solum(3.14));
            });

            it('returns Solum', () => {
                const output: Solum<number> = solum(3.14).otherwise(constant(null));

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Solum' is not assignable to type 'Nil'.
                const output: Nil<number> = solum(3.14).otherwise(constant(null));

                expect(output).toStrictEqual(solum(3.14));
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = solum<number | undefined>(3.14).otherwise(undefined);

                expect(output).toStrictEqual(solum(3.14));
            });

            it('returns Solum', () => {
                const output: Solum<number | undefined> = solum<number | undefined>(3.14).otherwise(undefined);

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Solum<number | undefined>' is not assignable to type 'Nil<number | undefined>'.
                const output: Nil<number | undefined> = solum<number | undefined>(3.14)
                    .otherwise(undefined);

                expect(output).toStrictEqual(solum(3.14));
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('returns Solum', () => {
                const output: Solum<number | undefined> = solum<number | undefined>(3.14)
                    .otherwise(constant(undefined));

                expect(output).toStrictEqual(solum(3.14));
            });

            it('can be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = solum<number | undefined>(3.14)
                    .otherwise(constant(undefined));

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error: TS2322:
                //  Type 'Solum<number | undefined>' is not assignable to type 'Nil<number | undefined>'.
                const output: Nil<number | undefined> = solum<number | undefined>(3.14)
                    .otherwise(constant(undefined));

                expect(output).toStrictEqual(solum(3.14));
            });
        });

        it('does not throw an error', () => {
            expect(() => solum(3.14).otherwise(panic('Value is absent')))
                .not.toThrow('Value is absent');
        });
    });

    describe('or', () => {
        it('is a shortcut of Nullable.otherwise().value', () => {
            expect(solum(3.14).or(2.71))
                .toStrictEqual(solum(3.14).otherwise(2.71).value);
            expect(solum(3.14).or(constant(2.71)))
                .toStrictEqual(solum(3.14).otherwise(constant(2.71)).value);
        });

        it('does not throw an error', () => {
            expect(() => solum(3.14).or(panic('Value is not present')))
                .not.toThrow('Value is not present');
        });

        describe('fallback is present', () => {
            it('returns the original value', () => {
                const output: string = solum('3.14').or('2.71');

                expect(output).toBe('3.14');
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('returns the original value', () => {
                const output: string = solum('3.14').or(constant('2.71'));

                expect(output).toBe('3.14');
            });
        });

        describe('when the "fallback" is null', () => {
            it('returns the original value', () => {
                const output: string = solum('3.14').or(null);

                expect(output).toBe('3.14');
            });
        });

        describe('when the "fallback" returns null', () => {
            it('returns the original value', () => {
                const output: string = solum('3.14').or(constant(null));

                expect(output).toBe('3.14');
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('returns the original value', () => {
                const output: string | undefined = solum<string | undefined>('3.14').or(undefined);

                expect(output).toBe('3.14');
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('returns the original value', () => {
                const output: string | undefined = solum<string | undefined>('3.14').or(constant(undefined));

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

        it('runs the given procedure and keeps original value', () => {
            expect(pi).toBe(3.14);
            expect(solum(pi).run(assignPi(3.1415))).toStrictEqual(solum(3.14));
            expect(pi).toBe(3.1415);
        });

        it('can be assigned to Nullable', () => {
            const output: Nullable<number> = solum(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(solum(3.14));
        });

        it('returns Solum', () => {
            const output: Solum<number> = solum(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(solum(3.14));
        });

        it('cannot be assigned to Nil', () => {
            // @ts-expect-error -- TS2322: Type 'Solum' is not assignable to type 'Nil'.
            const output: Nil<number> = solum(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(solum(3.14));
        });
    });

    describe('lift', () => {
        it('accepts functions with strictly-typed input', () => {
            expect(solum('3.14').lift(decimal))
                .toStrictEqual(solum(3.14));
        });

        it('must be assigned to Nullable', () => {
            const output: Nullable<boolean> = solum(3.14).lift(isPresent);

            expect(output).toStrictEqual(solum(true));
        });

        it('cannot be assigned to Solum', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable<number>' is not assignable to type 'Solum<number>'.
            const output: Solum<number> = solum(3.14).lift(constant(2.71));

            expect(output).toStrictEqual(solum(2.71));
        });

        it('cannot be assigned to Nil', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable<boolean>' is not assignable to type 'Nil<boolean>'.
            const output: Nil<boolean> = solum(3.14).lift<boolean>(constant(null));

            expect(output).toBe(nil());
        });
    });
});
