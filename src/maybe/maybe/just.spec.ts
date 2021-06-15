import { panic } from '../../error/panic/panic';
import { constant, Nullary } from '../../function/function/nullary';
import { decimal } from '../../number/number/base';
import { isGreaterThan, isLessThan } from '../../number/number/order';
import {
    hasAbsentProperty,
    hasDefinedProperty,
    hasNotNullProperty, hasNullProperty,
    hasPresentProperty, hasUndefinedProperty,
    ObjectWithPresent,
} from '../../object/property/property';
import { isPresent } from '../../value/value/type-guard';

import { Just, just, Maybe, maybe, naught, Nothing, nothing } from './maybe';
import { Boxed, fallbackMaybe } from './maybe.mock';
import { TypeGuardCheck, typeGuardCheck } from './type-guard-check.mock';

describe(just, () => {
    it('can be assigned to Maybe<T>', () => {
        const output: Maybe<number> = just(0);

        expect(output).toStrictEqual(just(0));
    });

    it('cannot be assigned to Nothing<T>', () => {
        // TS2322: Type 'Just<number>' is not assignable to type 'Nothing<number>'.
        // @ts-expect-error -- Nothing is not Just.
        const output: Nothing<number> = just(0);

        expect(output).toStrictEqual(just(0));
    });

    it('throws an error if instantiated with an absent value', () => {
        // @ts-expect-error -- testing failure in cases when type is present, but value is absent
        expect(() => just(null)).toThrow('Just value must be present');

        // @ts-expect-error -- testing failure in cases when type is present, but value is absent
        expect(() => just(undefined)).toThrow('Just value must be present');
    });
});

describe(Just, () => {
    describe('value', () => {
        it('is a required property and can be assigned to the value type', () => {
            const value: number = just<number>(3.14).value;

            expect(value).toStrictEqual(3.14);
        });
    });

    describe('onto', () => {
        describe('when the "flatMap" function returns Maybe', () => {
            it('returns the next value as Maybe', () => {
                const output: Maybe<string> = just(3.14).onto(constant(maybe('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe<string>' is not assignable to type 'Just<string>'.
                // @ts-expect-error -- Just.onto() always returns the result of the given function.
                const output: Just<string> = just(3.14).onto(constant(maybe('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe<string>' is not assignable to type 'Nothing<string>'.
                // @ts-expect-error -- Just.onto() always returns the result of the given function.
                const output: Nothing<string> = just(3.14).onto(constant(maybe('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });
        });

        describe('when the "flatMap" function returns Just', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = just(3.14).onto(constant(just('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('returns the next value as Just', () => {
                const output: Just<string> = just(3.14).onto(constant(just('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Just<string>' is not assignable to type 'Nothing<string>'.
                // @ts-expect-error -- Just.onto() always returns the result of the given function.
                const output: Nothing<string> = just(3.14).onto(constant(just('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });
        });

        describe('when the "flatMap" function returns Nothing(null)', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = just(3.14).onto(constant(naught<string>()));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing<string>' is not assignable to type 'Just<string>'.
                // @ts-expect-error -- Just.onto() always returns the result of the given function.
                const output: Just<string> = just(3.14).onto(constant(naught<string>()));

                expect(output).toBe(naught());
            });

            it('returns naught as Nothing', () => {
                const output: Nothing<string> = just(3.14).onto(constant(naught<string>()));

                expect(output).toBe(naught());
            });
        });

        describe('when the "flatMap" function returns Nothing(undefined)', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = just(3.14).onto(constant(nothing<string>()));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing<string>' is not assignable to type 'Just<string>'.
                // @ts-expect-error -- Just.onto() always returns the result of the given function.
                const output: Just<string> = just(3.14).onto(constant(nothing<string>()));

                expect(output).toBe(nothing());
            });

            it('returns nothing as Nothing', () => {
                const output: Nothing<string> = just(3.14).onto(constant(nothing<string>()));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('to', () => {
        describe('when the "map" function may return a present or absent value', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<string> = just(3.14).to(constant(fallbackMaybe('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe<string>' is not assignable to type 'Just<string>'.
                // @ts-expect-error -- Just.to() always returns the result, and result may be absent.
                const output: Just<string> = just(3.14).to(constant(fallbackMaybe('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe<string>' is not assignable to type 'Nothing<string>'.
                // @ts-expect-error -- Just.to() always returns the result, and result may be present.
                const output: Nothing<string> = just(3.14).to(constant(fallbackMaybe('3.14')));

                expect(output).toStrictEqual(just('3.14'));
            });
        });

        describe('when the "map" function returns a present value', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = just(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('returns the next value as Just', () => {
                const output: Just<string> = just(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(just('3.14'));
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Just<string>' is not assignable to type 'Nothing<string>'.
                // @ts-expect-error -- Just.to() always returns the result, and result is present.
                const output: Nothing<string> = just(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(just('3.14'));
            });
        });

        describe('when the "map" function returns null', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = just(3.14).to<string>(constant(null));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Just.to() always returns the result, and result is absent.
                const output: Just<string> = just(3.14).to<string>(constant(null));

                expect(output).toBe(naught());
            });

            it('returns naught as Nothing', () => {
                const output: Nothing<string> = just(3.14).to<string>(constant(null));

                expect(output).toBe(naught());
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = just(3.14).to<string>(constant(undefined));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Just.to() always returns the result, and result is absent.
                const output: Just<string> = just(3.14).to<string>(constant(undefined));

                expect(output).toBe(nothing());
            });

            it('returns nothing as Nothing', () => {
                const output: Nothing<string> = just(3.14).to<string>(constant(undefined));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('pick', () => {
        it('is a shortcut of the Just.to()', () => {
            const input: Just<Boxed<TypeGuardCheck>> = just({ value: typeGuardCheck });

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
                // TS2322: Type 'Just ' is not assignable to type 'Nothing '.
                // @ts-expect-error -- Just.pick() returns property value when it is present.
                const output: Nothing<number> = just(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(just(3.14));
            });
        });

        describe('when the property can be absent', () => {
            it('returns Maybe the value of the property', () => {
                const output: Maybe<number> = just(typeGuardCheck).pick('possible');

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe<number>' is not assignable to type 'Just<number>'.
                // @ts-expect-error -- Just.pick() returns property value and it can be absent.
                const output: Just<number> = just(typeGuardCheck).pick('possible');

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe<number>' is not assignable to type 'Nothing<number>'.
                // @ts-expect-error -- Just.pick() returns property value when it is present.
                const output: Nothing<number> = just(typeGuardCheck).pick('possible');

                expect(output).toBe(naught());
            });
        });
    });

    describe('that', () => {
        describe('when the "filter" returns true', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<number> = just(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe<number>' is not assignable to type 'Just<number>'.
                // @ts-expect-error -- Just.that() may return Nothing.
                const output: Just<number> = just(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                // @ts-expect-error -- Just.that() may return Just.
                const output: Nothing<number> = just(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(just(3.14));
            });
        });

        describe('when the "filter" returns false', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<number> = just(3.14).that(isLessThan(2.71));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe<number>' is not assignable to type 'Just<number>'.
                // @ts-expect-error -- Just.that() may return Nothing.
                const output: Just<number> = just(3.14).that(isLessThan(2.71));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe' is not assignable to type 'Nothing'.
                // @ts-expect-error -- Just.that() may return Just.
                const output: Nothing<number> = just(3.14).that(isLessThan(2.71));

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
                expect(input.which(hasDefinedProperty('required'))).toStrictEqual(input);
                expect(input.which(hasUndefinedProperty('optional'))).toStrictEqual(input);
                expect(input.which(hasNotNullProperty('nullable'))).toStrictEqual(input);
                expect(input.which(hasNullProperty('possible'))).toStrictEqual(input);
                expect(input.which(hasPresentProperty('maybe'))).toStrictEqual(input);
                expect(input.which(hasAbsentProperty('option'))).toStrictEqual(input);
            });

            it('must be assigned to Maybe', () => {
                const output: Maybe<ObjectWithPresent<TypeGuardCheck, 'maybe'>> = input
                    .which(hasPresentProperty('maybe'));

                expect(output).toStrictEqual(input);
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- Just.which() may return Nothing
                const output: Just<TypeGuardCheck> = input.which(hasPresentProperty('required'));

                expect(output).toStrictEqual(input);
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- Just.which() may return Nothing
                const output: Nothing<ObjectWithPresent<TypeGuardCheck, 'nullable'>> = input
                    .which(hasPresentProperty('nullable'));

                expect(output).toStrictEqual(input);
            });
        });

        describe('when the "filter" type guard is false', () => {
            it('returns Nothing', () => {
                expect(input.which(hasUndefinedProperty('required'))).toBe(nothing());
                expect(input.which(hasDefinedProperty('optional'))).toBe(nothing());
                expect(input.which(hasNullProperty('nullable'))).toBe(nothing());
                expect(input.which(hasNotNullProperty('possible'))).toBe(nothing());
                expect(input.which(hasAbsentProperty('maybe'))).toBe(nothing());
                expect(input.which(hasPresentProperty('option'))).toBe(nothing());
            });

            it('must be assigned to Maybe', () => {
                const output: Maybe<ObjectWithPresent<TypeGuardCheck, 'maybe' | 'optional'>> = input
                    .which(hasPresentProperty('maybe', 'optional'));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- Just.which may return Nothing
                const output: Just<ObjectWithPresent<TypeGuardCheck, 'option'>> = input
                    .which(hasPresentProperty('option'));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- Just.which may return Just
                const output: Nothing<ObjectWithPresent<TypeGuardCheck, 'possible'>> = input
                    .which(hasPresentProperty('possible'));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('when', () => {
        describe('when the "filter" condition is true', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<number> = just(3.14).when(constant(true));

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- Just.when() may return Nothing
                const output: Just<number> = just(3.14).when(constant(true));

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- Just.when() may return Just
                const output: Nothing<number> = just(3.14).when(constant(true));

                expect(output).toStrictEqual(just(3.14));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<number> = just(3.14).when(constant(false));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- Just.when() may return Nothing
                const output: Just<number> = just(3.14).when(constant(false));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- Just.when() may return Just
                const output: Nothing<number> = just(3.14).when(constant(false));

                expect(output).toBe(nothing());
            });
        });
    });

    describe('otherwise', () => {
        describe('fallback may be present', () => {
            it('returns Just (itself)', () => {
                const output: Just<number> = just(3.14).otherwise(fallbackMaybe(2.71));

                expect(output).toStrictEqual(just(3.14));
            });

            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = just(3.14).otherwise(fallbackMaybe(2.71));

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- Just.otherwise() always returns itself
                const output: Nothing<number> = just(3.14).otherwise(fallbackMaybe(2.71));

                expect(output).toStrictEqual(just(3.14));
            });
        });

        describe('fallback is present', () => {
            it('returns Just (itself)', () => {
                const output: Just<number> = just(3.14).otherwise(2.71);

                expect(output).toStrictEqual(just(3.14));
            });

            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = just(3.14).otherwise(2.71);

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- Just.otherwise() always returns itself
                const output: Nothing<number> = just(3.14).otherwise(2.71);

                expect(output).toStrictEqual(just(3.14));
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('returns Just (itself)', () => {
                const output: Just<number> = just(3.14).otherwise(constant(2.71));

                expect(output).toStrictEqual(just(3.14));
            });

            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = just(3.14).otherwise(constant(2.71));

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- Just.otherwise() always returns itself
                const output: Nothing<number> = just(3.14).otherwise(constant(2.71));

                expect(output).toStrictEqual(just(3.14));
            });
        });

        describe('when the "fallback" is null', () => {
            it('returns Just (itself)', () => {
                const output: Just<number> = just(3.14).otherwise(null);

                expect(output).toStrictEqual(just(3.14));
            });

            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = just(3.14).otherwise(null);

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- Just.otherwise() always returns itself
                const output: Nothing<number> = just(3.14).otherwise(null);

                expect(output).toStrictEqual(just(3.14));
            });
        });

        describe('when the "fallback" returns null', () => {
            it('returns Just (itself)', () => {
                const output: Just<number> = just(3.14).otherwise(constant(null));

                expect(output).toStrictEqual(just(3.14));
            });

            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = just(3.14).otherwise(constant(null));

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- Just.otherwise() always returns itself
                const output: Nothing<number> = just(3.14).otherwise(constant(null));

                expect(output).toStrictEqual(just(3.14));
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('returns Just (itself)', () => {
                const output: Just<number> = just(3.14).otherwise(undefined);

                expect(output).toStrictEqual(just(3.14));
            });

            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = just(3.14).otherwise(undefined);

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- Just.otherwise() always returns itself
                const output: Nothing<number> = just(3.14).otherwise(undefined);

                expect(output).toStrictEqual(just(3.14));
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('returns Just (itself)', () => {
                const output: Just<number> = just(3.14).otherwise(constant(undefined));

                expect(output).toStrictEqual(just(3.14));
            });

            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = just(3.14).otherwise(constant(undefined));

                expect(output).toStrictEqual(just(3.14));
            });

            it('cannot be assigned to Nothing', () => {
                // @ts-expect-error -- Just.otherwise() always returns itself
                const output: Nothing<number> = just(3.14).otherwise(constant(undefined));

                expect(output).toStrictEqual(just(3.14));
            });
        });

        it('does not throw an error', () => {
            expect(() => just(3.14).otherwise(panic('Value is absent')))
                .not.toThrow('Value is absent');
        });
    });

    describe('or', () => {
        it('is a shortcut of Maybe.otherwise().value', () => {
            expect(just(3.14).or(2.71))
                .toStrictEqual(just(3.14).otherwise(2.71).value);
            expect(just(3.14).or(constant(2.71)))
                .toStrictEqual(just(3.14).otherwise(constant(2.71)).value);
        });

        it('does not throw an error', () => {
            expect(() => just(3.14).or(panic('Value is not present')))
                .not.toThrow('Value is not present');
        });

        describe('fallback is present', () => {
            it('returns the original value', () => {
                const output: string = just('3.14').or('2.71');

                expect(output).toStrictEqual('3.14');
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('returns the original value', () => {
                const output: string = just('3.14').or(constant('2.71'));

                expect(output).toStrictEqual('3.14');
            });
        });

        describe('when the "fallback" is null', () => {
            it('returns the original value', () => {
                const output: string = just('3.14').or(null);

                expect(output).toStrictEqual('3.14');
            });
        });

        describe('when the "fallback" returns null', () => {
            it('returns the original value', () => {
                const output: string = just('3.14').or(constant(null));

                expect(output).toStrictEqual('3.14');
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('returns the original value', () => {
                const output: string = just('3.14').or(undefined);

                expect(output).toStrictEqual('3.14');
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('returns the original value', () => {
                const output: string = just('3.14').or(constant(undefined));

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

        beforeEach(() => {
            pi = 3.14;
        });

        it('runs the given procedure and keeps original value', () => {
            expect(pi).toStrictEqual(3.14);
            expect(just(pi).run(assignPi(3.1415))).toStrictEqual(just(3.14));
            expect(pi).toStrictEqual(3.1415);
        });

        it('can be assigned to Maybe', () => {
            const output: Maybe<number> = just(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(just(3.14));
        });

        it('returns Just', () => {
            const output: Just<number> = just(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(just(3.14));
        });

        it('cannot be assigned to Nothing', () => {
            // @ts-expect-error -- Just.run returns original Just.
            const output: Nothing<number> = just(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(just(3.14));
        });
    });

    describe('lift', () => {
        it('accepts functions with strictly-typed input', () => {
            expect(just('3.14').lift(decimal))
                .toStrictEqual(just(3.14));
        });

        it('must be assigned to Maybe', () => {
            const output: Maybe<boolean> = just(3.14).lift(isPresent);

            expect(output).toStrictEqual(just(true));
        });

        it('cannot be assigned to Just', () => {
            // @ts-expect-error -- Just.lift() may return Nothing
            const output: Just<boolean> = just(3.14).lift(constant(2.71));

            expect(output).toStrictEqual(just(2.71));
        });

        it('cannot be assigned to Nothing', () => {
            // @ts-expect-error -- Nothing.lift() may return Just
            const output: Nothing<boolean> = just(3.14).lift<boolean>(constant(null));

            expect(output).toBe(naught());
        });
    });
});
