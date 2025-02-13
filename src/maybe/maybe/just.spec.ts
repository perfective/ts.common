import { beforeEach, describe, expect, it } from '@jest/globals';

import { panic } from '../../error/panic/panic';
import { constant, Void } from '../../function/function/nullary';
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
import { isPresent } from '../../value/value';

import { isJust, isNotJust, Just, just, justFrom, Maybe, nil, Nothing, nothing } from './maybe';
import {
    Boxed,
    justDecimalOutput,
    maybeDecimalOutput,
    nilDecimalOutput,
    nothingDecimalOutput,
    strictDecimalOutput,
    unsafe,
    unsafeDecimalOutput,
} from './maybe.mock';
import { TypeGuardCheck, typeGuardCheck } from './type-guard-check.mock';

describe(just, () => {
    it('can be assigned to Maybe<T>', () => {
        const output: Maybe<number> = just(0);

        expect(output).toStrictEqual(just(0));
    });

    it('cannot be assigned to Nothing<T>', () => {
        // @ts-expect-error -- TS2322: Type 'Just<number>' is not assignable to type 'Nothing<number>'.
        const output: Nothing<number> = just(0);

        expect(output).toStrictEqual(just(0));
    });

    it('throws an error if instantiated with null', () => {
        // @ts-expect-error -- TS2345: Argument of type 'null' is not assignable to parameter of type 'never'.
        expect(() => just(null)).toThrow(new TypeError('The value of `Just` must not be `null`'));
    });

    it('throws an error if instantiated with undefined', () => {
        // @ts-expect-error -- TS2345: Argument of type 'undefined' is not assignable to parameter of type 'never'.
        expect(() => just(undefined)).toThrow(new TypeError('The value of `Just` must not be `undefined`'));
    });
});

describe(justFrom, () => {
    it('creates a function to pass a `value` into a given `map` callback and return the result as a `Just`', () => {
        const justIsPresent = justFrom(isPresent);
        const output: Just<boolean> = justIsPresent(null);

        expect(output).toStrictEqual(just(false));
    });
});

describe(isJust, () => {
    describe('when given a `Just`', () => {
        it('returns true', () => {
            expect(isJust(just(0))).toBe(true);
        });
    });

    describe('when given a `Nothing`', () => {
        it('returns false', () => {
            expect(isJust(nothing())).toBe(false);
            expect(isJust(nil())).toBe(false);
        });
    });

    describe('when given not a `Maybe`', () => {
        it('returns false', () => {
            expect(isJust(0)).toBe(false);
            expect(isJust(null)).toBe(false);
            expect(isJust(undefined)).toBe(false);
        });
    });
});

describe(isNotJust, () => {
    describe('when given a `Just`', () => {
        it('returns false', () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard testing
            expect(isNotJust(just(0))).toBe(false);
        });
    });

    describe('when given a `Nothing`', () => {
        it('returns true', () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard testing
            expect(isNotJust(nothing())).toBe(true);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard testing
            expect(isNotJust(nil())).toBe(true);
        });
    });

    describe('when given not a `Maybe`', () => {
        it('returns true', () => {
            expect(isNotJust(0)).toBe(true);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard testing
            expect(isNotJust(null)).toBe(true);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard testing
            expect(isNotJust(undefined)).toBe(true);
        });
    });
});

describe(Just, () => {
    describe('value', () => {
        it('is a required property and can be assigned to the value type', () => {
            const value: number = just(0).value;

            expect(value).toBe(0);
        });
    });

    describe('onto', () => {
        describe('when the "flatMap" function returns Maybe', () => {
            it('returns the next value as Maybe', () => {
                const output: Maybe<string> = just(0).onto(maybeDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe<string>' is not assignable to type 'Just<string>'.
                const output: Just<string> = just(0).onto(maybeDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe<string>' is not assignable to type 'Nothing<string>'.
                const output: Nothing<string> = just(0).onto(maybeDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });
        });

        describe('when the "flatMap" function returns Just', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = just(0).onto(justDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });

            it('returns the next value as Just', () => {
                const output: Just<string> = just(0).onto(justDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just<string>' is not assignable to type 'Nothing<string>'.
                const output: Nothing<string> = just(0).onto(justDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });
        });

        describe('when the "flatMap" function returns Nothing(null)', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = just(0).onto(nilDecimalOutput);

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing<string>' is not assignable to type 'Just<string>'.
                const output: Just<string> = just(0).onto(nilDecimalOutput);

                expect(output).toBe(nil());
            });

            it('returns nil as Nothing', () => {
                const output: Nothing<string> = just(0).onto(nilDecimalOutput);

                expect(output).toBe(nil());
            });
        });

        describe('when the "flatMap" function returns Nothing(undefined)', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = just(0).onto(nothingDecimalOutput);

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<string> = just(0).onto(nothingDecimalOutput);

                expect(output).toBe(nothing());
            });

            it('returns nothing as Nothing', () => {
                const output: Nothing<string> = just(0).onto(nothingDecimalOutput);

                expect(output).toBe(nothing());
            });
        });
    });

    describe('to', () => {
        describe('when the "map" function may return a present or absent value', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<string> = just(0).to(unsafeDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<string> = just(0).to(unsafeDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<string> = just(0).to(unsafeDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });
        });

        describe('when the "map" function returns a present value', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = just(0).to(strictDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });

            it('returns the next value as Just', () => {
                const output: Just<string> = just(0).to(strictDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just' is not assignable to type 'Nothing'.
                const output: Nothing<string> = just(0).to(strictDecimalOutput);

                expect(output).toStrictEqual(just('0'));
            });
        });

        describe('when the "map" function returns null', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = just(0).to<string>(constant(null));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<string> = just(0).to<string>(constant(null));

                expect(output).toBe(nil());
            });

            it('returns nil as Nothing', () => {
                const output: Nothing<string> = just(0).to<string>(constant(null));

                expect(output).toBe(nil());
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = just(0).to<string>(constant(undefined));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Nothing' is not assignable to type 'Just'.
                const output: Just<string> = just(0).to<string>(constant(undefined));

                expect(output).toBe(nothing());
            });

            it('returns nothing as Nothing', () => {
                const output: Nothing<string> = just(0).to<string>(constant(undefined));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('into', () => {
        it('accepts a `reduce` function with a non-nullable and non-optional value argument', () => {
            const output: string = just(0).into(strictDecimalOutput);

            expect(output).toBe('0');
        });

        it('returns the result of the given `reduce` callback applied to the value of Just', () => {
            expect(just(0).into(strictDecimalOutput)).toBe('0');
        });

        it('can be used to return Maybe', () => {
            const output: Just<string> = just(0).into(justDecimalOutput);

            expect(output).toStrictEqual(just('0'));
        });
    });

    describe('pick', () => {
        it('is a shortcut of the Just.to()', () => {
            const input: Just<Boxed<TypeGuardCheck>> = just({ value: typeGuardCheck } as Boxed<TypeGuardCheck>);

            expect(input.pick('value').pick('required'))
                .toStrictEqual(input.to(i => i.value).to(i => i.required));
        });

        describe('when the property is required', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = just(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(just(3.14));
            });

            it('returns the value of the property as Just', () => {
                const output: Just<number> = just(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just' is not assignable to type 'Nothing'.
                const output: Nothing<number> = just(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(just(3.14));
            });
        });

        describe('when the property can be absent', () => {
            it('returns Maybe the value of the property', () => {
                const output: Maybe<number> = just(typeGuardCheck).pick('possible');

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe<number>' is not assignable to type 'Just<number>'.
                const output: Just<number> = just(typeGuardCheck).pick('possible');

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe<number>' is not assignable to type 'Nothing<number>'.
                const output: Nothing<number> = just(typeGuardCheck).pick('possible');

                expect(output).toBe(nil());
            });
        });
    });

    describe('that', () => {
        describe('when the "filter" returns true', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = just(0).that(isLessThan(2.71));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = just(0).that(isLessThan(2.71));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = just(0).that(isLessThan(2.71));

                expect(output).toStrictEqual(just(0));
            });
        });

        describe('when the "filter" returns false', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = just(0).that(isGreaterThan(2.71));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = just(0).that(isGreaterThan(2.71));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = just(0).that(isGreaterThan(2.71));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('which', () => {
        const input: Just<TypeGuardCheck> = just(typeGuardCheck);

        it('combines checked properties', () => {
            const intermediate: Maybe<ObjectWithPresent<TypeGuardCheck, 'maybe'>> = input
                .which(hasPresentProperty('maybe'));
            const output: Maybe<ObjectWithPresent<TypeGuardCheck, 'maybe' | 'nullable'>> = intermediate
                .which(hasNotNullProperty('nullable'));

            expect(
                output.to(v => `${decimal(v.maybe)}:${decimal(v.nullable)}`),
            ).toStrictEqual(
                input
                    .which(hasPresentProperty('maybe', 'nullable'))
                    .to(v => `${decimal(v.maybe)}:${decimal(v.nullable)}`),
            );
        });

        describe('when the "filter" type guard is true', () => {
            it('returns Just', () => {
                /* eslint-disable jest/max-expects -- check all test properties */
                expect(input.which(hasDefinedProperty('required'))).toStrictEqual(input);
                expect(input.which(hasUndefinedProperty('optional'))).toStrictEqual(input);
                expect(input.which(hasNotNullProperty('nullable'))).toStrictEqual(input);
                expect(input.which(hasNullProperty('possible'))).toStrictEqual(input);
                expect(input.which(hasPresentProperty('maybe'))).toStrictEqual(input);
                expect(input.which(hasAbsentProperty('option'))).toStrictEqual(input);
                /* eslint-enable jest/max-expects */
            });

            it('must be assigned to Maybe', () => {
                const output: Maybe<ObjectWithPresent<TypeGuardCheck, 'maybe'>> = input
                    .which(hasPresentProperty('maybe'));

                expect(output).toStrictEqual(input);
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Maybe<ObjectWithPresent<TypeGuardCheck<number>, "required">>'
                //  is not assignable to type 'Just<ObjectWithPresent<TypeGuardCheck<number>, "required">>'.
                const output: Just<ObjectWithPresent<TypeGuardCheck, 'required'>> = input
                    .which(hasPresentProperty('required'));

                expect(output).toStrictEqual(input);
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Maybe<ObjectWithPresent<TypeGuardCheck<number>, "nullable">>'
                //  is not assignable to type 'Nothing<ObjectWithPresent<TypeGuardCheck<number>, "nullable">>'.
                const output: Nothing<ObjectWithPresent<TypeGuardCheck, 'nullable'>> = input
                    .which(hasPresentProperty('nullable'));

                expect(output).toStrictEqual(input);
            });
        });

        describe('when the "filter" type guard is false', () => {
            it('returns Nothing', () => {
                /* eslint-disable jest/max-expects -- check all test properties */
                expect(input.which(hasUndefinedProperty('required'))).toBe(nothing());
                expect(input.which(hasDefinedProperty('optional'))).toBe(nothing());
                expect(input.which(hasNullProperty('nullable'))).toBe(nothing());
                expect(input.which(hasNotNullProperty('possible'))).toBe(nothing());
                expect(input.which(hasAbsentProperty('maybe'))).toBe(nothing());
                expect(input.which(hasPresentProperty('option'))).toBe(nothing());
                /* eslint-enable jest/max-expects */
            });

            it('must be assigned to Maybe', () => {
                const output: Maybe<ObjectWithPresent<TypeGuardCheck, 'optional'>> = input
                    .which(hasPresentProperty('optional'));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Maybe<ObjectWithPresent<TypeGuardCheck<number>, "option">>'
                //  is not assignable to type 'Just<ObjectWithPresent<TypeGuardCheck<number>, "option">>'.
                const output: Just<ObjectWithPresent<TypeGuardCheck, 'option'>> = input
                    .which(hasPresentProperty('option'));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Maybe<ObjectWithPresent<TypeGuardCheck<number>, "possible">>'
                //  is not assignable to type 'Nothing<ObjectWithPresent<TypeGuardCheck<number>, "possible">>'.
                const output: Nothing<ObjectWithPresent<TypeGuardCheck, 'possible'>> = input
                    .which(hasPresentProperty('possible'));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('when', () => {
        describe('when the "filter" condition is true', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = just(0).when(constant(true));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = just(0).when(constant(true));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = just(0).when(constant(true));

                expect(output).toStrictEqual(just(0));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned to Maybe', () => {
                const output: Maybe<number> = just(0).when(constant(false));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Just'.
                const output: Just<number> = just(0).when(constant(false));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                const output: Nothing<number> = just(0).when(constant(false));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('otherwise', () => {
        describe('fallback may be present', () => {
            it('returns Just (itself)', () => {
                const output: Just<number> = just(0).otherwise(unsafe(2.71));

                expect(output).toStrictEqual(just(0));
            });

            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = just(0).otherwise(unsafe(2.71));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just' is not assignable to type 'Nothing'.
                const output: Nothing<number> = just(0).otherwise(unsafe(2.71));

                expect(output).toStrictEqual(just(0));
            });
        });

        describe('fallback is present', () => {
            it('returns Just (itself)', () => {
                const output: Just<number> = just(0).otherwise(2.71);

                expect(output).toStrictEqual(just(0));
            });

            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = just(0).otherwise(2.71);

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just' is not assignable to type 'Nothing'.
                const output: Nothing<number> = just(0).otherwise(2.71);

                expect(output).toStrictEqual(just(0));
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('returns Just (itself)', () => {
                const output: Just<number> = just(0).otherwise(constant(2.71));

                expect(output).toStrictEqual(just(0));
            });

            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = just(0).otherwise(constant(2.71));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just' is not assignable to type 'Nothing'.
                const output: Nothing<number> = just(0).otherwise(constant(2.71));

                expect(output).toStrictEqual(just(0));
            });
        });

        describe('when the "fallback" is null', () => {
            it('returns Just (itself)', () => {
                const output: Just<number> = just(0).otherwise(null);

                expect(output).toStrictEqual(just(0));
            });

            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = just(0).otherwise(null);

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just' is not assignable to type 'Nothing'.
                const output: Nothing<number> = just(0).otherwise(null);

                expect(output).toStrictEqual(just(0));
            });
        });

        describe('when the "fallback" returns null', () => {
            it('returns Just (itself)', () => {
                const output: Just<number> = just(0).otherwise(constant(null));

                expect(output).toStrictEqual(just(0));
            });

            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = just(0).otherwise(constant(null));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just' is not assignable to type 'Nothing'.
                const output: Nothing<number> = just(0).otherwise(constant(null));

                expect(output).toStrictEqual(just(0));
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('returns Just (itself)', () => {
                const output: Just<number> = just(0).otherwise(undefined);

                expect(output).toStrictEqual(just(0));
            });

            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = just(0).otherwise(undefined);

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just' is not assignable to type 'Nothing'.
                const output: Nothing<number> = just(0).otherwise(undefined);

                expect(output).toStrictEqual(just(0));
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('returns Just (itself)', () => {
                const output: Just<number> = just(0).otherwise(constant(undefined));

                expect(output).toStrictEqual(just(0));
            });

            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = just(0).otherwise(constant(undefined));

                expect(output).toStrictEqual(just(0));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- TS2322: Type 'Just' is not assignable to type 'Nothing'.
                const output: Nothing<number> = just(0).otherwise(constant(undefined));

                expect(output).toStrictEqual(just(0));
            });
        });

        it('does not throw an error', () => {
            expect(() => just(0).otherwise(panic('Value is absent')))
                .not.toThrow('Value is absent');
        });
    });

    describe('or', () => {
        it('is a shortcut of Maybe.otherwise().value', () => {
            expect(just(0).or(2.71))
                .toStrictEqual(just(0).otherwise(2.71).value);
            expect(just(0).or(constant(2.71)))
                .toStrictEqual(just(0).otherwise(constant(2.71)).value);
        });

        it('does not throw an error', () => {
            expect(() => just(0).or(panic('Value is not present')))
                .not.toThrow('Value is not present');
        });

        describe('fallback is present', () => {
            it('returns the original value', () => {
                const output: number = just(0).or(2.71);

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('returns the original value', () => {
                const output: number = just(0).or(constant(2.71));

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" is null', () => {
            it('returns the original value', () => {
                const output: number = just(0).or(null);

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" returns null', () => {
            it('returns the original value', () => {
                const output: number = just(0).or(constant(null));

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('returns the original value', () => {
                const output: number = just(0).or(undefined);

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('returns the original value', () => {
                const output: number = just(0).or(constant(undefined));

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

        it('runs the given procedure and keeps original value', () => {
            expect(value).toBe(0);
            expect(just(value).through(assignValue(1))).toStrictEqual(just(0));
            expect(value).toBe(1);
        });

        it('can be assigned to Maybe', () => {
            const output: Maybe<number> = just(value).through(assignValue(1));

            expect(output).toStrictEqual(just(0));
        });

        it('returns Just', () => {
            const output: Just<number> = just(value).through(assignValue(1));

            expect(output).toStrictEqual(just(0));
        });

        it('cannot be assigned to Nothing', () => {
            // @ts-expect-error -- TS2322: Type 'Just' is not assignable to type 'Nothing'.
            const output: Nothing<number> = just(value).through(assignValue(1));

            expect(output).toStrictEqual(just(0));
        });
    });
});
