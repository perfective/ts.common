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
    ObjectWithPresent,
} from '../../object/property/property';
import { safeDecimalOutput, strictDecimalOutput, unsafeDecimalOutput, unsafeNumber } from '../maybe/maybe.mock';
import { TypeGuardCheck, typeGuardCheck } from '../maybe/type-guard-check.mock';

import { None, none, Optional, Some, some } from './optional';
import { Boxed, noneDecimalOutput, optionalDecimalOutput, someDecimalOutput } from './optional.mock';

/* eslint-disable deprecation/deprecation -- TODO: Remove in v0.10.0 */

describe(some, () => {
    it('can be assigned to Optional', () => {
        const output: Optional<number> = some(0);

        expect(output).toStrictEqual(some(0));
    });

    it('cannot be assigned to None', () => {
        // @ts-expect-error -- TS2322: Type 'Some' is not assignable to type 'None'.
        const output: None<number> = some(0);

        expect(output).toStrictEqual(some(0));
    });

    it('throws an error when instantiated with undefined', () => {
        // @ts-expect-error -- TS2345: Argument of type 'undefined' is not assignable to parameter of type 'never'.
        expect(() => some(undefined)).toThrow(new TypeError('The value of `Some` must not be `undefined`'));
    });
});

describe(Some, () => {
    describe('value', () => {
        it('is a required property and can be assigned to the value type', () => {
            const value: number = some(0).value;

            expect(value).toBe(0);
        });
    });

    describe('onto', () => {
        describe('when the "flatMap" function returns Optional', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = some(0).onto(optionalDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional<string>' is not assignable to type 'Some<string>'.
                const output: Some<string> = some(0).onto(optionalDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional<string>' is not assignable to type 'None<string>'.
                const output: None<string> = some(0).onto(optionalDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });
        });

        describe('when the "flatMap" function returns Some', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<string> = some(0).onto(someDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });

            it('returns Some the next value', () => {
                const output: Some<string> = some(0).onto(someDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Some<string>' is not assignable to type 'None<string>'.
                const output: None<string> = some(0).onto(someDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });
        });

        describe('when the "flatMap" function returns None', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<string> = some(0).onto(noneDecimalOutput);

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'None<string>' is not assignable to type 'Some<string>'.
                const output: Some<string> = some(0).onto(noneDecimalOutput);

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<string> = some(0).onto(noneDecimalOutput);

                expect(output).toBe(none());
            });
        });
    });

    describe('to', () => {
        describe('when the "map" function may return a present or absent value', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string | null> = some(0).to(unsafeDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<string | null> = some(0).to(unsafeDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<string | null> = some(0).to(unsafeDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });
        });

        describe('when the "map" function returns a present value', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<string> = some(0).to(safeDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });

            it('returns Some the next value', () => {
                const output: Some<string> = some(0).to(safeDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Some' is not assignable to type 'None'.
                const output: None<string> = some(0).to(safeDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });
        });

        describe('when the "map" function returns null', () => {
            it('can be assigned to Optional (nullable) value', () => {
                const output: Optional<string | null> = some(0).to<string | null>(constant(null));

                expect(output).toStrictEqual(some(null));
            });

            it('returns Some (nullable) value', () => {
                const output: Some<string | null> = some(0).to<string | null>(constant(null));

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to None (nullable) value', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Some<string | null>' is not assignable to type 'None<string | null>'.
                const output: None<string | null> = some(0).to<string | null>(constant(null));

                expect(output).toStrictEqual(some(null));
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<string> = some(0).to<string>(constant(undefined));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'None' is not assignable to type 'Some'.
                const output: Some<string> = some(0).to<string>(constant(undefined));

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<string> = some(0).to<string>(constant(undefined));

                expect(output).toBe(none());
            });
        });
    });

    describe('pick', () => {
        it('is an equivalent of the then() chain', () => {
            const input: Some<Boxed<TypeGuardCheck>> = some({ value: typeGuardCheck } as Boxed<TypeGuardCheck>);

            expect(input.pick('value').pick('required'))
                .toStrictEqual(input.to(i => i.value).to(i => i.required));
        });

        describe('when the property is required', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = some(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(some(3.14));
            });

            it('returns Some the value of the property', () => {
                const output: Some<number> = some(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Some' is not assignable to type 'None'.
                const output: None<number> = some(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the property can be absent', () => {
            it('returns Optional the value of the property', () => {
                const output: Optional<number> = some(typeGuardCheck).pick('option');

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional<number>' is not assignable to type 'Some<number>'.
                const output: Some<number> = some(typeGuardCheck).pick('option');

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional<number>' is not assignable to type 'None<number>'.
                const output: None<number> = some(typeGuardCheck).pick('option');

                expect(output).toBe(none());
            });
        });
    });

    describe('that', () => {
        describe('when the "filter" condition is true', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number> = some(0).that(isLessThan(2.71));

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = some(0).that(isLessThan(2.71));

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = some(0).that(isLessThan(2.71));

                expect(output).toStrictEqual(some(0));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number> = some(0).that(isGreaterThan(2.71));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = some(0).that(isGreaterThan(2.71));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = some(0).that(isGreaterThan(2.71));

                expect(output).toBe(none());
            });
        });
    });

    describe('which', () => {
        const input: Some<TypeGuardCheck> = some(typeGuardCheck);

        it('combines checked properties', () => {
            const intermediate: Optional<ObjectWithPresent<TypeGuardCheck, 'optional'>> = input
                .which(hasPresentProperty('optional'));
            const output: Optional<ObjectWithPresent<TypeGuardCheck, 'optional' | 'nullable'>> = intermediate
                .which(hasNotNullProperty('nullable'));

            expect(
                output.to(v => `${decimal(v.optional)}:${decimal(v.nullable)}`),
            ).toStrictEqual(
                input
                    .which(hasPresentProperty('optional', 'nullable'))
                    .to(v => `${decimal(v.optional)}:${decimal(v.nullable)}`),
            );
        });

        describe('when the "filter" type guard is true', () => {
            it('returns Some', () => {
                /* eslint-disable jest/max-expects -- check all test properties */
                expect(input.which(hasDefinedProperty('required'))).toStrictEqual(input);
                expect(input.which(hasUndefinedProperty('optional'))).toStrictEqual(input);
                expect(input.which(hasNotNullProperty('nullable'))).toStrictEqual(input);
                expect(input.which(hasNullProperty('possible'))).toStrictEqual(input);
                expect(input.which(hasPresentProperty('maybe'))).toStrictEqual(input);
                expect(input.which(hasAbsentProperty('option'))).toStrictEqual(input);
                /* eslint-enable jest/max-expects */
            });

            it('must be assigned to Optional', () => {
                const output: Optional<ObjectWithPresent<TypeGuardCheck, 'maybe'>> = input
                    .which(hasPresentProperty('maybe'));

                expect(output).toStrictEqual(input);
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Optional<ObjectWithPresent<TypeGuardCheck<number>, "required">>'
                //  is not assignable to type 'Some<TypeGuardCheck<number>>'.
                const output: Some<TypeGuardCheck> = input.which(hasPresentProperty('required'));

                expect(output).toStrictEqual(input);
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Optional<ObjectWithPresent<TypeGuardCheck<number>, "nullable">>'
                //  is not assignable to type 'None<ObjectWithPresent<TypeGuardCheck<number>, "nullable">>'.
                const output: None<ObjectWithPresent<TypeGuardCheck, 'nullable'>> = input
                    .which(hasPresentProperty('nullable'));

                expect(output).toStrictEqual(input);
            });
        });

        describe('when the "filter" type guard is false', () => {
            it('returns None', () => {
                /* eslint-disable jest/max-expects -- check all test properties */
                expect(input.which(hasUndefinedProperty('required'))).toBe(none());
                expect(input.which(hasDefinedProperty('optional'))).toBe(none());
                expect(input.which(hasNullProperty('nullable'))).toBe(none());
                expect(input.which(hasNotNullProperty('possible'))).toBe(none());
                expect(input.which(hasAbsentProperty('maybe'))).toBe(none());
                expect(input.which(hasPresentProperty('option'))).toBe(none());
                /* eslint-enable jest/max-expects */
            });

            it('must be assigned to Optional', () => {
                const output: Optional<ObjectWithPresent<TypeGuardCheck, 'maybe' | 'optional'>> = input
                    .which(hasPresentProperty('maybe', 'optional'));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Optional<ObjectWithPresent<TypeGuardCheck<number>, "option">>'
                //  is not assignable to type 'Some<ObjectWithPresent<TypeGuardCheck<number>, "option">>'.
                const output: Some<ObjectWithPresent<TypeGuardCheck, 'option'>> = input
                    .which(hasPresentProperty('option'));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Optional<ObjectWithPresent<TypeGuardCheck<number>, "possible">>'
                //  is not assignable to type 'None<ObjectWithPresent<TypeGuardCheck<number>, "possible">>.
                const output: None<ObjectWithPresent<TypeGuardCheck, 'possible'>> = input
                    .which(hasPresentProperty('possible'));

                expect(output).toBe(none());
            });
        });
    });

    describe('when', () => {
        describe('when the "filter" condition is true', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number> = some(0).when(constant(true));

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = some(0).when(constant(true));

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = some(0).when(constant(true));

                expect(output).toStrictEqual(some(0));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number> = some(0).when(constant(false));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = some(0).when(constant(false));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = some(0).when(constant(false));

                expect(output).toBe(none());
            });
        });
    });

    describe('otherwise', () => {
        describe('fallback may be present', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number | null> = some<number | null>(0).otherwise(unsafeNumber(1));

                expect(output).toStrictEqual(some(0));
            });

            it('returns Some', () => {
                const output: Some<number | null> = some<number | null>(0).otherwise(unsafeNumber(1));

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Some' is not assignable to type 'None'.
                const output: None<number | null> = some<number | null>(0).otherwise(unsafeNumber(1));

                expect(output).toStrictEqual(some(0));
            });
        });

        describe('fallback is present', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number | null> = some<number | null>(0).otherwise(1);

                expect(output).toStrictEqual(some(0));
            });

            it('returns Some', () => {
                const output: Some<number | null> = some<number | null>(0).otherwise(1);

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Some' is not assignable to type 'None'.
                const output: None<number | null> = some<number | null>(0).otherwise(1);

                expect(output).toStrictEqual(some(0));
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = some(0).otherwise(constant(1));

                expect(output).toStrictEqual(some(0));
            });

            it('returns Some', () => {
                const output: Some<number> = some(0).otherwise(constant(1));

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Some' is not assignable to type 'None'.
                const output: None<number> = some(0).otherwise(constant(1));

                expect(output).toStrictEqual(some(0));
            });
        });

        describe('when the "fallback" is null', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number | null> = some<number | null>(0).otherwise(null);

                expect(output).toStrictEqual(some(0));
            });

            it('returns Some null', () => {
                const output: Some<number | null> = some<number | null>(0).otherwise(null);

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Some<number | null>' is not assignable to type 'None<number | null>'.
                const output: None<number | null> = some<number | null>(0).otherwise(null);

                expect(output).toStrictEqual(some(0));
            });
        });

        describe('when the "fallback" returns null', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number | null> = some<number | null>(0).otherwise(constant(null));

                expect(output).toStrictEqual(some(0));
            });

            it('returns Some', () => {
                const output: Some<number | null> = some<number | null>(0).otherwise(constant(null));

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Some' is not assignable to type 'None'.
                const output: None<number | null> = some<number | null>(0).otherwise(constant(null));

                expect(output).toStrictEqual(some(0));
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = some(0).otherwise(undefined);

                expect(output).toStrictEqual(some(0));
            });

            it('returns Some', () => {
                const output: Some<number> = some(0).otherwise(undefined);

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Some' is not assignable to type 'None'.
                const output: None<number> = some(0).otherwise(undefined);

                expect(output).toStrictEqual(some(0));
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = some(0).otherwise(constant(undefined));

                expect(output).toStrictEqual(some(0));
            });

            it('returns Some', () => {
                const output: Some<number> = some(0).otherwise(constant(undefined));

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Some' is not assignable to type 'None'.
                const output: None<number> = some(0).otherwise(constant(undefined));

                expect(output).toStrictEqual(some(0));
            });
        });

        it('does not throw an error', () => {
            expect(() => some(0).otherwise(panic('Value is absent')))
                .not.toThrow('Value is absent');
        });
    });

    describe('or', () => {
        it('is a shortcut of Optional.otherwise().value', () => {
            expect(some(0).or(1))
                .toStrictEqual(some(0).otherwise(1).value);
            expect(some(0).or(constant(1)))
                .toStrictEqual(some(0).otherwise(constant(1)).value);
        });

        it('does not throw an error', () => {
            expect(() => some(0).or(panic('Value is not present')))
                .not.toThrow('Value is not present');
        });

        describe('fallback is present', () => {
            it('returns the original value', () => {
                const output: number = some(0).or(1);

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('returns the original value', () => {
                const output: number = some(0).or(constant(1));

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" is null', () => {
            it('returns the original value', () => {
                const output: number | null = some<number | null>(0).or(null);

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" returns null', () => {
            it('returns the original value', () => {
                const output: number | null = some<number | null>(0).or(constant(null));

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('returns the original value', () => {
                const output: number = some(0).or(undefined);

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('returns the original value', () => {
                const output: number = some(0).or(constant(undefined));

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

        it('runs the given procedure and keeps original value', () => {
            expect(value).toBe(0);
            expect(some(0).run(assignValue(1))).toStrictEqual(some(0));
            expect(value).toBe(1);
        });

        it('can be assigned to Optional', () => {
            const output: Optional<number> = some(0).run(assignValue(1));

            expect(output).toStrictEqual(some(0));
        });

        it('returns Some', () => {
            const output: Some<number> = some(0).run(assignValue(1));

            expect(output).toStrictEqual(some(0));
        });

        it('cannot be assigned to None', () => {
            // @ts-expect-error -- TS2322: Type 'Some' is not assignable to type 'None'.
            const output: None<number> = some(0).run(assignValue(1));

            expect(output).toStrictEqual(some(0));
        });
    });

    describe('lift', () => {
        it('accepts functions with strictly-typed input', () => {
            expect(some(0).lift(strictDecimalOutput))
                .toStrictEqual(some('0'));
        });

        it('must be assigned to Optional', () => {
            const output: Optional<string | null> = some(0).lift(unsafeDecimalOutput);

            expect(output).toStrictEqual(some('0'));
        });

        it('cannot be assigned to Some', () => {
            // @ts-expect-error -- TS2322:
            //  Type 'Optional<string | null>' is not assignable to type 'Some<string | null>'.
            const output: Some<string | null> = some(0).lift(unsafeDecimalOutput);

            expect(output).toStrictEqual(some('0'));
        });

        it('cannot be assigned to None', () => {
            // @ts-expect-error -- TS2322:
            //  Type 'Optional<string | null>' is not assignable to type 'None<string | null>'.
            const output: None<string | null> = some(0).lift(unsafeDecimalOutput);

            expect(output).toStrictEqual(some('0'));
        });
    });
});

/* eslint-enable deprecation/deprecation */
